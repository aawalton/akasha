import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PHONE_NUMBER = "phone-number-property"

const PAGE_TYPE = "page-type"

const PLUS = "+"

const ZERO = "0"

const E164 = /^\+[1-9][0-9]{1,14}$/

const DIGITS = /^[0-9]+$/

const LONGEST = 15

const NOT_TEXT = "rather than as text, and a phone number is written out in E.164"

const OFF_SHAPE = "is not written in E.164 — a number opens with `+` and holds digits alone"

const OFF_CODE =
  "opens its country calling code with `0`, and a number carries its own country calling code"

const TOO_LONG = "and a number reaching fifteen digits is the longest there is"

const TOO_SHORT =
  "holds one digit alone, and a number carries a country calling code and a number under it"

export type Keyed = ReadonlyMap<string, string>

function sortOf(said: unknown): string {
  if (said === null) return "nothing"
  if (Array.isArray(said)) return "a list"
  return `a ${typeof said}`
}

export function reasonFor(slug: string, said: unknown): string | null {
  const states = `states \`${slug}\``
  if (typeof said !== "string") return `${states} as ${sortOf(said)} ${NOT_TEXT}`
  if (E164.test(said)) return null
  const which = `${states} as "${said}", which`
  const digits = said.startsWith(PLUS) ? said.slice(PLUS.length) : null
  if (digits === null || !DIGITS.test(digits)) return `${which} ${OFF_SHAPE}`
  if (digits.startsWith(ZERO)) return `${which} ${OFF_CODE}`
  if (digits.length > LONGEST) return `${which} runs to ${digits.length} digits, ${TOO_LONG}`
  return `${which} ${TOO_SHORT}`
}

export function reasonsIn(value: Value, keyed: Keyed): readonly string[] {
  const said: string[] = []
  for (const [key, slug] of keyed) {
    if (!(key in value)) continue
    const held = value[key]
    for (const one of Array.isArray(held) ? held : [held]) {
      const reason = reasonFor(slug, one)
      if (reason !== null) said.push(reason)
    }
  }
  return said
}

function keyedIn(pageTypeSlug: string, under: ReadonlySet<string>, paged: Paged): Keyed {
  const found = new Map<string, string>()
  for (const one of paged.index.propertiesOf(pageTypeSlug)) {
    if (under.has(one.pageTypeSlug)) found.set(one.key, one.pagePropertySlug)
  }
  return found
}

function typesCarryingOne(paged: Paged): ReadonlySet<string> {
  const found = new Set<string>()
  for (const kind of paged.index.kindsUnder(PHONE_NUMBER)) {
    for (const listed of paged.index.everyOfType(kind)) {
      for (const one of paged.index.declaringOf(listed.id)) {
        if (one.kind !== PAGE_TYPE) continue
        for (const below of paged.index.kindsUnder(one.slug)) found.add(below)
      }
    }
  }
  return found
}

export function refusalsIn(paths: readonly string[], paged: Paged): readonly Judged[] {
  const under = paged.index.kindsUnder(PHONE_NUMBER)
  const carrying = typesCarryingOne(paged)
  const held = new Map<string, Keyed>()
  const keyedBy = (pageTypeSlug: string): Keyed => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const made = keyedIn(pageTypeSlug, under, paged)
    held.set(pageTypeSlug, made)
    return made
  }
  const judged: Judged[] = []
  for (const path of paths) {
    if (!pageNamed(path, carrying)) continue
    const pageTypeSlug = partedIn(path)?.pageType
    if (pageTypeSlug === undefined) continue
    const keyed = keyedBy(pageTypeSlug)
    if (keyed.size === 0) continue
    const value = paged.pageOf(path)
    if (value === null) continue
    for (const reason of reasonsIn(value, keyed)) judged.push({ path, reason })
  }
  return judged
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsIn(change.changed, shadow)
}
