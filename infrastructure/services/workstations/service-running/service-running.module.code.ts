import { existsSync } from "node:fs"
import { join } from "node:path"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { checkoutHere } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const SERVICE_PAGE_TYPE = "service-workstation"

const RUNNING = "running.code"

const PROVING = "running.test"

const TS = "ts"

const RUNS = "runService"

const REFUSED_EXIT = 2

const SAID = "service-running:"

export type Running = () => void | Promise<void>

export type Reached =
  | { readonly running: Running }
  | { readonly unnamed: string }
  | { readonly refused: string }

export function noService(slug: string): string {
  return `no workstation service is slugged \`${slug}\``
}

export function provingFor(root: string, slugs: Iterable<string>): readonly string[] {
  const found: string[] = []
  for (const slug of slugs) {
    const page = listedAt(root, SERVICE_PAGE_TYPE, slug)[0]
    if (page === undefined) continue
    const beside = besideAt(page.path, PROVING, TS)
    if (beside !== null) found.push(beside)
  }
  return found.sort()
}

export async function reachedFor(
  root: string,
  slug: string,
  codeAt: string = ""
): Promise<Reached> {
  const found = listedAt(root, SERVICE_PAGE_TYPE, slug)[0]
  if (found === undefined) return { unnamed: noService(slug) }
  const beside = besideAt(found.path, RUNNING, TS)
  if (beside === null) {
    return { refused: `\`${slug}\` sits at \`${found.path}\`, which takes no code beside it` }
  }
  const at = join(codeAt === "" ? root : codeAt, beside)
  if (!existsSync(at)) return { refused: `\`${slug}\` keeps no \`${RUNNING}\` at \`${at}\`` }
  const held = (await import(at)) as Record<string, unknown>
  const named = held[RUNS]
  if (typeof named !== "function") {
    return { refused: `\`${beside}\` runs \`${slug}\`, and it exports no \`${RUNS}\`` }
  }
  return { running: named as Running }
}

export async function runNamedService(argv: readonly string[]): Promise<number> {
  const slug = argv[0]
  if (slug === undefined) {
    process.stderr.write(`${SAID} name the service to run\n`)
    return REFUSED_EXIT
  }
  const reached = await reachedFor(checkoutAt(), slug, checkoutHere())
  if ("unnamed" in reached) {
    process.stderr.write(`${SAID} ${reached.unnamed}\n`)
    return REFUSED_EXIT
  }
  if ("refused" in reached) {
    process.stderr.write(`${SAID} ${reached.refused}\n`)
    return REFUSED_EXIT
  }
  await reached.running()
  return 0
}

if (import.meta.main) process.exitCode = await runNamedService(process.argv.slice(2))
