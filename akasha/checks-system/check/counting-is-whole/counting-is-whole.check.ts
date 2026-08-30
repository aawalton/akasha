import type { Check } from "../check.page-type.ts"

export const countingIsWhole = {
  id: "01a05226-b541-73b2-b65a-dcf53a28fad9",
  pageTypeSlug: "check",
  slug: "counting-is-whole",
  definition:
    "the check holding a page type that counts to saying both what it counts and the count",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type declaring `seq` and stating no `next-seq` is refused, because a page would be given a number nothing holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type stating `next-seq` and declaring no `seq` is refused, because a count nothing takes from is a number that never moves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type inheriting `seq` counts its own pages, a number being unique across the type a page states rather than the type that declared the property.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a page type declares is read as the change leaves it, so a type and the parent it starts extending land together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only the page types the change carries are judged, a type standing untouched having been judged when it landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change carrying no page type is passed over before the index as the change leaves it is worked out.",
    },
    {
      invariantKind: "absence",
      statement:
        "What the count stands at is not judged here. That it never falls is judged by `counting-never-falls`.",
    },
  ],
} as const satisfies Check
