import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const changeMechanicalFolder = {
  id: "01a07ba6-609c-74fc-9684-d3a8d7baccfb",
  type: "page-type",
  slug: "change-mechanical-folder",
  definition: "a mechanical change acting on the files a folder has rather than on one of them",
  pluralSlug: "change-mechanical-folder",
  extends: ["page-type/change-mechanical"],
  parts: ["domain/change-mechanical-folder-move", "domain/change-mechanical-folder-remove"],
  properties: [
    { pageProperty: "relation-property/change-target-type", required: true, many: false },
    {
      pageProperty: "relation-property/change-target-subtype",
      required: true,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No rung here makes a folder.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here renames a folder.",
    },
  ],
  types: "ts",
} as const satisfies PageType
