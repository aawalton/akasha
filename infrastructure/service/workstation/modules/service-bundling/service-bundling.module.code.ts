import { Buffer } from "node:buffer"
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { join } from "node:path"
import {
  PORCELAIN_STATUS_ARGS,
  parsePorcelainStatusZ,
} from "akasha/git/modules/porcelain-status/porcelain-status.module.code.ts"
import { told as gitTold } from "akasha/git/modules/running/git-running.module.code.ts"
import { SERVICE_SUFFIX } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { BunPlugin } from "bun"

const SERVICE_PAGE_TYPE = "service-workstation"

const RUNNING = "running.code"

const TS = "ts"

const RUNS = "runService"

const STATE = ".local/state/workstation-services"

const STUBS = "/var/tmp/akasha-service-bundling"

const NANOS = 1000000000

const JS = "js"

const EXEC = "ExecStart="

const BUNDLE = /^[0-9a-f]{40}\.js$/

const UNSEEN = -1

const BUN = "bun"

const READ_BY_BUNDLER = /\.(ts|tsx|js|jsx|mjs|cjs|json)$/

const RECORDER = "service-bundling-closure"

const UNTRACKED = "?"

const UNTRACKED_ALL = "--untracked-files=all"

const APART = "\0"

const NAMED_AT_MOST = 12

export const LAUNCHED_FROM_BUNDLE: ReadonlySet<string> = new Set(["service-watching"])

const LEFT_FOR_RUNTIME: Readonly<Record<string, string>> = {
  "chromium-bidi":
    "`playwright-core` requires it inside the closure that sets up the BiDi transport, which a service driving a browser over CDP never enters",
}

const EXTERNAL = Object.keys(LEFT_FOR_RUNTIME)

export type Built = {
  readonly at: string
  readonly bytes: number
  readonly seconds: number
  readonly files: number
  readonly kept: readonly string[]
  readonly removed: readonly string[]
}

export type Moved = { readonly moved: ReadonlySet<string> } | { readonly refused: string }

export type Drifted = { readonly drifted: readonly string[] } | { readonly refused: string }

export type Swept = {
  readonly kept: readonly string[]
  readonly removed: readonly string[]
}

export type Reached =
  | { readonly running: string }
  | { readonly unnamed: string }
  | { readonly refused: string }

export type Made =
  | { readonly built: Built }
  | { readonly unnamed: string }
  | { readonly refused: string }

export function noService(slug: string): string {
  return `no workstation service is slugged \`${slug}\``
}

export function bundlesAt(home: string, slug: string): string {
  return join(home, STATE, slug)
}

export function bundleName(commit: string): string {
  return `${commit}.${JS}`
}

export function bundleAt(home: string, slug: string, commit: string): string {
  return join(bundlesAt(home, slug), bundleName(commit))
}

export function unitAt(home: string, slug: string): string {
  return join(home, STATE, `${slug}${SERVICE_SUFFIX}`)
}

export function startedFromBundle(at: string): string {
  return `${BUN} ${at}`
}

export function saidOfNoBundle(slug: string, at: string): string {
  return `\`${slug}\` would start from ${at}, where no bundle is, so no unit is to name it`
}

export function saidOfUnbuilt(slug: string, why: string): string {
  return `\`${slug}\` starts from its bundle, and this deploy built none — ${why}`
}

export function saidOfUnread(slug: string, running: string): string {
  return (
    `\`${slug}\` bundled without the bundler naming \`${running}\` among the files it read, ` +
    "so which commit's bytes the bundle holds is not known"
  )
}

export function saidOfDrift(slug: string, commit: string, drifted: readonly string[]): string {
  const named = drifted.slice(0, NAMED_AT_MOST)
  const rest = drifted.length - named.length
  const more = rest === 0 ? "" : `, and ${rest} more`
  return (
    `\`${slug}\` would be filed under ${commit}, and the checkout holds other bytes than that ` +
    `commit's for ${drifted.length} file(s) the bundler read: ${named.join(", ")}${more}`
  )
}

export function stubAt(slug: string): string {
  return join(STUBS, `${slug}.entry.${TS}`)
}

export function stubFor(running: string): string {
  return `import { ${RUNS} } from ${JSON.stringify(running)}\n\nawait ${RUNS}()\n`
}

export function runningIn(root: string, slug: string): Reached {
  const found = listedAt(root, SERVICE_PAGE_TYPE, slug)[0]
  if (found === undefined) return { unnamed: noService(slug) }
  const beside = besideAt(found.path, RUNNING, TS)
  if (beside === null) {
    return { refused: `\`${slug}\` sits at \`${found.path}\`, which takes no code beside it` }
  }
  const at = join(root, beside)
  if (!existsSync(at)) return { refused: `\`${slug}\` keeps no \`${RUNNING}.${TS}\` at \`${at}\`` }
  return { running: at }
}

function whyIn(said: readonly unknown[]): string {
  return said.map((one) => String(one).replace(/\s+/g, " ").trim()).join("; ")
}

function whyOf(thrown: unknown): string {
  return thrown instanceof AggregateError ? whyIn(thrown.errors) : String(thrown)
}

type Text =
  | { readonly text: string; readonly read: readonly string[] }
  | { readonly refused: string }

