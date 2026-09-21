import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const accessDeed = {
  id: "01a0c4e5-b199-731b-8466-73e43f5f9395",
  type: "page-type/page-type",
  slug: "access-deed",
  definition: "what an access lets its holder do",
  parts: ["access-deed/read", "access-deed/write", "access-deed/read-some"],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
