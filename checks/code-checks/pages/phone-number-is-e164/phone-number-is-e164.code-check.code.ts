import type { Change } from "@akasha/pages-system/change"
import { pageNamed } from "@akasha/pages-system/page-file-name"
import { textAt, type Value } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const PHONE_NUMBER = "phone-number-property"

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

export function keyedIn(pageTypeSlug: string, under: ReadonlySet<string>, shadow: Shadow): Keyed {
  const found = new Map<string, string>()
  for (const one of shadow.index.propertiesOf(pageTypeSlug)) {
    if (under.has(one.pageTypeSlug)) found.set(one.key, one.pagePropertySlug)
  }
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(PHONE_NUMBER)
  const pageTypes = shadow.index.pageTypesIn()
  const held = new Map<string, Keyed>()
  const keyedBy = (pageTypeSlug: string): Keyed => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const made = keyedIn(pageTypeSlug, under, shadow)
    held.set(pageTypeSlug, made)
    return made
  }
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const value = shadow.pageOf(path)
    if (value === null) continue
    const pageTypeSlug = textAt(value, "pageTypeSlug")
    if (pageTypeSlug === null) continue
    const keyed = keyedBy(pageTypeSlug)
    if (keyed.size === 0) continue
    for (const reason of reasonsIn(value, keyed)) judged.push({ path, reason })
  }
  return judged
}

export const phoneNumberIsE164 = input(PAGES, refusalsIn)
