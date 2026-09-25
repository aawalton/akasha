import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMechanicalFile = {
  id: "01a07ba6-609b-7d7a-bf95-48bb415b1bc2",
  type: "page-type/page-type",
  slug: "change-mechanical-file",
  definition: "a mechanical change acting on where a file sits rather than on what that file holds",
  extends: ["page-type/change-mechanical"],
  parts: [
    "change-mechanical-file/add-if-not-present-file",
    "change-mechanical/change-page-page-type",
    "domain/change-mechanical-file-add",
    "domain/change-mechanical-file-divide",
    "domain/change-mechanical-file-move",
    "domain/change-mechanical-file-remove",
  ],
  properties: [],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
