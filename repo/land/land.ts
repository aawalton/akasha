import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname } from "node:path"
import { commitAuthor } from "../../agent/commit-author.ts"
import { carryReadingsBy, type Moved, recordReadBy } from "../../agent/record-read.ts"
import { writerId } from "../../agent/writer.ts"
import { exclusively } from "../../exclusive/exclusive.ts"
import { indexAfterLanding, bodiesBefore } from "./landing.ts"
import { patchAside } from "./body-aside.ts"
import { GATED, gateOrRefuse } from "../../patches/patch.ts"
import { blobId, commitPaths, gitAskingPaths, gitIgnoring, heldByRepo, whileHoldingLanding } from "../git/git.ts"
import { canonicalize } from "../path/path.ts"
import { handOffPush, pushStandingLines } from "../push/push.ts"
import { AKASHA } from "../roots/roots.ts"

const SHEBANG = "#!"

const EXECUTABLE = 0o755

export const MISSING =
  "does not exist — a removal names what is there, so this is a typo rather than a no-op"

export interface Landing {
  readonly relPath: string
  readonly body: string | Uint8Array
}

export interface Carry {
  readonly from: string
  readonly to: string
}

export interface SizeChange {
  readonly relPath: string
  readonly before: number | null
  readonly after: number | null
}

export interface Landed {
  readonly sha: string | null
  readonly unheld: readonly string[]
  readonly wrote: readonly string[]
  readonly gone: readonly string[]
}

export class LandingRefused extends Error {}

export type Commit = (root: string, named: readonly string[], message: string) => string | null

export type Compose = (standing: string | null) => string | Uint8Array | null

export interface Composing {
  readonly relPath: string
  readonly compose: Compose
}

export interface Landings {
  readonly repo: string
  readonly root: string
  readonly message: string
  readonly entries?: readonly Landing[]
  readonly composing?: readonly Composing[]
  readonly alongside?: readonly string[]
  readonly removing?: readonly string[]
  readonly carrying?: readonly Carry[]
  readonly mechanical?: boolean | ReadonlySet<string>
  readonly commit?: Commit
}

export function byteCount(body: string | Uint8Array): number {
  return typeof body === "string" ? new TextEncoder().encode(body).length : body.length
}

export function carriesShebang(body: string): boolean {
  return body.startsWith(SHEBANG)
}

export function byteSize(absolute: string): number | null {
  return existsSync(absolute) ? statSync(absolute).size : null
}

export function sizeLines(changes: readonly SizeChange[]): readonly string[] {
  return changes.map(({ relPath, before, after }) => {
    if (after === null) return `        ${relPath}  ${before ?? 0} → gone`
    const delta = after - (before ?? 0)
    return `        ${relPath}  ${before === null ? "new" : before} → ${after} bytes (${delta < 0 ? "" : "+"}${delta})`
  })
}

function namesGitHolds(root: string, paths: readonly string[]): ReadonlySet<string> | null {
  if (paths.length === 0) return new Set()
  const held = gitAskingPaths(root, ["ls-files", "--cached", "-z"], paths)
  if (held.code !== 0) return null
  return new Set(held.stdout.split("\0").filter((one) => one !== ""))
}

function strayed(root: string, paths: readonly string[]): readonly string[] | null {
  const held = namesGitHolds(root, paths)
  if (held === null) return null
  const rest = paths.filter((one) => !held.has(one))
  if (rest.length === 0) return []
  const skipped = gitIgnoring(root, rest)
  if (skipped === null) return null
  return rest.filter((one) => !skipped.has(one))
}

function gitCouldNotSay(question: string): string {
  return (
    `git could not establish ${question}, so this landing stopped before touching anything — ` +
    "nothing was written, unlinked, renamed or committed. Run it again."
  )
}

function movesOf(root: string, entries: readonly Landing[]): readonly Moved[] {
  const moves: Moved[] = []
  for (const entry of entries) {
    const absolute = `${root}/${entry.relPath}`
    if (!existsSync(absolute)) continue
    let was: Uint8Array
    try {
      was = readFileSync(absolute)
    } catch {
      continue
    }
    const now = typeof entry.body === "string" ? new TextEncoder().encode(entry.body) : entry.body
    const from = blobId(was)
    const to = blobId(now)
    if (from === to) continue
    moves.push({
      path: canonicalize(absolute),
      from,
      to,
    })
  }
  return moves
}

