import type { Finding } from "../finding.page-type.ts"

export const theAddonBuildCoDependencyWrapperNeverCoveredItsOneLiveDependent = {
  id: "01a06390-e35d-7d2e-be4f-6e321d97cfdf",
  pageTypeSlug: "finding",
  slug: "the-addon-build-co-dependency-wrapper-never-covered-its-one-live-dependent",
  domainSlug: "domain/temper",
  claim:
    "Dropping the `withAddonBuildCoDep` call changed the emitted check workflow by nothing. It could never have covered `app-build-temper-web`, its one live dependent: it refuses a dependent whose `closurePolicy` differs from the build's, and those two differ.",
  evidence:
    'Measured at `d0363358e2` in a worktree at HEAD with `addon-build-co-dep.ts` and `check-configs-app-build.ts` restored from `64a858d767^` and nothing else changed: `checkWorkflow` serialises to 58,247 bytes both ways, and the two strings compare equal. Comparing against a whole worktree at `26751230e6` instead reported a difference, but that was another lane\'s migration of generated paths out of `packages/temper`. Holding the tree constant and reverting only the two files is what isolates the change. The wrapper was dead before removal: its call went at `fa4022841d`, `addonBuildDependents` was called only by it, and one importer named the file, for `ADDON_BUILD_CHECK_NAME` alone. The older gap this turned up: `check-addon-build` carries `closurePolicy: "import-graph"` at `check-configs-addons-build.ts:12`, and `buildAppBuildChecks` sets none, so `app-build-temper-web` defaults to `pkg-depends` and the wrapper throws on that mismatch rather than unioning. `check-addon-build` has 50 dispatch nodes and `package:code:@temper/web` is not among them, though `ADDON_BUNDLE_BUILD_PACKAGES` names `@temper/web` and hands its build `BUNDLE_REUSE_DIST_ENV`. Not determined: whether the surviving `dependsOn` edge makes the runner run a step nothing dispatched. `tools/lib/workflow-dsl` declares the field and no more.',
} as const satisfies Finding
