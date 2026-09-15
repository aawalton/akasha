import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMechanicalFolder = {
  id: "01a07ba6-609c-74fc-9684-d3a8d7baccfb",
  type: "page-type/page-type",
  slug: "change-mechanical-folder",
  definition: "a mechanical change acting on the files a folder has rather than on one of them",
  extends: ["page-type/change-mechanical"],
  parts: ["change-mechanical-folder/move-folder", "change-mechanical-folder/remove-folder"],
  properties: [],
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung here makes a folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung here renames a folder.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
