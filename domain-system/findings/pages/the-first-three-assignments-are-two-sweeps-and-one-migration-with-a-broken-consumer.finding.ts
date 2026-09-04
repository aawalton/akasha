import type { Finding } from "../finding.page-type.ts"

export const theFirstThreeAssignmentsAreTwoSweepsAndOneMigrationWithABrokenConsumer = {
  id: "01a06551-7018-71f4-b1dc-02f38fa09844",
  pageTypeSlug: "finding",
  slug: "the-first-three-assignments-are-two-sweeps-and-one-migration-with-a-broken-consumer",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two of the first three assignments should be sweeps rather than migrations, because 17,041 files are already reachable inside akasha and no page type has to be designed to remove them. The third should be the great-courses family, because a service in akasha is failing right now for want of it and the page type it needs already exists.",
  evidence:
    "Reasoned on 2026-09-02 from the folder survey.\n\nFirst, `pages/temper-*`. 91 folders, 6,236 tracked files, every slug present in akasha and one pair checked field by field. It retires 91 of the 261 folders in one sweep, which is a third of them, and it needs no design at all. It is also the safest place to prove the per-file content check, because if the check cannot clear these it cannot clear anything.\n\nSecond, the nineteen Wandering Inn mechanic folders. 10,805 stubs, all carried as rows of one world page's readings. This is the largest verified block in the repository. It must be scoped to the markdown alone: the 10,469 sidecars beside them hold 126,962 reference rows that akasha has nowhere to put, and a sweep that took the folder rather than the file would destroy them.\n\nThird, great-course with great-courses-subject and great-courses-collection, 1,140 files. Unlike the first two this is real migration, but it is the cheapest real one. The shape is already collection-external, field for field. And `great-courses-sync-reads-five-page-types-the-store-index-does-not-hold` records that the sync has been unable to read or write since 2026-09-01 precisely because these types are still markdown; lastSyncedAt has been frozen since 2026-08-24. It is the only family whose absence is breaking something today.\n\nWhat should not go first: `pages/domain`, 687 pages against 51, because a seat is already working it; and the story prose at 19,082 files, which is blocked on the beside-file grammar.",
} as const satisfies Finding
