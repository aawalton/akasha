import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const runCode = {
  id: "01a08e05-72f7-7a28-b5c7-0e54c3d54c55",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "run-code",
  propertySlug: "code",
  definition: "the page whose code file a command runs",
  targetPageType: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command names this page rather than spelling that page's path.",
    },
    {
      invariantKind: "departure",
      statement: "The file a command runs is the one code file this page's type requires.",
    },
    {
      invariantKind: "departure",
      statement: "The program running that file is settled by the form the page holds it in.",
    },
    {
      invariantKind: "departure",
      statement: "A page moving to another folder leaves the command naming that page whole.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
