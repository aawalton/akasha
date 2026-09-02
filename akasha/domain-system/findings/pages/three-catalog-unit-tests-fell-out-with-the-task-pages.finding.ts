import type { Finding } from "../finding.page-type.ts"

export const threeCatalogUnitTestsFellOutWithTheTaskPages = {
  id: "01a0607c-4750-7938-8ee4-d76f0bb39bdb",
  pageTypeSlug: "finding",
  slug: "three-catalog-unit-tests-fell-out-with-the-task-pages",
  domainSlug: "workspace-package/temper-catalog-core",
  claim:
    "Three unit tests over catalog-core's pure logic were deleted two days before this migration by a commit about something else, and nothing noticed because the package's compiled declarations kept naming them. They are restored here beside the modules they prove. A seat recreating a package should read the old `dist` for names its `src` no longer holds.",
  evidence:
    "`temper/catalog-core/dist/src` held `walk.unit.test.d.ts`, `apply-invalidations.unit.test.d.ts` and `clear-target.unit.test.d.ts` while `temper/catalog-core/src` held no test at all. `git log --diff-filter=D` names commit 09f964f5c5, `Ablate the task pages and every page's conditional reading of them`, whose message says nothing about tests. The three bodies were 7,166, 3,312 and 1,879 bytes. They are restored as `catalog-walk.module.test.ts`, `apply-invalidations.module.test.ts` and `clear-target.module.test.ts`, unchanged but for the three import specifiers, which now name sibling module code by path. The walk test drives a fake clock through healthy, throwing and silently stalling collectors and asserts that every domain ends either collected or explained.",
} as const satisfies Finding
