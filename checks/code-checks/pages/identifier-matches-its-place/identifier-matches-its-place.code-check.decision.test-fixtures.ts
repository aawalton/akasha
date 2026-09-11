import { noPathsFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { lowerCamelCase } from "akasha/pages/name-formats/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import { upperCamelCase } from "akasha/pages/name-formats/pages/upper-camel-case/upper-camel-case.name-format.code.ts"
import { upperSnakeCase } from "akasha/pages/name-formats/pages/upper-snake-case/upper-snake-case.name-format.code.ts"
import { componentIdentifier } from "akasha/pages/name-places/pages/component-identifier.name-place.ts"
import { constantIdentifier } from "akasha/pages/name-places/pages/constant-identifier.name-place.ts"
import { derivedIdentifier } from "akasha/pages/name-places/pages/derived-identifier.name-place.ts"
import { functionIdentifier } from "akasha/pages/name-places/pages/function-identifier.name-place.ts"
import { typeIdentifier } from "akasha/pages/name-places/pages/type-identifier.name-place.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { filing } from "../../../modules/scratch/check-scratch.module.code.ts"
import type { Places } from "./identifier-matches-its-place.code-check.decision.code.ts"

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

export const PLACES: Places = {
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
  noPathsFiled(root)
  for (const one of FORMATS) {
    filing(root, FORMAT, one.slug, `id-${one.slug}`)
    const body = `export function ${one.named}(name) {\n  return ${one.said}\n}\n`
    writing(root, `akasha/${one.slug}.${FORMAT}.code.ts`, body)
  }
  return root
}
