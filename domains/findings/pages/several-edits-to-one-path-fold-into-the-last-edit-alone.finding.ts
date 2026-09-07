import type { Finding } from "../finding.page-type.ts"

export const severalEditsToOnePathFoldIntoTheLastEditAlone = {
  id: "01a07cc9-602d-73fc-8448-d3bd88f068de",
  pageTypeSlug: "finding",
  slug: "several-edits-to-one-path-fold-into-the-last-edit-alone",
  domainSlug: "page-type/change",
  claim:
    "Several `change-file` edits to one path do not compose when the apply folds them into the patch: the last edit's delta reaches HEAD and the earlier ones go silently. The kept records are right, so the fault is the fold rather than the staging. It refuses as ordinary check failures at the original line numbers, so the reader chases the lint and the types instead of the fold.",
  evidence:
    "Four edits to `pages/indexes/reading/index-reading.module.code.ts`: an import added at line 4, a function deleted at 89, a comment deleted at 172, six call sites renamed at 184. Read out of the edits ref, the four records are cumulative — each record's `was` is exactly the record before it's `body` — and the last body carries all four changes at 12986 bytes. The apply refused twice naming the deleted function unused at 89, prose at 172 and 173, and `stringAt` undefined at 184 through 192. That body is HEAD plus the last delta alone, and matches no record in the ref. Collapsing the four into one `change-file` over the whole region landed first try with identical content and nothing else changed, as 2678cd50e05. Beside it: `akasha change drop` does not always drop only what it is named. One `at:` path removed all five kept edits across three files; later two `at:` paths removed all seven kept edits, while one `at:` path twice removed exactly the one named.",
} as const satisfies Finding
