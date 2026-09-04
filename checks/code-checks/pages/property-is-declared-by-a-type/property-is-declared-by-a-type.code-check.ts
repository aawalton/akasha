import type { CodeCheck } from "../../code-check.page-type.ts"

export const propertyIsDeclaredByAType = {
  id: "01a04ef8-1a07-722c-a247-40e6a9069ce4",
  pageTypeSlug: "code-check",
  slug: "property-is-declared-by-a-type",
  definition: "the check refusing a page property that no page type declares",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page property stands in two trees.",
    },
    {
      invariantKind: "departure",
      statement: "This holds the properties tree to the parts tree one page at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Every page whose page type sits under `page-property` is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change itself puts under `page-property` counts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record property declares its fields the same way a page type declares its properties.",
    },
    {
      invariantKind: "departure",
      statement: "A one of declares its members the same way a page type declares its properties.",
    },
    {
      invariantKind: "departure",
      statement:
        "What declares a page is one directory listed on the index as the change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement: "A type that stops declaring a property leaves that property judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type the change takes away leaves the properties that page type declared judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those properties are looked for in the withdrawn body rather than among the change's own pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page stands at a path is asked of the path index rather than of the slug its file name says.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index files nothing for is passed over rather than thrown on.",
    },
    {
      invariantKind: "absence",
      statement: "Why nothing is filed for a path is not said here.",
    },
    {
      invariantKind: "absence",
      statement: "A page stating no `id` is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "absence",
      statement: "A body that will not load is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "departure",
      statement: "A page property the change takes away is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "That a declared property has a page is no business of this check.",
    },
    {
      invariantKind: "absence",
      statement: "`relation-resolves` refuses one that does not.",
    },
    {
      invariantKind: "absence",
      statement: "How many page types declare a property is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A property is declared by slug alone.",
    },
  ],
} as const satisfies CodeCheck
