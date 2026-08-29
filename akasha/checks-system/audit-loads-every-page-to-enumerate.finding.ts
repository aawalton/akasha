import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const auditLoadsEveryPageToEnumerate = {
  id: "01a04bc4-7e87-7dcf-bc5d-ff56d3d9a5f0",
  pageTypeSlug: "finding",
  slug: "audit-loads-every-page-to-enumerate",
  domainSlug: "domain/checks-system",
  claim: "Audit executes every page in the corpus merely to work out which files exist, before it has judged anything.",
  evidence:
    "`everyFileIn` reads the page list from the index cheaply, but then requires each page module to read its `code` and `test` properties, because the index does not record the files a page property holds. At the present size that is 77 requires and the whole audit runs in under a fifth of a second. At the stated target of a million files it is a million module executions to build a list, which is the same shape of mistake as walking the tree and costs more. The fix is not in the checks system: the index should file a page's property files as entries when it files the page, and audit should then read the file list straight out of the index with no page loaded at all. Recorded here rather than fixed because it changes data-system, which was not in scope for this pass.",
} as const satisfies Finding
