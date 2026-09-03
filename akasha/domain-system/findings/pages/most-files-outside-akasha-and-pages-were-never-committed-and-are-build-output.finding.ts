import type { Finding } from "../finding.page-type.ts"

export const mostFilesOutsideAkashaAndPagesWereNeverCommittedAndAreBuildOutput = {
  id: "01a06551-7018-7adf-9459-62ba633f8538",
  pageTypeSlug: "finding",
  slug: "most-files-outside-akasha-and-pages-were-never-committed-and-are-build-output",
  domainSlug: "domain/akasha-migration",
  claim:
    "The folders beside `akasha/` and `pages/` hold 15,899 files on disk but only 4,672 in the commit. The other 11,227 are build output and installed packages. Counting the migration's remaining work from the disk overstates the folders outside `pages/` by more than threefold, and `temper/` alone accounts for over half the gap.",
  evidence:
    "Measured on 2026-09-02 by comparing `find -type f` against `git ls-files`, folder by folder.\n\ntemper 516 tracked against 6,428 on disk. Of the 5,912 untracked, 3,532 sit under `web/build` and 2,296 under a `dist`. alanwalton 282 against 2,853. infra 716 against 2,404. editor-extension 61 against 401. lua-compiler 288 against 446. archive-of-worlds 38 against 155. smilingjenny 33 against 131. collections 56 against 113. audhdalan 24 against 91.\n\nSome folders are the reverse and are almost entirely real: tools 1,630 of 1,636, dirty 563 of 563, readouts 138 of 139, monarch 50 of 50, page 56 of 57.\n\nThe practical consequence is that the outside-akasha problem is much smaller than it looks, and is concentrated. tools at 1,630 and infra at 716 and dirty at 563 are over half of the 4,672 between them.\n\nThe build output is not a migration question and needs no per-file content match, because none of it was ever committed. Removing it changes nothing in the commit. It does change what an agent counting the repository sees, which is why it is worth clearing before anyone measures the remaining work again.\n\nI did not verify that every untracked file is regenerable. `dist` and `build` and installed packages are, and they account for the great majority, but an untracked file elsewhere may be someone's work in progress rather than output.",
} as const satisfies Finding
