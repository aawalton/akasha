import type { Check } from "../check.page-type.ts"

export const identifierNamesOnePage = {
  id: "01a04f76-7430-7672-ac69-f8976ad2dc93",
  pageTypeSlug: "check",
  slug: "identifier-names-one-page",
  definition: "the check refusing a page carrying an identifier another page already carries",
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
        "The identifiers judged are the properties declaring a `unique`. They are read from the schema.",
    },
    {
      invariantKind: "departure",
      statement:
        "How far a value must stand alone is the reach its property declares: `always` across every page and `page-type` among the pages of one type.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change carries is read from the change.",
    },
    {
      invariantKind: "departure",
      statement: "The index is read as this change leaves it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rule is that the index files one page at a key: two paths standing at one key is the whole of what is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page of a page type the change itself adds is judged.",
    },
    {
      invariantKind: "departure",
      statement: "The schema is read as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages in one change carrying one value are refused against each other.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page outside the change is opened to be judged — the index answers for it. Working the index out does open the page type and record property pages it names.",
    },
  ],
} as const satisfies Check
