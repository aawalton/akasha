import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const identifierNamesOnePage = {
  id: "01a04f76-7430-7672-ac69-f8976ad2dc93",
  type: "check-code",
  slug: "identifier-names-one-page",
  definition: "the check refusing a page with an identifier another page already has",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The identifiers judged are the properties declaring a `unique`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The identifiers judged are read from the schema.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How far a value must be alone is the unique kind its property declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The kind `page` is across every page and the kind `page-type` is among the pages of one type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the change has is read from the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index is read as this change leaves the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rule is that the index files one page at a key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page of a page type the change itself adds is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The schema is read as the change leaves the schema.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two pages in one change with one value are refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page outside the change is opened to be judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Working the index out does open the page type and record property pages that index names.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
