import type { PageType } from "@akasha/pages/page-type"

export const worldAspect = {
  id: "01a06558-a991-7cc1-8110-7cd6d92ebb03",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-aspect",
  definition: "a change the world makes to what a character is made of",
  pluralSlug: "world-aspects",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