function recordingInto(read: string[]): BunPlugin {
  return {
    name: RECORDER,
    setup(build) {
      build.onLoad({ filter: READ_BY_BUNDLER }, (args) => {
        read.push(args.path)
      })
    },
  }
}

async function textOf(stub: string): Promise<Text> {
  const read: string[] = []
  try {
    const built = await Bun.build({
      entrypoints: [stub],
      target: "bun",
      minify: false,
      sourcemap: "inline",
      external: EXTERNAL,
      plugins: [recordingInto(read)],
    })
    if (!built.success) return { refused: whyIn(built.logs) }
    const first = built.outputs[0]
    if (first === undefined) return { refused: "the bundler wrote no file" }
    return { text: await first.text(), read }
  } catch (thrown) {
    return { refused: whyOf(thrown) }
  }
}

export function closureIn(root: string, read: readonly string[]): ReadonlySet<string> {
  const under = root.endsWith("/") ? root : `${root}/`
  const took = new Set<string>()
  for (const one of read) {
    if (one.startsWith(under)) took.add(one.slice(under.length))
  }
  return took
}

export function movedFrom(root: string, commit: string): Moved {
  const changed = gitTold(root, ["diff", "--name-only", "-z", commit])
  if (changed === null) {
    return { refused: `git said nothing of how the checkout differs from ${commit}` }
  }
  const status = gitTold(root, [...PORCELAIN_STATUS_ARGS, UNTRACKED_ALL])
  if (status === null) return { refused: "git said nothing of what the checkout holds untracked" }
  const read = parsePorcelainStatusZ(status)
  if (!read.ok) return { refused: read.error }
  const moved = new Set(changed.split(APART).filter((one) => one !== ""))
  for (const one of read.entries) if (one.index === UNTRACKED) moved.add(one.path)
  return { moved }
}

export function driftedIn(root: string, commit: string, closure: ReadonlySet<string>): Drifted {
  const moved = movedFrom(root, commit)
  if ("refused" in moved) return moved
  return { drifted: [...closure].filter((one) => moved.moved.has(one)).sort() }
}

function bundlesIn(at: string): readonly string[] {
  try {
    return readdirSync(at)
      .filter((one) => BUNDLE.test(one))
      .sort()
  } catch {
    return []
  }
}

function startedFrom(home: string, slug: string): readonly string[] {
  try {
    return readFileSync(unitAt(home, slug), "utf8")
      .split("\n")
      .filter((one) => one.startsWith(EXEC))
  } catch {
    return []
  }
}

export function launchedIn(home: string, slug: string, names: readonly string[]): string | null {
  const lines = startedFrom(home, slug)
  for (const one of names) {
    if (lines.some((line) => line.includes(join(STATE, slug, one)))) return one
  }
  return null
}

function whenOf(at: string, name: string): number {
  try {
    return statSync(join(at, name)).mtimeMs
  } catch {
    return UNSEEN
  }
}

function newestIn(at: string, names: readonly string[]): string | null {
  let newest: string | null = null
  let when = UNSEEN
  for (const one of names) {
    const then = whenOf(at, one)
    if (newest === null || then > when) {
      newest = one
      when = then
    }
  }
  return newest
}

export function keptIn(home: string, slug: string, fresh: string): ReadonlySet<string> {
  const at = bundlesAt(home, slug)
  const names = bundlesIn(at)
  const others = names.filter((one) => one !== fresh)
  const rollback = launchedIn(home, slug, names) ?? newestIn(at, others)
  return new Set(rollback === null ? [fresh] : [fresh, rollback])
}

export function sweptOf(home: string, slug: string, fresh: string): Swept {
  const at = bundlesAt(home, slug)
  const keeps = keptIn(home, slug, fresh)
  const kept: string[] = []
  const removed: string[] = []
  for (const one of bundlesIn(at)) {
    if (keeps.has(one)) {
      kept.push(one)
      continue
    }
    rmSync(join(at, one), { force: true })
    removed.push(one)
  }
  return { kept, removed }
}

export async function bundledFor(
  root: string,
  slug: string,
  home: string,
  commit: string
): Promise<Made> {
  const reached = runningIn(root, slug)
  if (!("running" in reached)) return reached
  const stub = stubAt(slug)
  await Bun.write(stub, stubFor(reached.running))
  const began = Bun.nanoseconds()
  const made = await textOf(stub)
  const seconds = (Bun.nanoseconds() - began) / NANOS
  if ("refused" in made) return { refused: `\`${slug}\` would not bundle — ${made.refused}` }
  if (!made.read.includes(reached.running)) {
    return { refused: saidOfUnread(slug, reached.running) }
  }
  const closure = closureIn(root, made.read)
  const drifted = driftedIn(root, commit, closure)
  if ("refused" in drifted)
    return { refused: `\`${slug}\` would not be filed — ${drifted.refused}` }
  if (drifted.drifted.length > 0) return { refused: saidOfDrift(slug, commit, drifted.drifted) }
  const at = bundleAt(home, slug, commit)
  await Bun.write(at, made.text)
  const swept = sweptOf(home, slug, bundleName(commit))
  const bytes = Buffer.byteLength(made.text)
  const files = closure.size
  return { built: { at, bytes, seconds, files, kept: swept.kept, removed: swept.removed } }
}
