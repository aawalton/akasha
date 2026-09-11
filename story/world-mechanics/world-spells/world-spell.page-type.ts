import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const worldSpell = {
  id: "01a06558-a991-7470-be3c-3b147e9922f7",
  type: "page-type",
  slug: "world-spell",
  definition: "an ability a character works from the magic around them",
  pluralSlug: "world-spells",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