export const commitNamed: Commit = (root, named, message) => {
  if (named.length === 0) return null
  const landed = whileHoldingLanding(root, () => commitPaths(root, named, message, commitAuthor()))
  if (!landed.ok) throw new LandingRefused(landed.reason)
  if (!landed.value.ok) throw new LandingRefused(landed.value.reason)
  return landed.value.sha
}

export function put(absolute: string, body: string | Uint8Array): void {
  const creating = !existsSync(absolute)
  mkdirSync(dirname(absolute), { recursive: true })
  if (typeof body === "string") writeFileSync(absolute, body, "utf8")
  else writeFileSync(absolute, body)
  if (creating && typeof body === "string" && carriesShebang(body)) chmodSync(absolute, EXECUTABLE)
}

export function recordOwnWrite(absolute: string, body: string | Uint8Array): void {
  const writer = writerId()
  if (writer === null) return
  try {
    const bytes = typeof body === "string" ? new TextEncoder().encode(body) : body
    recordReadBy(writer, canonicalize(absolute), Date.now(), blobId(bytes))
  } catch {
  }
}

export function landFiles(one: Landings): Landed {
  const root = one.root
  const message = one.message
  const entries = one.entries ?? []
  const composing = one.composing ?? []
  const alongside = one.alongside ?? []
  const removing = one.removing ?? []
  const carrying = one.carrying ?? []
  const mechanical = one.mechanical ?? false
  const commit = one.commit ?? commitNamed
  const programDecided =
    mechanical === true
      ? entries
      : mechanical === false
        ? []
        : entries.filter((held) => mechanical.has(held.relPath))
  if (programDecided.length > 0) carryReadingsBy(movesOf(root, programDecided))
  const touching = [...entries.map((held) => held.relPath), ...composing.map((held) => held.relPath)]
  const wasBefore = bodiesBefore(root, [...touching, ...removing])
  const unheld = strayed(root, removing)
  if (unheld === null) {
    throw new LandingRefused(gitCouldNotSay(`what history holds of ${removing.join(", ")}`))
  }
  const heldBefore = heldByRepo(root, removing)
  const carriedNames = carrying.map((held) => held.from)
  const carriedHeld = namesGitHolds(root, carriedNames)
  if (carriedHeld === null) {
    throw new LandingRefused(gitCouldNotSay(`which of ${carriedNames.join(", ")} it holds`))
  }
  const wrote: string[] = []
  for (const entry of entries) {
    const absolute = `${root}/${entry.relPath}`
    try {
      put(absolute, entry.body)
    } catch (err) {
      throw new LandingRefused(
        `could not write ${entry.relPath}: ${err instanceof Error ? err.message : String(err)}`
      )
    }
    wrote.push(entry.relPath)
    recordOwnWrite(absolute, entry.body)
  }
  for (const entry of composing) {
    const absolute = `${root}/${entry.relPath}`
    mkdirSync(dirname(absolute), { recursive: true })
    let body: string | Uint8Array | null = null
    try {
      body = exclusively(absolute, () => {
        const standing = existsSync(absolute) ? readFileSync(absolute, "utf8") : null
        const made = entry.compose(standing)
        if (made === null) return null
        if (typeof made === "string" && standing === made) return null
        put(absolute, made)
        return made
      })
    } catch (err) {
      throw new LandingRefused(
        `could not write ${entry.relPath}: ${err instanceof Error ? err.message : String(err)}`
      )
    }
    if (body === null) continue
    wrote.push(entry.relPath)
    recordOwnWrite(absolute, body)
  }
  const gone: string[] = []
  for (const relPath of removing) {
    const absolute = `${root}/${relPath}`
    const stood = exclusively(absolute, () => {
      const was = existsSync(absolute)
      rmSync(absolute, { force: true })
      return was
    })
    if (stood || heldBefore.has(relPath)) gone.push(relPath)
  }
  for (const held of carrying) {
    const to = `${root}/${held.to}`
    try {
      mkdirSync(dirname(to), { recursive: true })
      renameSync(`${root}/${held.from}`, to)
    } catch (err) {
      throw new LandingRefused(
        `could not carry ${held.from} to ${held.to}: ${err instanceof Error ? err.message : String(err)}`
      )
    }
  }
  const named = [
    ...wrote,
    ...alongside,
    ...gone,
    ...carrying.filter((held) => carriedHeld.has(held.from)).flatMap((held) => [held.from, held.to]),
  ]
  let sha: string | null
  try {
    sha = commit(root, named, message)
  } catch (err) {
    if (!(err instanceof LandingRefused)) throw err
    throw new LandingRefused(
      `${err.message}. ALREADY APPLIED AND UNCOMMITTED: ${named.join(", ")} — ` +
        "bodies land, removals unlink and carries rename before anything commits, so this " +
        "failure is not a no-op. Commit exactly these paths."
    )
  }

  try {
    indexAfterLanding(one.repo, root, wasBefore, wrote, gone)
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    throw new LandingRefused(
      `${said}. ${sha === null ? "The write" : `Commit ${sha}`} stands in git while the index ` +
        "no longer describes it, so a scan of these pages answers from rows that have gone " +
        "stale. Write the index again with `ops index refresh`."
    )
  }
  return { sha, unheld, wrote, gone }
}

