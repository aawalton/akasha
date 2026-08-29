import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const auditDerivesPropertyFilesByName = {
  id: "01a04bc4-7e87-7fcd-ae2b-4eff54d0b660",
  pageTypeSlug: "finding",
  slug: "audit-derives-property-files-by-name",
  domainSlug: "domain/checks-system",
  claim: "Audit finds property files from a hardcoded list of two property names rather than from what a property is.",
  evidence:
    "The index holds pages and deliberately not the files that hold one page property, so audit derives them: for each indexed page it appends the files the page's own `code` and `test` properties imply. Checked against the tree this misses nothing today, because `code` and `test` are the only properties held in their own files. But `page-property-type` already carries `kind: \"file\"`, so the honest form reads which of a page's properties are file-kind and derives from that, and the list of two would then be unnecessary. It is hardcoded in `checking.module.code.ts` as `HELD_IN_A_FILE`. The day a third file-kind property is added, audit silently stops judging those files, and nothing reports it.",
} as const satisfies Finding
