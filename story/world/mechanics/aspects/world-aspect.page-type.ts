import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldAspect = {
  id: "01a06558-a991-7cc1-8110-7cd6d92ebb03",
  type: "page-type/page-type",
  slug: "world-aspect",
  definition: "a change the world makes to a character's makeup",
  pluralSlug: "aspects",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-22T13:52:13.000Z",
} as const satisfies PageType
