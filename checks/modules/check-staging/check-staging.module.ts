import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const checkStaging = {
  id: "01a08e16-827d-7f4d-bb26-5724ed027608",
  pageTypeSlug: "module",
  type: "module",
  slug: "check-staging",
  definition: "the scratch checkout a check's test runs over",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The checkout sits where the scratch world puts it.",
    },
    {
      invariantKind: "departure",
      statement: "Every body the checkout is asked for is written where that body's path says.",
    },
    {
      invariantKind: "departure",
      statement: "What a body the checkout is asked for imports is filed in the import index.",
    },
    {
      invariantKind: "departure",
      statement: "The pages the import index and its edge are sit in the checkout too.",
    },
    {
      invariantKind: "departure",
      statement: "A page named in the checkout is answered under its page type and slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change over the checkout reads what it carries, then what it was handed, then the disk.",
    },
    {
      invariantKind: "absence",
      statement: "No git tree is made here.",
    },
  ],
} as const satisfies Module
