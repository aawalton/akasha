import type { PageType } from "@akasha/pages-system/page-type"
import type { FocusScriptId } from "../properties/focus-script-id.text-property.ts"
import type { GrimoireId } from "../properties/grimoire-id.text-property.ts"
import type { TemperSkill } from "../skills/temper-skill.page-type.ts"

export type TemperScribedSkill = TemperSkill & {
  focusScriptId: FocusScriptId
  grimoireId: GrimoireId
}

export const temperScribedSkill = {
  id: "01a05fca-cb8a-72ce-84c1-1585368027e5",
  pageTypeSlug: "page-type",
  slug: "temper-scribed-skill",
  definition: "a skill written out of a grimoire and its scripts",
  pluralSlug: "temper-scribed-skills",
  extendsSlug: "page-type/temper-skill",
  partSlugs: ["text-property/focus-script-id", "text-property/grimoire-id"],
  properties: [
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "focus-script-id", required: true, many: false },
    { pagePropertySlug: "grimoire-id", required: true, many: false },
  ],
} as const satisfies PageType
