import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  DATA,
  INPUT,
  OK,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { allowedThrough } from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import { slugIn } from "akasha/commands/pages/infrastructure/service/service-slug-arguing/service-slug-arguing.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const SERVICE_WORKSTATION = "service-workstation"

const RUNNING = "running"

const CODE = "code"

const TS = "ts"

const RUNS = "runService"

export type Running = () => void | Promise<void>

type Reached =
  | { readonly running: Running }
  | { readonly refused: string }
  | { readonly unnamed: string }

function runningAt(page: string): string | null {
  return besideAt(page, `${RUNNING}.${CODE}`, TS)
}

export function noService(slug: string): string {
  return `no workstation service is slugged \`${slug}\``
}

async function reachedFor(root: string, slug: string): Promise<Reached> {
  const found = listedAt(root, SERVICE_WORKSTATION, slug)[0]
  if (found === undefined) return { unnamed: noService(slug) }
  const at = runningAt(found.path)
  if (at === null) {
    return { refused: `\`${slug}\` sits at \`${found.path}\`, which takes no code beside it` }
  }
  if (!existsSync(join(root, at))) {
    return { refused: `\`${slug}\` keeps no \`${RUNNING}\` code at \`${at}\`` }
  }
  const held = (await import(join(root, at))) as Record<string, unknown>
  const named = held[RUNS]
  if (typeof named !== "function") {
    return { refused: `\`${at}\` runs \`${slug}\`, and it exports no \`${RUNS}\`` }
  }
  return { running: named as Running }
}

export async function infrastructureServiceRun(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const named = slugIn(argv, given.calledAs, [])
  if ("refused" in named) return refused(named.refused, INPUT)

  const reached = await reachedFor(given.root, named.slug)
  if ("unnamed" in reached) return refused(reached.unnamed, INPUT)
  if ("refused" in reached) return refused(reached.refused, DATA)

  allowedThrough()
  await reached.running()
  return { report: [`ran\t${named.slug}`], refusals: [], code: OK }
}
