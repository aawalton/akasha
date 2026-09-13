import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { ofOneTypeOnly } from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/one-type-only/one-type-only.module.code.ts"

export const HOLDS = ["modules", ".server"]

const WANTED = { pageTypeSlug: "module", one: "module", many: "modules" }

export function modulesOnly(standing: Standing): readonly string[] {
  return ofOneTypeOnly(standing, WANTED)
}
