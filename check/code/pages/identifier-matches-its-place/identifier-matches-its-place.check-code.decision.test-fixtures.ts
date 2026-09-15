import type { Places } from "akasha/check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.code.ts"
import { filing } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { lowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import { upperCamelCase } from "akasha/page/name-format/pages/upper-camel-case/upper-camel-case.name-format.code.ts"
import { upperSnakeCase } from "akasha/page/name-format/pages/upper-snake-case/upper-snake-case.name-format.code.ts"
import { componentIdentifier } from "akasha/page/name-place/pages/component-identifier.name-place.ts"
import { constantIdentifier } from "akasha/page/name-place/pages/constant-identifier.name-place.ts"
import { derivedIdentifier } from "akasha/page/name-place/pages/derived-identifier.name-place.ts"
import { functionIdentifier } from "akasha/page/name-place/pages/function-identifier.name-place.ts"
import { typeIdentifier } from "akasha/page/name-place/pages/type-identifier.name-place.ts"

const FORMAT = "name-format"

export const AT = "akasha/held.ts"

export const DRAWN_AT = "akasha/held.tsx"

export const PAGE_AT = "akasha/held-over.module.ts"

export const BESIDE_AT = "akasha/held-over.module.code.ts"

export const HELD_AT = "akasha/held-over.module.uncommitted.ts"

type Formatted = {
  readonly slug: string
  readonly named: string
  readonly said: string
}

const FORMATS: readonly Formatted[] = [
  {
    slug: "upper-camel-case",
    named: "upperCamelCase",
    said: "name.slice(0, 1) !== name.slice(0, 1).toLowerCase()",
  },
  {
    slug: "lower-camel-case",
    named: "lowerCamelCase",
    said: "name.slice(0, 1) === name.slice(0, 1).toLowerCase()",
  },
  {
    slug: "upper-snake-case",
    named: "upperSnakeCase",
    said: "name === name.toUpperCase()",
  },
]

export const FIXED_AT = "akasha/lualib-helper/at.lualib-helper.code.ts"

export const FIXED_BODY = "export function __TS__ArrayAt() {}\n"

export const DRAWN_NULL = "export function RungOf() {\n  return null\n}\n"

export const DRAWN_ONE = "export function RungOf() {\n  return 1\n}\n"

export const DRAWN_HELD = "function RungOf() {\n  return null\n}\n"

export const PLACES: Places = {
  fixed: new Map([["akasha/lualib-helper", "__TS__ArrayAt"]]),
  typeIdentifier: {
    nameFormat: typeIdentifier.nameFormat,
    matching: upperCamelCase,
  },
  functionIdentifier: {
    nameFormat: functionIdentifier.nameFormat,
    matching: lowerCamelCase,
  },
  componentIdentifier: {
    nameFormat: componentIdentifier.nameFormat,
    matching: upperCamelCase,
  },
  constantIdentifier: {
    nameFormat: constantIdentifier.nameFormat,
    matching: upperSnakeCase,
  },
  derivedIdentifier: {
    nameFormat: derivedIdentifier.nameFormat,
    matching: lowerCamelCase,
  },
}

export const scratch = scratchWorld()

export function placed(): string {
  const root = scratch.rootFor("akasha-identifier-place-")
  for (const one of FORMATS) {
    filing(root, FORMAT, one.slug, `id-${one.slug}`)
    const body = `export function ${one.named}(name) {\n  return ${one.said}\n}\n`
    writing(root, `akasha/${one.slug}.${FORMAT}.code.ts`, body)
  }
  return root
}
