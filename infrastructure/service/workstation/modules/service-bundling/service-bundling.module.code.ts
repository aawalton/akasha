import { Buffer } from "node:buffer"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SERVICE_PAGE_TYPE = "service-workstation"

const RUNNING = "running.code"

const TS = "ts"

const RUNS = "runService"

const STATE = ".local/state/workstation-services"

const STUBS = "/var/tmp/akasha-service-bundling"

const NANOS = 1000000000

export type Built = {
  readonly at: string
  readonly bytes: number
  readonly mappedBytes: number
  readonly seconds: number
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

export function bundleAt(home: string, slug: string, commit: string): string {
  return join(home, STATE, slug, `${commit}.js`)
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

async function textOf(stub: string, sourcemap: "none" | "inline"): Promise<Text> {
  try {
    const built = await Bun.build({ entrypoints: [stub], target: "bun", minify: false, sourcemap })
    if (!built.success) return { refused: whyIn(built.logs) }
    const first = built.outputs[0]
    if (first === undefined) return { refused: "the bundler wrote no file" }
    return { text: await first.text() }
  } catch (thrown) {
    return { refused: whyOf(thrown) }
  }
}

export async function bundledFor(root: string, slug: string, home: string): Promise<Made> {
  const reached = runningIn(root, slug)
  if (!("running" in reached)) return reached
  const stub = stubAt(slug)
  await Bun.write(stub, stubFor(reached.running))
  const began = Bun.nanoseconds()
  const plain = await textOf(stub, "none")
  const seconds = (Bun.nanoseconds() - began) / NANOS
  if ("refused" in plain) return { refused: `\`${slug}\` would not bundle — ${plain.refused}` }
  const mapped = await textOf(stub, "inline")
  const at = bundleAt(home, slug, headOf(root))
  await Bun.write(at, plain.text)
  return {
    built: {
      at,
      bytes: Buffer.byteLength(plain.text),
      mappedBytes: "refused" in mapped ? 0 : Buffer.byteLength(mapped.text),
      seconds,
    },
  }
}
