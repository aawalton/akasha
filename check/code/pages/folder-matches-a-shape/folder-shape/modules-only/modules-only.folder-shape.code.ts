import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofOneTypeOnly } from "akasha/check/code/pages/folder-matches-a-shape/modules/one-type-only/one-type-only.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"

export const HOLDS = [".server"]

const WANTED = { pageTypeSlug: module.slug, one: module.slug, many: module.pluralSlug }

export function modulesOnly(standing: Standing): readonly string[] {
  return ofOneTypeOnly(standing, WANTED)
}
