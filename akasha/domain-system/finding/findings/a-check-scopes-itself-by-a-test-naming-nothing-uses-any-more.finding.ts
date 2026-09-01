import type { Finding } from "../finding.page-type.ts"

export const aCheckScopesItselfByATestNamingNothingUsesAnyMore = {
  id: "01a05cca-38bc-7135-b4ad-b02ec71d4d7f",
  pageTypeSlug: "finding",
  slug: "a-check-scopes-itself-by-a-test-naming-nothing-uses-any-more",
  domainSlug: "domain/akasha-check",
  claim:
    "`check-cli-json-contract-coupling` selects what it judges by ten filename suffixes, and not one of the 278 test files in the tree carries any of them. Its population is empty, so it examines nothing. Which tests CI leaves out, and how they are named now, is a question about what the check should refuse rather than about a path that moved, so I have not changed it.",
  evidence:
    "`EXCLUDED_TEST_SUFFIXES` in `infra/cluster-checks/src/lib/cli-json-contract-coupling.ts:4-15` holds `.cli.test.ts`, `.smoke.test.ts`, `.database.test.ts`, `.integration.test.ts`, `.browser.test.ts` and their `.tsx` twins. `check-cli-json-contract-coupling.ts:72-74` globs `**/*.test.ts` and `**/*.test.tsx` and keeps only what `isExcludedTestFile` accepts. Globbing the tree finds 278 test files and 0 matching any of the ten suffixes; every one is named `*.module.test.ts` instead. The check answers `NO VERDICT — 0 violation(s) among the members this run examined, and it did not get through its population, so it certifies nothing. [EMPTY POPULATION — 0 test files]` and exits 2, so it says plainly that it certifies nothing rather than passing while certifying nothing — the population machinery behaves correctly here and this is not a silent gate. What is unknown is whether a CI-excluded test class still exists under the new naming, or whether the class went away when the suffixes did, in which case the check has no subject left and should be deleted rather than repointed. Answering that decides what it refuses, so it is not repair. Reviving it costs one decision: name the suffixes CI excludes today, or retire the check.",
} as const satisfies Finding
