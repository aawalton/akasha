import type { Finding } from "../finding.page-type.ts"

export const entriesMarksTheDeclarationsKeptBesideThePageRatherThanEveryList = {
  id: "01a05f81-c595-7001-9953-21eae3b70cd9",
  pageTypeSlug: "finding",
  slug: "entries-marks-the-declarations-kept-beside-the-page-rather-than-every-list",
  domainSlug: "workspace-package/pages",
  claim:
    "The intent saying a declaration carrying many values says `entries` reads two ways, and the narrower reading was taken: `entries` marks the declarations whose values are kept beside the page rather than every declaration carrying more than one value.",
  evidence:
    "Read widely, every declaration saying `many` becomes a file beside its page, which moves the invariants, directives, part slugs and constraints out of every page file carrying them and gives most pages in akasha a sidecar. Read narrowly, `entries` is a third kind of declaration beside the one carrying a single value and the one carrying a list, and marks only the properties whose values are kept beside the page. The narrow reading landed in 0646bef0b2: `Declaration` gained an arm saying `entries`, and `page-type` declares the property as optional. The wide reading was left because a page file today carries its invariants inline, because no invariant says a section moves out of the page file, and because the churn reaches almost every page. One property in akasha keeps its values beside its page today, `cases` on `model-test`, held as a file property naming jsonl over fourteen rows.",
} as const satisfies Finding
