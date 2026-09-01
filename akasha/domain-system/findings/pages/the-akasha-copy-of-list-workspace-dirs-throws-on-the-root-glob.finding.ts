import type { Finding } from "../finding.page-type.ts"

export const theAkashaCopyOfListWorkspaceDirsThrowsOnTheRootGlob = {
  id: "01a05df1-4521-7000-b0bc-fb9640ee9d3a",
  pageTypeSlug: "finding",
  slug: "the-akasha-copy-of-list-workspace-dirs-throws-on-the-root-glob",
  domainSlug: "workspace-package/workspace-paths",
  claim:
    "The `listWorkspaceDirs` that `akasha/workspace-paths` carries throws on `akasha/**`, the first entry of this repository's own workspaces array, so no caller can list the workspaces of the tree the package sits in. Every one of its nine callers is outside the akasha folder.",
  evidence:
    'Calling `listWorkspaceDirs(repoRoot)` against this repository throws `unsupported workspaces glob "akasha/**" — only trailing "/*" segments are expanded today`. The root manifest names `akasha/**` first among 291 workspaces entries.\n\nThe code matches its page rather than departing from it. `workspace-dirs.module.ts` records two departures: `Only a glob of trailing star segments is expanded.` and `A glob of any other shape is thrown on.` `parseTrailingStarGlob` peels `/*` suffixes and throws where the remaining prefix still holds a star, which `akasha/` followed by a doubled star does. The page predates the root manifest naming a deep glob.\n\nNothing under the akasha folder reaches this package. Its nine callers are `infra/scripts/src/generate-dockerfiles.ts`, `generate-dockerfiles-deps.ts` and `verify-workspace-bins.ts`, four modules under `infra/workspace-cli/src/lib/package-add` and `package-move`, and two under `temper/shared-build-deploy-addons-resolve/src`. Docker generation and the package-move tooling therefore crash against this tree.\n\nA second copy of the same function lived at `tools/lib/check-workflow/workspace-paths.ts` and took a `/**` branch in `748eb813`, which walks every nested directory holding a manifest and yields 291 workspaces. That fix was never carried into the akasha copy, which has no test file.\n\nThe module carries no test property, so nothing proves either behaviour.',
} as const satisfies Finding
