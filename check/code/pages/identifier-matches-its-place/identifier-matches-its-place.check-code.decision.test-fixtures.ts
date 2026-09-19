import type { Places } from "akasha/check/code/pages/identifier-matches-its-place/modules/place-reading/place-reading.module.code.ts"
import { filing } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { nameFormat } from "akasha/page/name-format/name-format.page-type.ts"
import { lowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import { lowerCamelCase as lowerCamelCasePage } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.ts"
import { upperCamelCase } from "akasha/page/name-format/pages/upper-camel-case/upper-camel-case.name-format.code.ts"
import { upperCamelCase as upperCamelCasePage } from "akasha/page/name-format/pages/upper-camel-case/upper-camel-case.name-format.ts"
import { upperSnakeCase } from "akasha/page/name-format/pages/upper-snake-case/upper-snake-case.name-format.code.ts"
import { upperSnakeCase as upperSnakeCasePage } from "akasha/page/name-format/pages/upper-snake-case/upper-snake-case.name-format.ts"
import { componentIdentifier } from "akasha/page/name-place/pages/component-identifier.name-place.ts"
import { constantIdentifier } from "akasha/page/name-place/pages/constant-identifier.name-place.ts"
import { derivedIdentifier } from "akasha/page/name-place/pages/derived-identifier.name-place.ts"
import { functionIdentifier } from "akasha/page/name-place/pages/function-identifier.name-place.ts"
import { typeIdentifier } from "akasha/page/name-place/pages/type-identifier.name-place.ts"

const FORMAT = nameFormat.slug

export const UPPER_CAMEL = `${FORMAT}/${upperCamelCasePage.slug}` as const

export const LOWER_CAMEL = `${FORMAT}/${lowerCamelCasePage.slug}` as const

export const UPPER_SNAKE = `${FORMAT}/${upperSnakeCasePage.slug}` as const

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

export const FIXED_HELD = "export const __TS__ArrayAt = { one: 1 }\n"

export const TAKEN_AT = "akasha/pages/at/at.change-agent.code.ts"

export const TAKEN = 'export const takes = ["at"]\n'

export const WRITTEN =
  'const HELD = "one"\nconst OVER = { one: 1 }\nconst EVERY = [1]\nconst SHAPE = /one/\n' +
  "const SAID = `one`\nconst ON = true\nconst OFF = false\nconst COUNT = 2\n"

export const DRAWN_NULL = "export function RungOf() {\n  return null\n}\n"

export const DRAWN_ONE = "export function RungOf() {\n  return 1\n}\n"

export const DRAWN_HELD = "function RungOf() {\n  return null\n}\n"

export const PLACES: Places = {
  fixed: new Map([["akasha/lualib-helper", "__TS__ArrayAt"]]),
  loaded: new Map([["change-agent", new Set(["runChange", "takes"])]]),
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
