import { noPathsFiled } from "@akasha/indexes/testing"
import { lowerCamelCase } from "@akasha/pages/name-format/lower-camel-case"
import { upperCamelCase } from "@akasha/pages/name-format/upper-camel-case"
import { upperSnakeCase } from "@akasha/pages/name-format/upper-snake-case"
import { componentIdentifier } from "@akasha/pages/name-place/component-identifier"
import { constantIdentifier } from "@akasha/pages/name-place/constant-identifier"
import { derivedIdentifier } from "@akasha/pages/name-place/derived-identifier"
import { functionIdentifier } from "@akasha/pages/name-place/function-identifier"
import { typeIdentifier } from "@akasha/pages/name-place/type-identifier"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { filing } from "../../../modules/scratch/check-scratch.module.code.ts"
import type { Places } from "./identifier-matches-its-place.code-check.decision.code.ts"

const FORMAT = "name-format"

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
