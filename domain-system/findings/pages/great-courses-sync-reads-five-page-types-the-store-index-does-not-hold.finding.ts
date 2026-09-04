import type { Finding } from "../finding.page-type.ts"

export const greatCoursesSyncReadsFivePageTypesTheStoreIndexDoesNotHold = {
  id: "01a061f9-208d-7000-86b9-3e0de79901c7",
  pageTypeSlug: "finding",
  slug: "great-courses-sync-reads-five-page-types-the-store-index-does-not-hold",
  domainSlug: "domain/akasha-migration",
  claim:
    "`great-courses-sync` can do nothing it exists to do. All five page types it reads — `great-courses-collection`, `great-course`, `great-courses-subject`, `sync`, `sync-run` — are absent from the store's index, because they are markdown under `pages/` and the store answers for `akasha/` alone. Its writes have no road either.",
  evidence:
    "Measured 2026-09-02 by running `bun services/great-courses-sync.ts` and by asking the store.\n\nA composed query over each of the five types is refused 400, `names no page type the index holds`. `persona`, which lives under akasha/, answers normally. A read of the run record `pages/sync/the-great-courses.sync.runs.jsonl` is refused 400 for being outside `akasha/`, so `writeFiles` does not reach it either.\n\nBefore 4c1f05a264 (2026-09-01 16:26) the local-checkout branch of the page-query router answered these reads and landed these writes; its last run row is 2026-09-01T13:39:33.052Z. Severing it took all five types out of reach at once. d4507f35af, 47 minutes later, measured the write half only, so it recorded that the run could not be tracked and not that the sync could no longer read its own gate.\n\ncreate-course.ts refuses every course, and updateRootParentLastSyncedAt refuses likewise, so lastSyncedAt is frozen at 2026-08-24.\n\n953f061cb2 removed the unconditional throw, corrected a bare where-value at page-query.ts:34, and made the unread gate refuse rather than answer 'due'. The failure now names its cause on the first line; the sync still cannot work.\n\nThe call taken rather than asked: leave it failing loudly rather than disabled or exiting 0.",
} as const satisfies Finding
