import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import {
  everyOfType,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { declaredIn, parsedIn } from "akasha/page/modules/value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const THOUSAND = 1000

export type Timed = {
  readonly name: string
  readonly pages: number
  readonly milliseconds: number
}

export function linesFor(held: readonly Timed[]): readonly string[] {
  return held.map((one) => {
    const each = one.pages === 0 ? 0 : (one.milliseconds * THOUSAND) / one.pages
    return `${one.name}\t${one.pages} pages\t${one.milliseconds}ms\t${each.toFixed(2)}us a page`
  })
}

function bodiesUnder(from: string): readonly string[] {
  const found: string[] = []
  for (const pageTypeSlug of slugsOfType(from, PAGE_TYPE)) {
    for (const one of everyOfType(from, pageTypeSlug)) {
      const at = join(from, one.path)
      const there = statSync(at, { throwIfNoEntry: false })
      if (there?.isFile() === true) found.push(readFileSync(at, "utf8"))
    }
  }
  return found
}

export function ranValue(body: string): unknown {
  try {
    for (const one of Object.values(declaredIn(body))) {
      if (one !== null && typeof one === "object" && !Array.isArray(one)) return one
    }
  } catch {
    return null
  }
  return null
}

function timedOver(
  name: string,
  bodies: readonly string[],
  answering: (body: string) => unknown
): Timed {
  const began = Date.now()
  for (const body of bodies) answering(body)
  return { name, pages: bodies.length, milliseconds: Date.now() - began }
}

export function measured(from: string): readonly string[] {
  const bodies = bodiesUnder(from)
  let refused = 0
  for (const body of bodies) {
    if (parsedIn(body) === null) refused += 1
  }
  const held = [
    timedOver("read off the text", bodies, parsedIn),
    timedOver("run as code", bodies, ranValue),
  ]
  return [...linesFor(held), `refused by the reading\t${refused} pages`]
}
