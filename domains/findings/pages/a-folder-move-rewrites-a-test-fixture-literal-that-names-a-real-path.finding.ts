import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aFolderMoveRewritesATestFixtureLiteralThatNamesARealPath = {
  id: "01a092e1-8c1c-758d-a953-aa238b449db3",
  type: "finding",
  slug: "a-folder-move-rewrites-a-test-fixture-literal-that-names-a-real-path",
  domain: "domain/change",
  claim:
    "A mechanical folder move rewrites a test fixture's example literal wherever that literal names a real package or path, and leaves the invented literals beside it alone, so the test reads a rewritten example against an untouched one and fails.",
  evidence:
    "`changes/modules/package-naming/package-naming.module.test.ts` set a package rename up with `BODY` naming `@akasha/code/code-source` and `RESPELLED` naming `@akasha/kode/code-source`. Moving `code/code-source` to `code/modules/source` rewrote the first, because `@akasha/code` is a package the index answers for, and left the second, because `@akasha/kode` is invented. The test then read `@akasha/kode/source` where it wanted `@akasha/kode/code-source`, and the failure refused a landing of 204 changes that had nothing to do with it.\n\nThe same fixtures already carried `akasha/code-system/code-system.workspace-package.ts`, a path no file has had since the `code-system` folder moved, left by the same mechanism on an earlier move. So this has happened twice in the one file.\n\nMended at `f3442fea3f3` by making every package and path that test names invented, and by putting `No package or path this module's test names is one this repository has.` on `changes/modules/package-naming/package-naming.module.ts`. That mend reaches one file. Nothing refuses the next fixture written with a real name, and a check could, because the index answers for exactly the literals at fault.\n",
} as const satisfies Finding
