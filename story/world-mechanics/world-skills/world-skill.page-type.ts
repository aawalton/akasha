import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"
import type { WorldMechanic } from "../world-mechanic.page-type.types.ts"

export type WorldSkill = WorldMechanic

export const worldSkill = {
  id: "01a06558-a991-78e4-a48c-b4e64323c76c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-skill",
  definition: "an ability a character works from the magic within them",
  pluralSlug: "world-skills",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
