import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const propertyIsDeclaredByAType = {
  id: "01a04ef8-1a07-722c-a247-40e6a9069ce4",
  type: "page-type/check-code",
  slug: "property-is-declared-by-a-type",
  definition: "the check refusing a page property that no page type declares",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page property stands in two trees.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This check holds the properties tree to the parts tree one page at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page whose page type sits under `page-property` is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change itself puts under `page-property` counts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record property declares its fields the same way a page type declares its properties.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A `one-of-property` page declares its members the same way a page type declares its properties.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The declarer of a page is one directory listed on the index as the change leaves the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type that stops declaring a property leaves that property judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type the change takes away leaves the properties that page type declared judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Those properties are looked for in the withdrawn body rather than among the change's own pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page sits at a path is read from the body at that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id the index files no page for is passed over rather than thrown on.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Why nothing is filed for an id is not said here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page stating no `id` is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A body that will not load is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page property the change takes away is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "That a declared property has a page is no business of this check.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`relation-resolves` refuses a declared property that has no page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "How many page types declare a property is not judged.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A property is declared by an address naming the page type that property is.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
