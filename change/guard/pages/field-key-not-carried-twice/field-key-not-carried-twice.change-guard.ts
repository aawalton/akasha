import type { ChangeGuard } from "akasha/change/guard/change-guard.page-type.types.ts"

export const fieldKeyNotCarriedTwice = {
  id: "01a07984-2e7f-7d7a-aee0-2708d063ae88",
  type: "change-guard",
  slug: "field-key-not-carried-twice",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer whose written property has one key on two fields",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The property judged is read from the index the answer leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types are property types is read from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key a field carries is read from the property that field names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field naming a property the answer writes has that property's key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two fields with one key refuse the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names both properties.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under no page property name is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a page type has one key twice is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Whether a field names a page reaching nothing is judged by `relation-reaches-a-page`.",
    },
  ],
} as const satisfies ChangeGuard
