import type { Finding } from "../finding.page-type.ts"

export const aStoreWritingTestPassesAloneAndFailsInTheSuite = {
  id: "01a05b91-7ef1-7e2b-923d-34b13b1a6eba",
  pageTypeSlug: "finding",
  slug: "a-store-writing-test-passes-alone-and-fails-in-the-suite",
  domainSlug: "workspace-package/pages-query",
  claim:
    "`store-writing`'s test that a write is refused for want of a renderer passes when its file runs alone and fails when the whole suite runs, so state reaches it from another test file rather than from the code under test. It reads as a red suite while naming nothing broken, and it fails in the direction the work is going, which makes it the kind of red that gets waved past.",
  evidence:
    "`akasha test` reported 1 fail of 3200 on two consecutive runs, both `a write stating the keys a page would carry is refused for want of a renderer` at `akasha/pages-system/pages-query/store-writing/store-writing.module.test.ts:125`, `Expected: false, Received: true`. The assertion is that `writePage`, `patchPage` and `patchState` come back not-ok; they come back ok instead. `akasha test --file-path` on that same file and tree passes, 19 pass 0 fail, so it is green alone and red in company. A write landing rather than refusing is what this initiative's first intent asks for, so the assertion is stale against work in flight and the leakage is what makes it show only sometimes. Judged not to block the deploy of `alanwalton-web`: it stands in `pages-system/pages-query`, the files under `alanwalton/web` reaching `pages-query` do so for reads, and both the tracked-tree gate and `bun run build` for the web app were green. The call taken in Alan's absence was to deploy on a suite showing this one red.",
} as const satisfies Finding
