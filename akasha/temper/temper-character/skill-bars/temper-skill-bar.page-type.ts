import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"

export type TemperSkillBar = TemperCharacterThing

export const temperSkillBar = {
  id: "01a05fcd-f558-70b6-8f78-cec3aed405a1",
  pageTypeSlug: "page-type",
  slug: "temper-skill-bar",
  definition: "one of the two rows a character slots skills into",
  pluralSlug: "temper-skill-bars",
  extendsSlug: "page-type/temper-character-thing",
} as const satisfies PageType
