import { Buffer } from "node:buffer"
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { join } from "node:path"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import { SERVICE_SUFFIX } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

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
  readonly kept: readonly string[]
  readonly removed: readonly string[]
}

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

type Text = { readonly text: string } | { readonly refused: string }

async function textOf(stub: string): Promise<Text> {
  try {
    const built = await Bun.build({
      entrypoints: [stub],
      target: "bun",
      minify: false,
      sourcemap: "inline",
      external: EXTERNAL,
    })
    if (!built.success) return { refused: whyIn(built.logs) }
    const first = built.outputs[0]
    if (first === undefined) return { refused: "the bundler wrote no file" }
    return { text: await first.text() }
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

export async function bundledFor(root: string, slug: string, home: string): Promise<Made> {
  const reached = runningIn(root, slug)
  if (!("running" in reached)) return reached
  const stub = stubAt(slug)
  await Bun.write(stub, stubFor(reached.running))
  const began = Bun.nanoseconds()
  const made = await textOf(stub)
  const seconds = (Bun.nanoseconds() - began) / NANOS
  if ("refused" in made) return { refused: `\`${slug}\` would not bundle — ${made.refused}` }
  const commit = headOf(root)
  const at = bundleAt(home, slug, commit)
  await Bun.write(at, made.text)
  const swept = sweptOf(home, slug, bundleName(commit))
  const bytes = Buffer.byteLength(made.text)
  return { built: { at, bytes, seconds, kept: swept.kept, removed: swept.removed } }
}
