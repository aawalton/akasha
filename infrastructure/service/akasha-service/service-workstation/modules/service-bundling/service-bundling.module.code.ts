import { Buffer } from "node:buffer"
import { existsSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync } from "node:fs"
import { join } from "node:path"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"
import { bundleCommitIn } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/code-moving/code-moving.module.code.ts"
import {
  SERVICE_SUFFIX,
  TELLING_TEMPLATE,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"
import {
  listedAt,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { BunPlugin } from "bun"

const SERVICE_PAGE_TYPE = "service-workstation"

const RUNNING = "running.code"

const TS = "ts"

const RUNS = "runService"

const TELLER_RUNS = "runServiceTelling"

const TELLER_TAKES = "process.argv[2]"

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

const TREE = join(STUBS, "tree")

const NODE_MODULES = "node_modules"

const CODE: readonly string[] = ["*.ts", "*.tsx", "*.js", "*.jsx", "*.mjs", "*.cjs", "*.json"]

export const TELLER_STEM = TELLING_TEMPLATE.slice(0, -SERVICE_SUFFIX.length)

export function launchedFromBundle(root: string): readonly string[] {
  return slugsOfType(root, SERVICE_PAGE_TYPE)
}

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

export type Checked = { readonly tree: string } | { readonly refused: string }

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

function noService(slug: string): string {
  return `no workstation service is slugged \`${slug}\``
}

function bundlesAt(home: string, slug: string): string {
  return join(home, STATE, slug)
}

function bundleName(commit: string): string {
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

function saidOfUnread(slug: string, running: string): string {
  return (
    `\`${slug}\` bundled without the bundler naming \`${running}\` among the files it read, ` +
    "so which commit's bytes the bundle holds is not known"
  )
}

export function saidOfUnchecked(commit: string, why: string): string {
  return `no bundle is to be built, because ${commit} could not be checked out to build from — ${why}`
}

function stubAt(slug: string): string {
  return join(STUBS, `${slug}.entry.${TS}`)
}

export function stubFor(running: string, runs: string = RUNS, takes: string = ""): string {
  return `import { ${runs} } from ${JSON.stringify(running)}\n\nawait ${runs}(${takes})\n`
}

function runningIn(root: string, slug: string): Reached {
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

async function textOf(stub: string, root: string): Promise<Text> {
  const read: string[] = []
  const was = process.cwd()
  process.chdir(root)
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
  } finally {
    process.chdir(was)
  }
}

function closureIn(root: string, read: readonly string[]): ReadonlySet<string> {
  const under = root.endsWith("/") ? root : `${root}/`
  const took = new Set<string>()
  for (const one of read) {
    if (one.startsWith(under)) took.add(one.slice(under.length))
  }
  return took
}

function treeMade(root: string, commit: string, at: string): undefined {
  rmSync(at, { recursive: true, force: true })
  gitSaid(root, ["worktree", "prune"])
  gitSaid(root, ["worktree", "add", "--detach", "--no-checkout", at, commit])
  gitSaid(at, ["sparse-checkout", "set", "--no-cone", ...CODE])
}

export function checkedOut(root: string, commit: string, at: string = TREE): Checked {
  try {
    if (!existsSync(join(at, ".git"))) treeMade(root, commit, at)
    gitSaid(at, ["checkout", "--detach", "--force", commit])
    const modules = join(at, NODE_MODULES)
    if (!existsSync(modules)) symlinkSync(join(root, NODE_MODULES), modules)
    return { tree: at }
  } catch (thrown) {
    return { refused: whyOf(thrown) }
  }
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

function launchedIn(home: string, slug: string, names: readonly string[]): string | null {
  const lines = startedFrom(home, slug)
  for (const one of names) {
    if (lines.some((line) => line.includes(join(STATE, slug, one)))) return one
  }
  return null
}

export function launchedCommitIn(home: string, slug: string): string | null {
  for (const one of startedFrom(home, slug)) {
    const found = bundleCommitIn(one)
    if (found !== null) return found
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

function keptIn(home: string, slug: string, fresh: string): ReadonlySet<string> {
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

async function bundledFrom(
  root: string,
  slug: string,
  running: string,
  home: string,
  commit: string,
  tree: string,
  runs: string = RUNS,
  takes: string = ""
): Promise<Made> {
  const under = root.endsWith("/") ? root : `${root}/`
  const inTree = running.startsWith(under) ? join(tree, running.slice(under.length)) : running
  const stub = stubAt(slug)
  await Bun.write(stub, stubFor(inTree, runs, takes))
  const began = Bun.nanoseconds()
  const made = await textOf(stub, tree)
  const seconds = (Bun.nanoseconds() - began) / NANOS
  if ("refused" in made) return { refused: `\`${slug}\` would not bundle — ${made.refused}` }
  if (!made.read.includes(inTree)) {
    return { refused: saidOfUnread(slug, inTree) }
  }
  const closure = closureIn(tree, made.read)
  const at = bundleAt(home, slug, commit)
  await Bun.write(at, made.text)
  const swept = sweptOf(home, slug, bundleName(commit))
  const bytes = Buffer.byteLength(made.text)
  const files = closure.size
  return { built: { at, bytes, seconds, files, kept: swept.kept, removed: swept.removed } }
}

export async function bundledFor(
  root: string,
  slug: string,
  home: string,
  commit: string,
  tree: string
): Promise<Made> {
  const reached = runningIn(root, slug)
  if (!("running" in reached)) return reached
  return bundledFrom(root, slug, reached.running, home, commit, tree)
}

export async function bundledTeller(
  root: string,
  running: string,
  home: string,
  commit: string,
  tree: string
): Promise<Made> {
  return bundledFrom(root, TELLER_STEM, running, home, commit, tree, TELLER_RUNS, TELLER_TAKES)
}
