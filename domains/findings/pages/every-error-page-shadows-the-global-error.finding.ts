import type { Finding } from "../finding.page-type.ts"

export const everyErrorPageShadowsTheGlobalError = {
  id: "01a062f2-f807-7760-b5da-3a5227956aa7",
  pageTypeSlug: "finding",
  slug: "every-error-page-shadows-the-global-error",
  domainSlug: "domain/akasha",
  claim:
    "Every error page shadows the global Error, so akasha lint never comes back clean. A page type's exported type is named for its slug, that slug is error, and the linter refuses a binding by that name. Two rules meet here and one has to give. The pages are filed by a reporter rather than by hand, so the count grows without anyone deciding to add one. A check that always refuses teaches a reader to look past what it says.",
  evidence:
    'akasha lint reports 4 findings in 4 files, all lint/suspicious/noShadowRestrictedNames at line 1 column 15 of akasha/errors-core/errors/pages/alanwalton-*.error.ts. Each of those four is `import type { Error } from "../error.page-type.ts"`, so every error page filed so far trips it and no error page can avoid it. error.page-type.ts:14 declares `export type Error = Page & {...}` and :30 states the slug error, so the type name follows from the slug rather than from a choice made at that line. The pages carry firstSeenAt 2026-09-02T13:17:03.828Z and 7 commits touched that folder within one day, and error.page-type.ts:110 says an error page goes once the fault it reports is gone, so the folder turns over rather than settling. This is the whole of what akasha lint refuses: the same run reports nothing else, and akasha audit --check typecheck judged 30083 files and refused none. So one naming rule is the only thing between the linter and a clean answer.',
} as const satisfies Finding
