import { existsSync, renameSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "@akasha/utils-run/running"
import { z } from "zod"
import { isSourceRuntime } from "../watcher-runtime/watcher-runtime.module.code.ts"

export const SOURCE_UPDATE_EXIT_CODE = 75

export const BODY_SUMMARY_MAX = 200

const WORKER_EXE_STEM = "temper-watcher-worker"

export type CheckFailureReason = "unreachable" | "http-error" | "non-json" | "malformed-body"

export type UpdateCheck =
  | { readonly kind: "update-available"; readonly version: string }
  | { readonly kind: "up-to-date" }
  | { readonly kind: "check-failed"; readonly reason: CheckFailureReason; readonly detail: string }

const VersionBody = z.object({ version: z.string().trim().min(1) }).passthrough()

function summarizeBody(status: number, contentType: string, body: string): string {
  const collapsed = body.replace(/\s+/g, " ").trim()
  const shortened =
    collapsed.length > BODY_SUMMARY_MAX ? `${collapsed.slice(0, BODY_SUMMARY_MAX)}…` : collapsed
  return `HTTP ${String(status)}, ${contentType === "" ? "no content-type" : contentType}: ${shortened}`
}

function parseDeployedVersion(body: string): string | null {
  try {
    const parsed = VersionBody.safeParse(JSON.parse(body))
    return parsed.success ? parsed.data.version : null
  } catch {
    return null
  }
}

export interface VersionResponseObservation {
  readonly ok: boolean
  readonly status: number
  readonly contentType: string
  readonly body: string
  readonly runningVersion: string
}

export function classifyVersionResponse(input: VersionResponseObservation): UpdateCheck {
  const failed = (reason: CheckFailureReason): UpdateCheck => ({
    kind: "check-failed",
    reason,
    detail: summarizeBody(input.status, input.contentType, input.body),
  })

  if (!input.ok) return failed("http-error")
  if (!input.contentType.includes("application/json")) return failed("non-json")

  const version = parseDeployedVersion(input.body)
  if (version === null) return failed("malformed-body")

  if (version === input.runningVersion) return { kind: "up-to-date" }
  return { kind: "update-available", version }
}

export function versionUrl(serverUrl: string): string {
  return `${serverUrl}/api/watcher/worker/version`
}

export function downloadUrl(serverUrl: string): string {
  return `${serverUrl}/api/watcher/worker/download`
}

export interface FetchedText {
  readonly ok: boolean
  readonly status: number
  readonly contentType: string
  readonly body: string
}

export interface FetchedBytes {
  readonly ok: boolean
  readonly status: number
  readonly body: Uint8Array
}

export type FetchingText = (url: string) => Promise<FetchedText>

export type FetchingBytes = (url: string) => Promise<FetchedBytes>

const textOverHttp: FetchingText = async (url) => {
  const response = await fetch(url)
  return {
    ok: response.ok,
    status: response.status,
    contentType: response.headers.get("content-type") ?? "",
    body: await response.text(),
  }
}

const bytesOverHttp: FetchingBytes = async (url) => {
  const response = await fetch(url)
  return {
    ok: response.ok,
    status: response.status,
    body: new Uint8Array(await response.arrayBuffer()),
  }
}

export interface VersionCheckDeps {
  readonly fetchText?: FetchingText
}

export async function checkForUpdate(
  serverUrl: string,
  runningVersion: string,
  deps: VersionCheckDeps = {}
): Promise<UpdateCheck> {
  const fetchText = deps.fetchText ?? textOverHttp
  try {
    const answered = await fetchText(versionUrl(serverUrl))
    return classifyVersionResponse({
      ok: answered.ok,
      status: answered.status,
      contentType: answered.contentType,
      body: answered.body,
      runningVersion,
    })
  } catch (thrown) {
    return {
      kind: "check-failed",
      reason: "unreachable",
      detail: thrown instanceof Error ? thrown.message : String(thrown),
    }
  }
}

export interface ExeSwapPaths {
  readonly current: string
  readonly next: string
  readonly previous: string
}

export function exeSwapPaths(execPath: string): ExeSwapPaths {
  const exeDir = dirname(execPath)
  return {
    current: execPath,
    next: join(exeDir, `${WORKER_EXE_STEM}.new.exe`),
    previous: join(exeDir, `${WORKER_EXE_STEM}.old.exe`),
  }
}

function writeFileAt(path: string, body: Uint8Array): undefined {
  writeFileSync(path, body)
  return undefined
}

function renameFile(from: string, to: string): undefined {
  renameSync(from, to)
  return undefined
}

function removeFile(path: string): undefined {
  unlinkSync(path)
  return undefined
}

function exitProcess(code: number): undefined {
  process.exit(code)
}

export interface ExeUpdateDeps {
  readonly sourceRuntime?: () => boolean
  readonly execPath?: string
  readonly fetchBytes?: FetchingBytes
  readonly writeFile?: (path: string, body: Uint8Array) => undefined
  readonly rename?: (from: string, to: string) => undefined
  readonly exit?: (code: number) => undefined
}

export async function performUpdate(
  serverUrl: string,
  deps: ExeUpdateDeps = {}
): Promise<undefined> {
  const sourceRuntime = deps.sourceRuntime ?? isSourceRuntime
  if (sourceRuntime()) return undefined

  const paths = exeSwapPaths(deps.execPath ?? process.execPath)
  const fetchBytes = deps.fetchBytes ?? bytesOverHttp
  const answered = await fetchBytes(downloadUrl(serverUrl))

  if (!answered.ok) {
    throw new Error(`Download failed: HTTP ${String(answered.status)}`)
  }

  const writeFile = deps.writeFile ?? writeFileAt
  const rename = deps.rename ?? renameFile
  const exit = deps.exit ?? exitProcess

  writeFile(paths.next, answered.body)
  rename(paths.current, paths.previous)
  rename(paths.next, paths.current)
  exit(0)
  return undefined
}

export interface ExeCleanupDeps {
  readonly sourceRuntime?: () => boolean
  readonly execPath?: string
  readonly present?: (path: string) => boolean
  readonly remove?: (path: string) => undefined
}

export function cleanupOldExe(deps: ExeCleanupDeps = {}): undefined {
  const sourceRuntime = deps.sourceRuntime ?? isSourceRuntime
  if (sourceRuntime()) return undefined

  const present = deps.present ?? existsSync
  const remove = deps.remove ?? removeFile
  const { previous } = exeSwapPaths(deps.execPath ?? process.execPath)

  if (!present(previous)) return undefined
  try {
    remove(previous)
  } catch {
    return undefined
  }
  return undefined
}

export type GitRelation = "equal" | "behind" | "ahead" | "diverged"

export interface GitRelationObservation {
  readonly equal: boolean
  readonly headIsAncestorOfTarget: boolean
  readonly targetIsAncestorOfHead: boolean
}

export function classifyGitRelation(input: GitRelationObservation): GitRelation {
  if (input.equal) return "equal"
  if (input.headIsAncestorOfTarget) return "behind"
  if (input.targetIsAncestorOfHead) return "ahead"
  return "diverged"
}

export interface SourceRepo {
  readonly headSha: () => string | null
  readonly fetchOrigin: () => boolean
  readonly holdsCommit: (sha: string) => boolean
  readonly isAncestor: (earlier: string, later: string) => boolean
  readonly fastForwardTo: (sha: string) => boolean
}

export function gitRepoAt(repoDir: string): SourceRepo {
  const succeeded = (argv: readonly string[]): boolean =>
    ran(["git", "-C", repoDir, ...argv]).code === 0
  return {
    headSha: () => {
      const answered = ran(["git", "-C", repoDir, "rev-parse", "HEAD"])
      const sha = answered.out.trim()
      return answered.code === 0 && sha.length > 0 ? sha : null
    },
    fetchOrigin: () => succeeded(["fetch", "origin", "--quiet"]),
    holdsCommit: (sha) => succeeded(["cat-file", "-e", `${sha}^{commit}`]),
    isAncestor: (earlier, later) => succeeded(["merge-base", "--is-ancestor", earlier, later]),
    fastForwardTo: (sha) => succeeded(["merge", "--ff-only", sha]),
  }
}

export interface SourceUpdateDeps {
  readonly repo?: SourceRepo
}

export function resolveSourceHeadSha(repoDir: string, deps: SourceUpdateDeps = {}): string | null {
  return (deps.repo ?? gitRepoAt(repoDir)).headSha()
}

export interface SourceUpdateResult {
  readonly advanced: boolean
  readonly relation: GitRelation | "unknown"
  readonly reason: string
}

export function performSourceUpdate(
  repoDir: string,
  targetSha: string,
  deps: SourceUpdateDeps = {}
): SourceUpdateResult {
  const repo = deps.repo ?? gitRepoAt(repoDir)

  const head = repo.headSha()
  if (head === null) return { advanced: false, relation: "unknown", reason: "not-a-git-checkout" }
  if (head === targetSha) return { advanced: false, relation: "equal", reason: "up-to-date" }

  if (!repo.fetchOrigin()) {
    return { advanced: false, relation: "unknown", reason: "fetch-failed" }
  }
  if (!repo.holdsCommit(targetSha)) {
    return { advanced: false, relation: "unknown", reason: "target-not-fetched" }
  }

  const relation = classifyGitRelation({
    equal: false,
    headIsAncestorOfTarget: repo.isAncestor(head, targetSha),
    targetIsAncestorOfHead: repo.isAncestor(targetSha, head),
  })
  if (relation !== "behind") {
    return { advanced: false, relation, reason: `no-ff-${relation}` }
  }
  if (!repo.fastForwardTo(targetSha)) {
    return { advanced: false, relation, reason: "ff-merge-failed" }
  }
  return { advanced: true, relation, reason: "advanced" }
}
