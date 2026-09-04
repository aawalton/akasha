import type { Finding } from "../finding.page-type.ts"

export const aMockIsJudgedOnlyAgainstItsOwnPackage = {
  id: "01a05b9d-46fd-7000-9af5-74829e1604ae",
  pageTypeSlug: "finding",
  slug: "a-mock-is-judged-only-against-its-own-package",
  domainSlug: "domain/test",
  claim:
    "The mock-module-leak check weighs a `mock.module` site only against consumers standing in the mocker's own package, so a test stubbing a package specifier that resolves into another package is judged against nothing and reads clean. That is how a stub of `writePage` came to stand in front of `pages-query`'s own test, green alone and red in the suite.",
  evidence:
    "`pages-query`'s manifest maps `.` to `store-writing.module.code.ts`, so `mock.module(\"@akasha/pages-query\", ...)` at `sms-discard.module.test.ts:16` replaced `writePage` in the very module `store-writing.module.test.ts` imports by relative path. Bun rewires only the keys the factory names, so `patchPage` and `patchState` stayed real and exactly one assertion failed, `Expected: false, Received: true` at `store-writing.module.test.ts:125`. Reproduced outside the tree: a scratch test holding that module through a static import, then mocking its absolute path with a factory naming `writePage` alone, prints that failure verbatim at 1 fail and 1 expect call. `4d8383baff` had already closed it by spreading the real module into both factories and putting it back in `afterAll`, in sms-discard and in sms-allowlist. Two full runs since read 3209 pass, 0 fail, 226 files; the file alone reads 19 pass, 0 fail; the web build exits 0 and the three sites answer 200, 200 and 302. `findMockModuleLeakViolations` filters consumers by `c.package === site.mockerPackage`, so this site had no consumer to weigh and reported clean while it leaked. Widening that filter was not done tonight: the check stands outside the akasha folder, it would judge every mock site in the repository at once, and the call taken in Alan's absence was to file this rather than turn a green check red unattended.",
} as const satisfies Finding
