import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldSkill = WorldMechanic

export const worldSkill = {
  id: "01a06558-a991-78e4-a48c-b4e64323c76c",
  pageTypeSlug: "page-type",
  slug: "world-skill",
  definition: "an ability a character works from the magic within them",
  pluralSlug: "world-skills",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
