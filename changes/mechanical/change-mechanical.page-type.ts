import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const changeMechanical = {
  id: "01a078e8-e0c0-7001-9d36-808d02d6c285",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "change-mechanical",
  definition: "a change another change composes rather than a command line reaches",
  pluralSlug: "change-mechanical",
  extends: ["page-type/change"],
  parts: [
    "page-type/change-mechanical-file",
    "page-type/change-mechanical-folder",
    "page-type/change-mechanical-file-content",
    "relation-property/guards",
  ],
  properties: [
    {
      pageProperty: "relation-property/guards",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mechanical change is reached by another change rather than by a command.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change runs no check of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change is filed under the sub-type naming the thing acted on.",
    },
    {
      invariantKind: "absence",
      statement: "No mechanical change acts on a page type or on a page property or on prose.",
    },
    {
      invariantKind: "departure",
      statement: "An agent change reaches all three by composing the rungs beneath.",
    },
  ],
  types: "ts",
} as const satisfies PageType
