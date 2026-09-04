import type { Finding } from "../finding.page-type.ts"

export const greatCoursesNamesAPageTypeTheStoreDoesNotHold = {
  id: "01a06580-196a-7002-8a36-8ba9c3e2935e",
  pageTypeSlug: "finding",
  slug: "great-courses-names-a-page-type-the-store-does-not-hold",
  domainSlug: "workspace-package/great-courses",
  claim:
    "The Great Courses sync completes no step. Every read it makes names `great-courses-collection` or `great-course`, and the store holds neither page type, so the first read is refused 400 before the thirty-day gate is ever computed. That gate is unreadable rather than shut, which fails differently. Writing is severed too: nothing renders either page type's body out of the keys `createCourse` and `updateRootParentLastSyncedAt` build, so no course has become a page and `lastSyncedAt` has not moved.",
  evidence:
    "Measured 2026-09-02 by running the sync. `pageTitled` is refused 400 for `great-courses-collection`, whose three pages are markdown under `pages/` rather than rows the store indexes. The page holds `lastSyncedAt: 2026-08-24`, and the thirty-day cutoff first passes that date on 2026-09-24, so on the arithmetic alone the gate is shut today and would open daily from that morning. The arithmetic never runs, because the date never reaches the comparison.\n\nThe keyed writes have refused every call since 4c1f05a264, which severed the local-checkout branch of the page-query router on 2026-09-01 16:26; the last `sync-run` row landed 2026-09-01T13:39:33.052Z.\n\nThe read road is `askComposed` from `@akasha/pages-query/store-spelled-asking`, which reaches the page store over HTTP at the origin held in `akasha/pages-system/pages-query/store-reaching/store-reaching.module.code.ts`. This sync runs on-workstation under `tools/service-wrapper.ts`, where the migration's constraint says pages data is reached directly rather than through the service. The 400 and the constraint are the same road.\n\nThese measurements were carried as comment blocks in `tools/lib/great-courses/create-course.ts` and `root-parent-query.ts` until those bodies became modules under `akasha/great-courses/`, where `no-code-comments` admits four forms and refuses prose. They are filed here rather than lost.",
} as const satisfies Finding
