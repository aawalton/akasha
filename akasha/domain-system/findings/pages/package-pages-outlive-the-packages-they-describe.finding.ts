import type { Finding } from "../finding.page-type.ts"

export const packagePagesOutliveThePackagesTheyDescribe = {
  id: "01a0605d-eb99-7228-bea3-5280653ca394",
  pageTypeSlug: "finding",
  slug: "package-pages-outlive-the-packages-they-describe",
  domainSlug: "workspace-package/temper-capture-shapes",
  claim:
    "Twelve pages under `pages/package/` describe the `@temper/game-*-capture-core` packages, which no longer exist. The same tree holds no page for any temper package already recreated in akasha, and no page there has ever been deleted. So `pages/package/` records a frozen subset of the workspace rather than tracking it, and every temper package torn down leaves a page behind describing something gone.",
  evidence:
    "`pages/package/` holds 232 pages, among them `temper-game-crafting-capture-core.package.md` and eleven siblings named for the other capture-core packages. Each carries a uuid, a `domain-parent-slug`, and a definition of what its package holds: the crafting one reads 'the shape of the recipe, scribing and trait-research lists read out of ESO'. All twelve packages were deleted in commit 1f2d800be5, so all twelve pages now name nothing on disk. The tree holds no page for temper-dungeons, temper-explain, temper-watcher, temper-commands, temper-inventory-automation, temper-upstream-data or temper-addon-build, the seven temper packages recreated in akasha before this teardown. `git log --diff-filter=D -- 'pages/package/temper-*.md'` returns nothing, so those seven pages were never written rather than written and removed. The twelve capture-core pages remain, since the teardown scope named only the 43 tracked files under `temper/game-*-capture-core/` and the manifests and tsconfigs pointing at them, and the `pages/` tree carries stable identities that its own tooling may key on.",
} as const satisfies Finding
