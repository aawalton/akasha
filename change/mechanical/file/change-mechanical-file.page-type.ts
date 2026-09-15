import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMechanicalFile = {
  id: "01a07ba6-609b-7d7a-bf95-48bb415b1bc2",
  type: "page-type",
  slug: "change-mechanical-file",
  definition: "a mechanical change acting on where a file sits rather than on what that file holds",
  extends: ["page-type/change-mechanical"],
  parts: [
    "domain/change-mechanical-file-add",
    "domain/change-mechanical-file-add-if-not-present",
    "domain/change-mechanical-file-change",
    "domain/change-mechanical-file-divide",
    "domain/change-mechanical-file-move",
    "domain/change-mechanical-file-remove",
    "domain/change-mechanical-file-rename",
  ],
  properties: [],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
