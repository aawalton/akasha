import type { Finding } from "../finding.page-type.ts"

export const aNarrowlyScopedQueryAnswersCleanAndIsReadAsAVerdict = {
  id: "01a05ff5-97ca-7915-a7c1-a4bb8aa99f6b",
  pageTypeSlug: "finding",
  slug: "a-narrowly-scoped-query-answers-clean-and-is-read-as-a-verdict",
  domainSlug: "domain/akasha-check",
  claim:
    "Four times in one session a query answered truthfully about the region it covered and its answer was read as a verdict on the whole. Three were checks and one was a hand grep. None of the four was wrong about what it looked at; each was read as saying something about what it did not. A checker that names its own scope in its answer is refuted by its evidence rather than believed on it, and none of these four named theirs.",
  evidence:
    "The grep: 133 tracking days were reported to carry no `surplus-hours`, so the tile was called sourceless. The key is declared at pages/page-property-definition/daily-tracking-surplus-hours.page-property-definition.md:8 as an expression over two other keys, so it is served on request and written in no file. The census read stored keys; the value was derived. Absence of the key proved nothing.\n\n`domain-edges` refuses 782 times. Its index comes from `markdownUnder` at tools/lib/check.ts:56, which keeps only `.md`. All 15 of its `domain-parent-unresolved` targets exist as TypeScript under akasha. Zero are real.\n\n`typecheck-repo` reports 2660 errors over 593 files. It gathers 21560 files into one `include` and throws away 208 configurations, among them 33 rival declarations of one interface. Compiled with its own options and one package's own `include`: 0 errors. With its flat `include`: 21. Of 2611 adjudicated, 12 are real. It also drops `noUncheckedIndexedAccess` and so misses 2 it should have caught, which is what makes it unrepairable rather than miscalibrated: the number is neither an upper bound nor a lower one.\n\n`tracking-funnel` answered `scanned=38 compared=37 findings=0 coverage=complete` both before and after a lane repaired a reader that had thrown on every call for weeks. It scans three folders of the seven that reach a day, and its verbs are writes, so no read hazard is in its view. It reported `complete` about a region it never opened.",
} as const satisfies Finding
