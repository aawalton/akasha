import { join } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { performance as performanceArgument } from "akasha/commands/arguments/pages/performance.argument.ts"
import { faulted, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measurePerformance as page } from "akasha/commands/pages/measure/performance/measure-performance.command.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt, slugsOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const PERFORMANCE = "performance"

const CODE = "code"

const TS = "ts"

const MEASURED = "measured"

export type Measuring = (root: string) => Promise<readonly string[]>

export function thereAre(there: readonly string[]): string {
  return `the performances there are ${namesDrawn(there)}`
}

export function noPerformance(slug: string, there: readonly string[]): readonly string[] {
  if (there.includes(slug)) return []
  return [`\`${slug}\` is no performance — it carries ${namesDrawn(there)}`]
}

function codeAt(root: string, slug: string): string {
  const found = listedAt(root, PERFORMANCE, slug)[0]
  if (found === undefined) throw new Error(`\`${slug}\` is a performance filed under no path`)
  const at = besideAt(found.path, CODE, TS)
  if (at === null) throw new Error(`\`${found.path}\` names no code beside it`)
  return at
}

async function measuringIn(root: string, at: string): Promise<Measuring> {
  const held = (await import(join(root, at))) as Record<string, unknown>
  const found = held[MEASURED]
  if (typeof found !== "function") {
    throw new Error(`\`${at}\` exports no \`${MEASURED}\`, so there is nothing here to run`)
  }
  return found as Measuring
}

export async function measurePerformance(argv: readonly string[], given: Given): Promise<Answer> {
  try {
    const there = slugsOfType(given.root, PERFORMANCE)
    const read = takenFor(argv, given.calledAs, page, [performanceArgument])
    if ("refused" in read) return mistaking([...read.refused, thereAre(there)])
    const slug = read.taken.performance
    const unknown = noPerformance(slug, there)
    if (unknown.length > 0) return mistaking(unknown)
    const at = codeAt(given.root, slug)
    const measuring = await measuringIn(given.root, at)
    return told([...(await measuring(given.root))])
  } catch (thrown) {
    return faulted(thrown)
  }
}
