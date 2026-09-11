import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const changeMechanicalPageType = {
  id: "01a09205-7229-7608-86d7-25634926ac24",
  type: "page-type",
  slug: "change-mechanical-page-type",
  definition: "a mechanical change acting on a page type and on every page filed under it",
  pluralSlug: "change-mechanical-page-type",
  extends: ["page-type/change-mechanical"],
  parts: ["domain/change-mechanical-page-type-rename"],
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
      invariantKind: "departure",
      statement: "A rung here answers the whole scope of one act in one call.",
    },
    {
      invariantKind: "departure",
      statement: "A rung here reads the pages of the page type from the index once.",
    },
    {
      invariantKind: "departure",
      statement: "A rung here takes the shortcuts knowing the whole act allows.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here reaches a rung beneath once for each page.",
    },
  ],
  types: "ts",
} as const satisfies PageType
