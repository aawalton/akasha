import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { graphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.ts"
import { names } from "akasha/graph/attribute/pages/names.graph-attribute.ts"
import { graphEdge } from "akasha/graph/edge/graph-edge.page-type.ts"
import { relation } from "akasha/graph/edge/pages/relation.graph-edge.ts"
import {
  APART_AT,
  AT_LOAD,
  BY_DECLARATION,
  FIRST_AT,
  importsFiled,
  importWorld,
  indexOf,
  KNOWN,
  LOADING,
  NAMES,
  NAMES_CODE,
  NAMES_TYPE,
  namingBody,
  reachingWorld,
  relationWorld,
  SECOND_AT,
  THIRD_AT,
  TYPE_AT_LOAD,
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
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
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

export const RINGS = {
  [FIRST_AT]: [SECOND_AT],
  [SECOND_AT]: [FIRST_AT],
  [THIRD_AT]: [APART_AT],
  [APART_AT]: [THIRD_AT],
}

export function chainOut(...fromFirst: readonly string[]): Taken {
  const first = ["./second.page.ts", ...fromFirst].map(namingBody).join("")
  return walkedOut({ [FIRST_AT]: first, [SECOND_AT]: namingBody("./third.page.ts") }, [FIRST_AT])
}

export function ringOut(): Taken {
  const bodies = {
    [FIRST_AT]: namingBody("./second.page.ts"),
    [SECOND_AT]: namingBody("./first.page.ts"),
  }
  return walkedOut(bodies, [FIRST_AT])
}

export const SIDEWAYS = { ...imports, direction: "sideways" }

export const DECLARED = { [KNOWN]: BY_DECLARATION, [NAMES]: NAMES_CODE, [LOADING]: AT_LOAD }

const CODE_IMPORTERS = { ...importers, follows: codeImports.follows }

export const EITHER_IMPORTS = { ...imports, follows: EITHER_NAME }

const RELATIONS = [`${graphEdge.slug}/${relation.slug}`]

export const CODE_RELATIONS = { ...importers, edges: RELATIONS, follows: codeImports.follows }

export const EITHER_RELATIONS = { ...importers, edges: RELATIONS, follows: EITHER_NAME }

export function relating(): { readonly index: Answering } {
  return { index: indexOf(relationWorld(1)) }
}

export function codeImportersOf(): readonly string[] {
  const root = importWorld()
  importsFiled(root, FIRST_AT, [SECOND_AT], [TYPE_AT_LOAD])
  importsFiled(root, FIRST_AT, [THIRD_AT])
  return closureOf(CODE_IMPORTERS, [FIRST_AT], { index: indexOf(root) })
}

export function changeAdding(root: string, at: string, body: string): Change {
  return {
    root,
    changed: [at],
    before: () => null,
    after: (path) => (path === at ? writing.encode(body) : null),
  }
}
