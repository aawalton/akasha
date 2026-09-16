import {
  AT_LOAD,
  BY_DECLARATION,
  KNOWN,
  LOADING,
  NAMES,
  NAMES_CODE,
  NAMES_TYPE,
} from "akasha/graph/modules/asking/graph-asking.module.test-fixtures.ts"
import { codeImports } from "akasha/graph/predicate/pages/code-imports/code-imports.graph-predicate.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const EITHER_NAME = [
  { attribute: "graph-attribute/names", value: NAMES_CODE },
  { attribute: "graph-attribute/names", value: NAMES_TYPE },
]

const writing = new TextEncoder()

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
