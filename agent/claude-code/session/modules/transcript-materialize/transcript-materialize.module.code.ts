import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { sanitizeTranscriptForResume } from "akasha/agent/claude-code/session/modules/session-jsonl/session-jsonl.module.code.ts"
import { sessionProjectDir } from "akasha/agent/seat/supervisor/modules/supervisor-session-project-dir/supervisor-session-project-dir.module.code.ts"
import { dataError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const SessionIdLine = SHAPE.looseObject({ sessionId: SHAPE.string().optional() })

export interface MaterializeTranscriptResult {
  readonly path: string
}

function transcriptRecordCount(text: string, sessionId: string): number {
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

export function materializeLocalTranscript(opts: {
  agentId: string
  sessionId: string
  cwd: string
}): MaterializeTranscriptResult {
  const localPath = `${sessionProjectDir(opts.cwd)}/${opts.sessionId}.jsonl`
  const localText = existsSync(localPath) ? readFileSync(localPath, "utf8") : null

  if (localText === null || transcriptRecordCount(localText, opts.sessionId) === 0) {
    throw dataError(
      `no transcript for agent ${opts.agentId} at ${localPath} — nothing to resume. ` +
        "A transcript is kept on the workstation that wrote it, so one lost there is gone; " +
        "launch a fresh seat with `akasha seat start`."
    )
  }

  sanitizeResumeTranscriptInPlace(localPath, localText)
  return { path: localPath }
}
