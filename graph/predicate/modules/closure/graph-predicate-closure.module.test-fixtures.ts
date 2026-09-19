import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { graphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.ts"
import { names } from "akasha/graph/attribute/pages/names.graph-attribute.ts"
import {
  AT_LOAD,
  BY_DECLARATION,
  importWorld,
  indexOf,
  KNOWN,
  LOADING,
  NAMES,
  NAMES_CODE,
  NAMES_TYPE,
  reachingWorld,
} from "akasha/graph/modules/asking/graph-asking.module.test-fixtures.ts"
import {
  closureOf,
  loopsIn,
  type Taken,
  takenIn,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { codeImports } from "akasha/graph/predicate/pages/code-imports/code-imports.graph-predicate.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const NAMES_AT = `${graphAttribute.slug}/${names.slug}`

const EITHER_NAME = [
  { attribute: NAMES_AT, value: NAMES_CODE },
  { attribute: NAMES_AT, value: NAMES_TYPE },
]

const ENDING = ".ts"

const writing = new TextEncoder()

type Reaching = Readonly<Record<string, readonly string[]>>

export function through(one: string): boolean {
  return one.endsWith(ENDING)
}

export function walkedIn(reaching: Reaching, seeds: readonly string[]): Taken {
  return takenIn(importers, seeds, { index: indexOf(reachingWorld(reaching)) })
}

export function walkedOut(
  bodies: Readonly<Record<string, string>>,
  seeds: readonly string[]
): Taken {
  return takenIn(imports, seeds, { index: indexOf(importWorld()), bodyAt: filesOf(bodies) })
}

export function closedIn(reaching: Reaching, seeds: readonly string[]): readonly string[] {
  return closureOf(importers, seeds, { index: indexOf(reachingWorld(reaching)) })
}

export function loopsOver(reaching: Reaching): readonly (readonly string[])[] {
  return loopsIn(walkedIn(reaching, Object.keys(reaching)))
}

export const SIDEWAYS = { ...imports, direction: "sideways" }

export const DECLARED = { [KNOWN]: BY_DECLARATION, [NAMES]: NAMES_CODE, [LOADING]: AT_LOAD }

export const CODE_IMPORTERS = { ...importers, follows: codeImports.follows }

export const EITHER_IMPORTS = { ...imports, follows: EITHER_NAME }

export const EITHER_IMPORTERS = { ...importers, follows: EITHER_NAME }

export function changeAdding(root: string, at: string, body: string): Change {
  return {
    root,
    changed: [at],
    before: () => null,
    after: (path) => (path === at ? writing.encode(body) : null),
  }
}
