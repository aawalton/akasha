import type { Check } from "../check.page-type.ts"

export const propertyIsDeclaredByAType = {
  id: "01a04ef8-1a07-722c-a247-40e6a9069ce4",
  pageTypeSlug: "check",
  slug: "property-is-declared-by-a-type",
  definition: "the check refusing a page property that no page type declares",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page property stands in two trees, and this holds the properties tree to the parts tree one page at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every page whose page type stands under `page-property` is judged, not only one whose own page type is `page-property`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record property declares its fields the same way a page type declares its properties, so both are read as declarations.",
    },
    {
      invariantKind: "departure",
      statement:
        "What declares a page is read from the change and the index together, so a property and the type declaring it land as one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A type that stops declaring a property leaves that property judged, though the property itself did not change.",
    },
    {
      invariantKind: "departure",
      statement: "An index answering other than one page to the slug is thrown on, never passed.",
    },
    {
      invariantKind: "departure",
      statement: "A page property the change takes away is passed over.",
    },
    {
      invariantKind: "absence",
      statement:
        "That a declared property has a page is no business of this check, and `relation-resolves` refuses one that does not.",
    },
    {
      invariantKind: "absence",
      statement:
        "How many page types declare a property is not judged, only that one of them does.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A property is declared by slug alone, so two properties of a name could not both be reached.",
    },
  ],
} as const satisfies Check
