import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCarriedMemory = {
  id: "01a06558-a991-78c7-9a6d-2ab331b3a6c0",
  type: "page-type/page-type",
  slug: "world-carried-memory",
  definition: "someone else's remembered life, carried by a character",
  pluralSlug: "carried-memories",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
