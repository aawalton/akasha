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
        "A page type the change itself puts under `page-property` counts, because which page types stand under it is read from the index as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record property declares its fields the same way a page type declares its properties, so both are read as declarations.",
    },
    {
      invariantKind: "departure",
      statement:
        "What declares a page is one directory listed on the index as the change leaves it, so a type landing in the change and one the change withdraws are answered by the same lookup.",
    },
    {
      invariantKind: "departure",
      statement:
        "A type that stops declaring a property leaves that property judged, though the property itself did not change.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type the change takes away leaves the properties it declared judged, because those are looked for in the body the change withdrew and not among the pages the change carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page stands at a path is asked of the path index, not of the slug its file name says, so a file named otherwise than the slug it states is still judged, and so is a slug two pages carry.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the index files nothing for is passed over, not thrown on, because a check that throws leaves every other page in the change unjudged.",
    },
    {
      invariantKind: "absence",
      statement:
        "Why nothing is filed for a path is not said here. A page stating no `id` and a body that will not load are refused in words beside this, in every phase.",
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
