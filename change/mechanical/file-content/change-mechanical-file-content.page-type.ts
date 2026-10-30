import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMechanicalFileContent = {
  id: "01a07c97-c872-71a7-8e77-3ba5f2f974e0",
  type: "page-type/page-type",
  slug: "change-mechanical-file-content",
  definition: "a mechanical change to a file's body",
  parts: [
    "change-mechanical-file-content/append-lines",
    "domain/change-mechanical-file-content-add",
    "domain/change-mechanical-file-content-change",
    "domain/change-mechanical-file-content-move",
    "domain/change-mechanical-file-content-remove",
    "domain/change-mechanical-file-content-rename",
  ],
  extends: ["page-type/change-mechanical"],
  properties: [],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-07T15:58:37.170Z",
  updatedAt: "2026-10-30T17:07:59.871Z",
} as const satisfies PageType
