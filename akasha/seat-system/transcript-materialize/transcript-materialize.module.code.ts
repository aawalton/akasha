import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { seaweedFsMissingEnvVars } from "@akasha/object-store/seaweedfs-config"
import { dataError } from "@tools/lib/exit"
import { shape } from "@tools/lib/shape"
import { sanitizeTranscriptForResume } from "../session-jsonl/session-jsonl.module.code.ts"
import {
  getDefaultObjectStore,
  readSessionObject,
  sessionObjectKeyFor,
} from "../session-stream/session-stream.module.code.ts"
import { sessionProjectDir } from "../supervising/supervisor-session-project-dir/supervisor-session-project-dir.module.code.ts"

const SessionIdLine = shape.looseObject({ sessionId: shape.string().optional() })

export interface MaterializeTranscriptResult {
  readonly path: string
  readonly downloaded: boolean
}

export function transcriptSessionIds(text: string): ReadonlySet<string> {
  const ids = new Set<string>()
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    try {
      const result = SessionIdLine.safeParse(JSON.parse(line))
      const sid = result.success ? result.data.sessionId : undefined
      if (sid !== undefined && sid.length > 0) ids.add(sid)
    } catch {}
  }
  return ids
}

export function transcriptCarriesSession(text: string, sessionId: string): boolean {
  return transcriptSessionIds(text).has(sessionId)
}

export function transcriptRecordCount(text: string, sessionId: string): number {
  let count = 0
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    try {
      const result = SessionIdLine.safeParse(JSON.parse(line))
      const sid = result.success ? result.data.sessionId : undefined
      if (sid === sessionId) count += 1
    } catch {}
  }
  return count
}

export function decideResumeSource(facts: {
  localRecords: number
  remoteRecords: number
}): "keep-local" | "write-remote" | "fail" {
  if (facts.localRecords === 0 && facts.remoteRecords === 0) return "fail"
  return facts.remoteRecords > facts.localRecords ? "write-remote" : "keep-local"
}

function sanitizeResumeTranscriptInPlace(path: string, text: string): undefined {
  const result = sanitizeTranscriptForResume(text)
  if (!result.changed) return
  writeFileSync(path, result.text)
  const summary = [...result.quarantined.entries()]
    .map(([type, count]) => `${count}×${type}`)
    .join(", ")
  const total = [...result.quarantined.values()].reduce((a, b) => a + b, 0)
  console.warn(
    `[transcript-materialize] quarantined ${total} non-resume-safe content block(s) (${summary}) ` +
      `from ${path} before resume — these would otherwise hang \`claude --resume\``
  )
}

export async function materializeLocalTranscript(opts: {
  agentId: string
  sessionId: string
  cwd: string
}): Promise<MaterializeTranscriptResult> {
  const projDir = sessionProjectDir(opts.cwd)
  const localPath = `${projDir}/${opts.sessionId}.jsonl`

  const localStands = existsSync(localPath)
  const localText = localStands ? readFileSync(localPath, "utf8") : null
  const localRecords = localText === null ? 0 : transcriptRecordCount(localText, opts.sessionId)
  const localBytes = localStands ? statSync(localPath).size : 0

  const store = getDefaultObjectStore()
  if (store === null) {
    if (localRecords > 0) {
      sanitizeResumeTranscriptInPlace(localPath, localText ?? "")
      return { path: localPath, downloaded: false }
    }
    const missing = seaweedFsMissingEnvVars()
    throw dataError(
      `SeaweedFS object store unavailable — set ${missing.join(", ")} in ~/.secrets.env. ` +
        "Source the creds from the in-cluster `seaweedfs-creds` Secret " +
        "(kubectl -n seaweedfs get secret seaweedfs-creds -o jsonpath='{.data.<key>}' | base64 -d)."
    )
  }

  const key = sessionObjectKeyFor(opts.agentId)
  const head = await store.head(key).catch(() => null)
  const remoteAvailable = head != null && head.size > 0

  if (!remoteAvailable) {
    if (localRecords > 0) {
      sanitizeResumeTranscriptInPlace(localPath, localText ?? "")
      return { path: localPath, downloaded: false }
    }
    throw dataError(
      `no transcript object for agent ${opts.agentId} (key ${key}) — nothing to resume. ` +
        "The agent never streamed a transcript, or its session was never persisted."
    )
  }

  if (localRecords > 0 && head.size <= localBytes) {
    sanitizeResumeTranscriptInPlace(localPath, localText ?? "")
    return { path: localPath, downloaded: false }
  }

  let remoteBytes: Uint8Array
  try {
    remoteBytes = await readSessionObject(store, key)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw dataError(`failed to read session object: ${msg}`)
  }
  const remoteText = new TextDecoder().decode(remoteBytes)
  const remoteRecords = transcriptRecordCount(remoteText, opts.sessionId)

  const decision = decideResumeSource({ localRecords, remoteRecords })

  if (decision === "write-remote") {
    mkdirSync(projDir, { recursive: true })
    writeFileSync(localPath, remoteBytes)
    sanitizeResumeTranscriptInPlace(localPath, remoteText)
    return { path: localPath, downloaded: true }
  }

  if (decision === "keep-local") {
    console.warn(
      `[transcript-materialize] object-store copy for agent ${opts.agentId} (key ${key}) ` +
        `carries ${remoteRecords} record(s) for session ${opts.sessionId} against the local ` +
        `copy's ${localRecords} — keeping the more complete local transcript at ${localPath}.`
    )
    sanitizeResumeTranscriptInPlace(localPath, localText ?? "")
    return { path: localPath, downloaded: false }
  }

  throw dataError(
    `object-store transcript for agent ${opts.agentId} (key ${key}) carries no records for ` +
      `session ${opts.sessionId} — it is foreign/cross-contaminated or empty. Refusing to ` +
      "resume into empty context. The session's prior context is not recoverable from the " +
      "object store; launch a fresh seat with `ops seat start`."
  )
}
