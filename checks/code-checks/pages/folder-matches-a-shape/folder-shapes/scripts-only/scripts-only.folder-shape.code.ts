import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { ofOneTypeOnly } from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/one-type-only/one-type-only.module.code.ts"

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
