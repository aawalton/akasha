import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const fieldKeyNotCarriedTwice = {
  id: "01a07984-2e7f-7d7a-aee0-2708d063ae88",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "field-key-not-carried-twice",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer whose written property has one key on two fields",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property judged is read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types are property types is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "The key a field carries is read from the property that field names.",
    },
    {
      invariantKind: "departure",
      statement: "A field naming a property the answer writes has that property's key.",
    },
    {
      invariantKind: "departure",
      statement: "Two fields with one key refuse the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names both properties.",
    },
    {
      invariantKind: "departure",
      statement: "A path under no page property name is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a page type has one key twice is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement:
        "Whether a field names a page reaching nothing is judged by `relation-reaches-a-page`.",
    },
  ],
} as const satisfies ChangeGuard
