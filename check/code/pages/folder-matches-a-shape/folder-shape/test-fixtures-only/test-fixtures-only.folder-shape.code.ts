import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofOneTypeOnly } from "akasha/check/code/pages/folder-matches-a-shape/modules/one-type-only/one-type-only.module.code.ts"

export const HOLDS = ["test-fixtures"]

const WANTED = { pageTypeSlug: "test-fixture", one: "test fixture", many: "test fixtures" }

export function testFixturesOnly(standing: Standing): readonly string[] {
  return ofOneTypeOnly(standing, WANTED)
}
