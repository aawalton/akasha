import type { Finding } from "../finding.page-type.ts"

export const theLibSetsPorterWritesIntoAFolderThatIsGone = {
  id: "01a06347-7a55-754e-9fec-9f093bb615aa",
  pageTypeSlug: "finding",
  slug: "the-lib-sets-porter-writes-into-a-folder-that-is-gone",
  domainSlug: "domain/temper",
  claim:
    "`temper/shared-addon-libraries-lib-sets-scripts/scripts/port-data.ts` writes its seven generated tables into `temper/shared-addon-libraries-lib-sets/src/data/generated/`, and that folder went at `05200f1619`. The porter names the path rather than importing it, so no import census sees the break and nothing refuses until someone runs it. Its output is already in the twin as modules of its own, so what is owed is repointing the porter rather than restoring the folder.",
  evidence:
    '`port-data.ts:10` holds `const PKG_REL = "temper/shared-addon-libraries-lib-sets"` and line 30 joins it into `OUT_DIR` as `<code-root>/<PKG_REL>/src/data/generated`. The old package held 7 files in that folder. The twin holds the same data divided finer, as `lib-sets-gen-blacklisted-set-ids`, `lib-sets-gen-set-data-preloaded`, `lib-sets-gen-set-info`, three `lib-sets-preloaded-set-item-ids-0N` and three zone-mapping modules, each a `.module.code.ts` with its own page. So the data followed the library and only the writer was left behind.\n\nThe removal was safe on every other count. Of 106,935 tracked files, seven outside the folder name its path. Five are findings, which record what was so rather than reach for it. One is `infra/cluster-checks/src/checks/check-lib-sets-per-piece-difficulty-boundary.ts`, which calls `refuseRetired()` under `import.meta.main`, so it refuses to run and certifies nothing. The last is this porter. No manifest among 318 named the package and no tsconfig among 82 referenced it. `LibSets` builds from the twin at exit 0 and 1,778,133 bytes, and `dist/.tstl/LibSets.tsconfig.json` names five include globs, every one under `akasha/temper`, with the old folder absent.\n\nThis is the writer half of what `lib-sets-port-scripts-are-tooling-rather-than-the-vendored-library` recorded as pending. That finding said the generated data was `not going away but moving`. It has now moved, so the porter\'s destination is stale rather than merely due, and the four porters it should join are already at `tools/lib/temper-upstream-data/`.',
} as const satisfies Finding
