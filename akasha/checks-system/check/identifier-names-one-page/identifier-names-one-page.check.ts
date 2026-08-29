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
        "The identifiers judged are the properties declaring a `unique`, read from the schema, so a property becoming an identifier changes nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "How far a value must stand alone is the reach its property declares: `always` across every page, `page-type` among the pages of one type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the change carries is read from the change, so a page and the rename freeing its old value land together.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry the index holds for a path the change carries is passed over, because what stands there is about to be replaced.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two pages in one change carrying one value are refused against each other, not only against what already stands.",
    },
    {
      invariantKind: "absence",
      statement:
        "No file is read. A page is judged from the body the change carries and the entries the index holds.",
    },
  ],
} as const satisfies Check
