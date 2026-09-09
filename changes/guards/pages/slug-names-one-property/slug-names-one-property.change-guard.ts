import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const slugNamesOneProperty = {
  id: "01a087a8-1eb3-77b4-bc4e-82237084862d",
  pageTypeSlug: "change-guard",
  slug: "slug-names-one-property",
  changeTargetType: "change-target-type/file-content",
  definition:
    "the guard refusing an answer whose written property takes a slug another kind of property holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The properties judged against are read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types are property types is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no property is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A property already holding its slug before the answer is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A slug a property of another page type holds refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "Whether either property is a relation is no part of this judgement.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the property already holding that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A path under no page name is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "A slug a property of the same page type holds is judged by another guard.",
    },
    {
      invariantKind: "gap",
      statement:
        "A page type an answer brings under `page-property` leaves its pages unjudged here.",
    },
  ],
} as const satisfies ChangeGuard
