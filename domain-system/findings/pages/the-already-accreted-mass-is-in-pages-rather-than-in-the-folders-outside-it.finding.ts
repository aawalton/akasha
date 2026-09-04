import type { Finding } from "../finding.page-type.ts"

export const theAlreadyAccretedMassIsInPagesRatherThanInTheFoldersOutsideIt = {
  id: "01a06551-7018-7d51-8288-1d71ea32de37",
  pageTypeSlug: "finding",
  slug: "the-already-accreted-mass-is-in-pages-rather-than-in-the-folders-outside-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "17,041 tracked files are already reachable inside akasha and still sit outside it, which matches the ten to twenty thousand estimated. All of them are under `pages/`. The folders beside `pages/` hold 4,672 tracked files in total, so they cannot hold a mass of that size no matter what is found in them.",
  evidence:
    "Counted against git rather than the disk on 2026-09-02, because the disk holds a great deal that was never committed.\n\n`git ls-files` reports 101,869 tracked files: 33,071 under `akasha/`, 64,126 under `pages/`, and 4,672 everywhere else. The everywhere-else number is the one that matters here. Even if every file outside `akasha/` and `pages/` turned out to be a duplicate, the sweep would come to 4,672.\n\nThe 17,041 already reachable break into two blocks, both under `pages/`.\n\n6,236 tracked files in the 93 folders whose every slug is present in akasha. 91 of the 93 are `temper-*`; the other two are page-query and web-app. 5,520 of the 6,236 are the markdown pages themselves.\n\n10,805 markdown stubs across the nineteen Wandering Inn mechanic folders, every one of them carried as a row of `the-wandering-inn.world.mechanic-readings.jsonl`. Their 10,469 sidecars are not carried and are not counted here.\n\nSo the cheapest first mass is not outside `pages/` at all. It is `pages/temper-*` and the mechanic stubs, and both are already proved by slug rather than by folder.\n\nTwo cautions. The 6,236 includes sidecars beside the temper markdown that I did not compare field by field; only the markdown was checked. And a per-file content match is still owed on every one of the 17,041 before anything is removed, because what I proved is that the slug and the stated fields are reachable, not that nothing was dropped on the way in.",
} as const satisfies Finding
