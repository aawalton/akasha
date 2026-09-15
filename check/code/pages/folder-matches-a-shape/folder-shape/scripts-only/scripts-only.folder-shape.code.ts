import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofOneTypeOnly } from "akasha/check/code/pages/folder-matches-a-shape/modules/one-type-only/one-type-only.module.code.ts"

export const HOLDS = ["scripts"]

const WANTED = {
  pageTypeSlug: "shell-script",
  one: "script",
  many: "scripts",
  declared: false,
}

export function scriptsOnly(standing: Standing): readonly string[] {
  return ofOneTypeOnly(standing, WANTED)
}
