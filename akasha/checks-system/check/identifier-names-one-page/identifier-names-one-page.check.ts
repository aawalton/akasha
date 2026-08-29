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
        "The index is read as this change leaves it, so an entry standing at a key is what the change files there, and an entry the change withdraws is none.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rule is that the index files one page at a key, so two paths standing at one key is the whole of what is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page of a page type the change itself adds is judged, because which page types stand is read as the change leaves it too.",
    },
    {
      invariantKind: "departure",
      statement:
        "The schema is read as the change leaves it, so a property the change stops declaring `unique` stops being enforced and one it starts declaring is enforced at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two pages in one change carrying one value are refused against each other, not only against what already stands.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page outside the change is opened to be judged — the index answers for it. Working the index out does open the page type and record property pages it names.",
    },
  ],
} as const satisfies Check
