import { join } from "node:path"
import { faulted, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt, slugsOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const PERFORMANCE = "performance"

const CODE = "code"

const TS = "ts"

export const MEASURED = "measured"

export type Measuring = (root: string) => Promise<readonly string[]>

export type Read = { readonly slug: string } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[], there: readonly string[]): Read {
  const refusals: string[] = []
  const named: string[] = []
  for (const one of argv) {
    if (one.startsWith("-")) refusals.push(`\`${one}\` is no flag this takes`)
    else named.push(one)
  }
  const first = named[0]
  if (first === undefined) {
    return { refused: [...refusals, `this names no performance — it carries ${namesDrawn(there)}`] }
  }
  for (const one of named.slice(1)) {
    refusals.push(`\`${one}\` follows \`${first}\`, and one call runs one performance`)
  }
  if (!there.includes(first)) {
    refusals.push(`\`${first}\` is no performance — it carries ${namesDrawn(there)}`)
  }
  return refusals.length > 0 ? { refused: refusals } : { slug: first }
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
    const read = readIn(argv, slugsOfType(given.root, PERFORMANCE))
    if ("refused" in read) return mistaking(read.refused)
    const at = codeAt(given.root, read.slug)
    const measuring = await measuringIn(given.root, at)
    return told([...(await measuring(given.root))])
  } catch (thrown) {
    return faulted(thrown)
  }
}
