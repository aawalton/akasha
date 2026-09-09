import type { CodeCheck } from "../../code-check.page-type.ts"

export const identifierNamesOnePage = {
  id: "01a04f76-7430-7672-ac69-f8976ad2dc93",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "identifier-names-one-page",
  definition: "the check refusing a page with an identifier another page already has",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The identifiers judged are the properties declaring a `unique`.",
    },
    {
      invariantKind: "departure",
      statement: "The identifiers judged are read from the schema.",
    },
    {
      invariantKind: "departure",
      statement: "How far a value must be alone is the unique kind its property declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "The kind `page` is across every page and the kind `page-type` is among the pages of one type.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change has is read from the change.",
    },
    {
      invariantKind: "departure",
      statement: "The index is read as this change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement: "The rule is that the index files one page at a key.",
    },
    {
      invariantKind: "departure",
      statement: "A page of a page type the change itself adds is judged.",
    },
    {
      invariantKind: "departure",
      statement: "The schema is read as the change leaves the schema.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages in one change with one value are refused.",
    },
    {
      invariantKind: "absence",
      statement: "No page outside the change is opened to be judged.",
    },
    {
      invariantKind: "absence",
      statement:
        "Working the index out does open the page type and record property pages that index names.",
    },
  ],
} as const satisfies CodeCheck
