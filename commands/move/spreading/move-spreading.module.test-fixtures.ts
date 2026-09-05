import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { put } from "@akasha/testing-system/putting"
import {
  CODE,
  HELD,
  HOLDER,
  OTHER,
  PAGE,
  rebuilt,
  repoWith,
  TARGET,
  UNSAID,
  VALUES,
} from "../move.command.test-fixtures.ts"

export const HELD_AT = "akasha/far/one/held.module.ts"

export const HOLDER_AT = "akasha/far/one/held.module.code.ts"

export const NESTED_HELD = "akasha/one/under/nested.module.code.ts"

export const NESTED_AT = "akasha/far/one/under/nested.module.code.ts"

export const LOOSE = "akasha/one/loose.module.ts"

export const UNSAID_UNDER = "akasha/far/one/held.module.uncommitted.ts"

export function folderWorld(): string {
  return rebuilt(repoWith({ [HELD]: PAGE, [HOLDER]: CODE, [NESTED_HELD]: OTHER, [TARGET]: OTHER }))
}

export function folderUnsaid(): string {
  const root = folderWorld()
  put(root, UNSAID, VALUES)
  return root
}

export function bareDir(root: string, path: string): undefined {
  mkdirSync(join(root, path), { recursive: true })
}
