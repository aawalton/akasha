import type { Finding } from "../finding.page-type.ts"

export const theWatcherLooksItsEnrolmentUpByAKeyNoPageTypeDeclares = {
  id: "01a063c4-be37-72b1-bd7d-20d3ba3e8b2b",
  pageTypeSlug: "finding",
  slug: "the-watcher-looks-its-enrolment-up-by-a-key-no-page-type-declares",
  domainSlug: "workspace-package/temper-watcher",
  claim:
    "The legacy watcher looks its enrolment page up by `accountUserId`, and no page type in the enrolment's chain declares that key. The chain declares `accountPage`. The lookup matches nothing on every run, so the watcher logs that the account has no enrolment page and no run outcome is ever recorded. The akasha twin finds the enrolment by the account the enrolment names, so at cutover run outcomes begin to be recorded rather than to regress.",
  evidence:
    '`temper/scripts/src/watcher-exe/report-run-outcome.ts:38-42` calls `getPage` with `pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG` and `where: [{ key: "accountUserId", eq: userId }]`. Line 43 answers a null enrolment by logging `Run outcome not reported — this account has no temper-watcher-enrolment page` and returning.\n\nLoading every `*.page-type.ts` in the index and following `extendsSlug` from `temper-watcher-enrolment` gives a chain of four links: `temper-watcher-enrolment` -> `temper-progress-thing` -> `temper-thing` -> `page`. Those four declare 31 properties between them. Converting each declared slug to the camelCase the query uses, `accountUserId` is in none of them and `accountPage` is in two, declared at `temper-watcher-enrolment.page-type.ts:29` and again on `temper-thing`. The check fired a control: a key known to be declared is found and a made-up key is not.\n\nThe akasha twin `watcher-run-reporting` carries the invariant `The enrolment is found by the account the enrolment names.`',
} as const satisfies Finding