const BYPASSED = "Checks-bypassed"

const GLASS_BROKEN =
  "gate:   broken open — no check ran over this change, and the commit says why\n"

function recorded(message: string, glass: string | null): string {
  if (glass === null) return message
  return `${message}\n\n${BYPASSED}: ${glass}`
}

function akashaGated(
  repo: string,
  root: string,
  entries: readonly Landing[],
  removing: readonly string[],
  carrying: readonly Carry[],
  goneElsewhere: readonly string[],
  repointedElsewhere: ReadonlyMap<string, string>,
  glass: string | null
): void {
  if (repo !== AKASHA) return
  if (process.env[GATED] === "1") return
  if (glass !== null) {
    process.stderr.write(GLASS_BROKEN)
    return
  }
  const carried = carrying.map((one) => ({ relPath: one.to, from: `${root}/${one.from}` }))
  const removals = [...removing, ...carrying.map((one) => one.from)]
  gateOrRefuse(
    patchAside(entries, carried, removals, root),
    entries.length + carried.length + removals.length,
    root,
    goneElsewhere,
    repointedElsewhere
  )
}

export interface Target {
  readonly repo: string
  readonly root: string
}

export function land(
  where: Target,
  entries: readonly Landing[],
  message: string,
  dryRun: boolean,
  removing: readonly string[] = [],
  carrying: readonly Carry[] = [],
  mechanical: boolean | ReadonlySet<string> = false,
  goneElsewhere: readonly string[] = [],
  repointedElsewhere: ReadonlyMap<string, string> = new Map(),
  glass: string | null = null
): Landed | null {
  const { repo, root } = where
  akashaGated(repo, root, entries, removing, carrying, goneElsewhere, repointedElsewhere, glass)
  const taken =
    (removing.length === 0 ? "" : `, ${removing.length} removed`) +
    (carrying.length === 0 ? "" : `, ${carrying.length} carried`)
  const sizes: readonly SizeChange[] = [
    ...entries.map((entry) => ({
      relPath: entry.relPath,
      before: byteSize(`${root}/${entry.relPath}`),
      after: byteCount(entry.body),
    })),
    ...removing.map((relPath) => ({ relPath, before: byteSize(`${root}/${relPath}`), after: null })),
  ]
  const carriedLines = carrying.map((held) => `        ${held.from}  carried to ${held.to}`)
  if (dryRun) {
    process.stdout.write(
      [
        `write:  dry-run — ${entries.length} file(s) would be written${taken}`,
        ...sizeLines(sizes),
        ...carriedLines,
      ].join("\n") + "\n"
    )
    return null
  }
  const landed = landFiles({
    repo,
    root,
    entries,
    message: recorded(message, glass),
    removing,
    carrying,
    mechanical,
  })
  const missing = removing.filter((relPath) => !landed.gone.includes(relPath))
  if (missing.length > 0) {
    throw new LandingRefused(
      `could not remove ${missing.join(", ")}: nothing stood there to take away`
    )
  }
  const behind = pushStandingLines(root)
  process.stdout.write(
    [
      `write:  ${entries.length} file(s) written${taken}`,
      ...sizeLines(sizes),
      ...carriedLines,
      ...(landed.unheld.length === 0
        ? []
        : [`        NO HISTORY HOLDS WHAT WENT AT ${landed.unheld.join(", ")}, which git never tracked`]),
      landed.sha === null
        ? "commit: nothing to commit — the repo already held this"
        : `commit: ${landed.sha}`,
      ...(landed.sha === null ? [] : [handOffPush(root)]),
      ...behind,
    ].join("\n") + "\n"
  )
  return landed
}
