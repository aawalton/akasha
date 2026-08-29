import type { Finding } from "../finding.page-type.ts"

export const landingConcurrencyNeedsAReadSet = {
  id: "01a04fc9-9152-7cc7-b6ab-d0ec7eef28db",
  pageTypeSlug: "finding",
  slug: "landing-concurrency-needs-a-read-set",
  domainSlug: "domain/command-system",
  claim:
    "Two akasha landings can only judge at the same time and both land where what each check read is recorded, absences included. Every cheaper rule either serializes the gate, as the lock does, or refuses one of two unrelated landings.",
  evidence:
    "Read in the repository rather than reasoned. `reachedSince` asks git for every path under `akasha/` changed between a base and now, so a compare-and-swap on HEAD refuses any landing whose sibling committed while it was judged — with the gate outside the hold, that is every concurrent pair. Refuse-and-retry spends the wall time of the lock and one wasted gate besides, so it is worse than what it would replace. Two earlier claims for a narrower rule were both disproved: an index entry file is keyed by what is referred to rather than by what changed, so two landings on disjoint paths importing one module contend on one entry file and lose an update; and git serializes commits by failing rather than by waiting, six concurrent path-limited commits leaving five dead on `index.lock`. What survives is recording what each check read. It is narrower than feared — `typecheck` walks the importer closure of the changed files rather than the whole tree, and 25 of the 27 checks reach the filesystem only through `Leaving` and `Reading` — but comparing paths does not close it. Two landings each introducing one identifier read no file of the other's, because neither file was there. What each depended on is an index entry it probed and found absent, so what a check read has to include what it looked for and did not find. `typecheck`, `page-named-as-stated` and `importersOf` reach past both surfaces today and would come into line first, and a check reading through anything unrecorded would answer that nothing it read had changed.",
} as const satisfies Finding
