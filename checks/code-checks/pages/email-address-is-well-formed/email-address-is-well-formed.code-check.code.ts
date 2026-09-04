import { namesIn } from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { textAt, type Value } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.code.ts"

const ADDRESS = "email-address-property"

const KIND = "pageTypeSlug"

const AT = "@"

const LONGEST = 254

const WHITESPACE = /\s/

const DIVIDES = `the \`${AT}\` divides the mailbox from the domain it stands at`

export type Keyed = {
  readonly propertySlug: string
  readonly key: string
}

export type Keying = (pageTypeSlug: string) => readonly Keyed[]

export function whyRefused(propertySlug: string, said: string): string | null {
  const states = `states \`${propertySlug}\` as`
  if (said.length > LONGEST) {
    return (
      `${states} an address of ${said.length} characters, and an address reaching ` +
      `${LONGEST} characters is the longest there is`
    )
  }
  if (WHITESPACE.test(said)) {
    return `${states} \`${said}\`, which holds whitespace, and an address holds none`
  }
  if (said !== said.toLowerCase()) {
    return `${states} \`${said}\`, and an address is written in lowercase`
  }
  const held = said.split(AT).length - 1
  if (held !== 1) {
    return `${states} \`${said}\`, which holds ${held} \`${AT}\`, and an address holds one`
  }
  if (said.startsWith(AT)) {
    return `${states} \`${said}\`, which states no mailbox before the \`${AT}\`, and ${DIVIDES}`
  }
  if (said.endsWith(AT)) {
    return `${states} \`${said}\`, which states no domain after the \`${AT}\`, and ${DIVIDES}`
  }
  return null
}

export function keyingIn(under: ReadonlySet<string>, shadow: Shadow): Keying {
  const held = new Map<string, readonly Keyed[]>()
  return (pageTypeSlug) => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const made: Keyed[] = []
    for (const one of shadow.index.propertiesOf(pageTypeSlug)) {
      if (under.has(one.pageTypeSlug)) made.push({ propertySlug: one.propertySlug, key: one.key })
    }
    held.set(pageTypeSlug, made)
    return made
  }
}

export function reasonsIn(path: string, value: Value, keying: Keying): readonly Judged[] {
  const kind = textAt(value, KIND)
  if (kind === null) return []
  const said: Judged[] = []
  for (const one of keying(kind)) {
    for (const address of namesIn(value[one.key])) {
      const why = whyRefused(one.propertySlug, address)
      if (why !== null) said.push({ path, reason: why })
    }
  }
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const under = shadow.index.kindsUnder(ADDRESS)
  const keying = keyingIn(under, shadow)
  const said: Judged[] = []
  for (const one of carried) said.push(...reasonsIn(one.path, one.value, keying))
  return said
}

export const emailAddressIsWellFormed = input(PAGES, refusalsIn)
