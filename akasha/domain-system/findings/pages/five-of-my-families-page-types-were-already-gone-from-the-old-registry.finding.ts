import type { Finding } from "../finding.page-type.ts"

export const fiveOfMyFamiliesPageTypesWereAlreadyGoneFromTheOldRegistry = {
  id: "01a06861-f664-7b21-9c4d-2f7e5a10c005",
  pageTypeSlug: "finding",
  slug: "five-of-my-families-page-types-were-already-gone-from-the-old-registry",
  domainSlug: "domain/akasha-migration",
  claim:
    "pages/page-type is down to six files, and the page types for cluster-service, cluster, package, repo and sync had already been deleted from it before this lane opened. Markdown whose page type has left that folder is stranded rather than merely un-migrated: the old registry is built from pages/page-type alone, so the data is neither readable nor writable through it. A page type's absence is therefore not evidence its data carried -- it is a reason the data cannot be reached.",
  evidence:
    "git ls-tree -r HEAD --name-only pages/page-type answers six files. Of the seven families in this lane's block only seat-conditions still had a page type there when the block was enumerated, and subagent-kind's went during the run: it was present in the first enumeration and gone from a later one, deleted by another lane while this one worked.\n\nThat is what made migrating the data urgent rather than optional, and it is the direction the harm runs in: sync's 3,452 run records sat behind a page type that no longer stood. akasha/great-courses/sync-run/sync-run.module.code.ts had already stopped opening rows over it, carrying the stopgap 'No sync-run row is opened or settled' and naming pages/sync/<source>.sync.runs.jsonl as standing outside the store.\n\nThe transferable part: check pages/page-type for your family before reading anything into an absence, and re-read it during the run rather than once at the start. Ablating a page type before its data lands manufactures exactly this, and the initiative already warns of it -- what this adds is that it had happened to five families at once.",
} as const satisfies Finding
