import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PROPERTIES = "properties"

const SAID = "pageProperty"

const DEFAULT = "default"

const MEMBERS = "members"

const VALUES = "values"

const EXTENSIONS = "extensions"

const QUALIFIED = "qualified"

const ONE_OF = "one-of-property"

const DEPTH = 3

const BOOLEANS = ["boolean-property", "true-property", "false-property"]

const NUMBERS = ["number-property"]

const RELATIONS = ["relation-property"]

const CHOICES = ["select-property"]

const FILES = ["file-property", "page-property-entry"]

export type Reaching = {
  readonly kindsUnder: (slug: string) => ReadonlySet<string>
  readonly pageAt: (pageTypeSlug: string, slug: string) => Value | null
}

type Kind = { readonly name: string; readonly holds: (held: unknown) => boolean }

const TEXT: Kind = { name: "text", holds: (held) => typeof held === "string" }

const BOOLEAN: Kind = { name: "a boolean", holds: (held) => typeof held === "boolean" }

const NUMBER: Kind = { name: "a number", holds: (held) => typeof held === "number" }

const ADDRESS: Kind = {
  name: "a page's address",
  holds: (held) => typeof held === "string" && addressIn(held).kind === QUALIFIED,
}

function listedIn(page: Value | null, key: string): readonly unknown[] | null {
  const held = page === null ? undefined : page[key]
  return Array.isArray(held) ? held : null
}

function amongOf(name: string, page: Value | null, key: string): Kind {
  const among = listedIn(page, key)
  if (among === null) return TEXT
  return { name, holds: (held) => typeof held === "string" && among.includes(held) }
}

type Kinding = (address: string, depth: number) => Kind

function kindingIn(index: Reaching): Kinding {
  const under = new Map<string, ReadonlySet<string>>()
  const isUnder = (kinds: readonly string[], pageTypeSlug: string): boolean =>
    kinds.some((one) => {
      const found = under.get(one) ?? index.kindsUnder(one)
      under.set(one, found)
      return found.has(pageTypeSlug)
    })
  const kindOf: Kinding = (address, depth) => {
    const said = addressIn(address)
    if (said.kind !== QUALIFIED) return TEXT
    const { pageTypeSlug } = said
    if (isUnder(BOOLEANS, pageTypeSlug)) return BOOLEAN
    if (isUnder(NUMBERS, pageTypeSlug)) return NUMBER
    if (isUnder(RELATIONS, pageTypeSlug)) return ADDRESS
    const page = index.pageAt(pageTypeSlug, said.slug)
    if (isUnder(CHOICES, pageTypeSlug)) return amongOf("one of its values", page, VALUES)
    if (isUnder(FILES, pageTypeSlug)) return amongOf("one of its extensions", page, EXTENSIONS)
    if (pageTypeSlug !== ONE_OF || depth === 0) return TEXT
    const members = (listedIn(page, MEMBERS) ?? []).flatMap((one) =>
      typeof one === "string" ? [kindOf(one, depth - 1)] : []
    )
    if (members.length === 0) return TEXT
    return {
      name: members.map((one) => one.name).join(" or "),
      holds: (held) => members.some((one) => one.holds(held)),
    }
  }
  return kindOf
}

export function defaultReasonsIn(value: Value, index: Reaching): readonly string[] {
  const declared = value[PROPERTIES]
  if (!Array.isArray(declared)) return []
  let kindOf: Kinding | null = null
  const said: string[] = []
  for (const entry of declared) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) continue
    const one = entry as Value
    const address = one[SAID]
    if (typeof address !== "string" || !(DEFAULT in one)) continue
    kindOf = kindOf ?? kindingIn(index)
    const kind = kindOf(address, DEPTH)
    const held = one[DEFAULT]
    if (kind.holds(held)) continue
    said.push(
      `\`${address}\` defaults to ${JSON.stringify(held)}, and that property holds ${kind.name}`
    )
  }
  return said
}
