import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldSkill = {
  id: "01a06558-a991-78e4-a48c-b4e64323c76c",
  type: "page-type/page-type",
  slug: "world-skill",
  definition: "an ability a character works from the magic within them",
  pluralSlug: "skills",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
