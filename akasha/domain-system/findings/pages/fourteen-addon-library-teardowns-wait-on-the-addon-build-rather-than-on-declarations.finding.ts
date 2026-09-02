import type { Finding } from "../finding.page-type.ts"

export const fourteenAddonLibraryTeardownsWaitOnTheAddonBuildRatherThanOnDeclarations = {
  id: "01a060ca-ae4c-7db8-bdc4-df0925065f30",
  pageTypeSlug: "finding",
  slug: "fourteen-addon-library-teardowns-wait-on-the-addon-build-rather-than-on-declarations",
  domainSlug: "domain/temper",
  claim:
    "The fourteen `shared-addon-libraries-lib-*` folders have been scheduled as teardowns waiting on the declarations trim alone. A second gate holds them and is the harder one: the addon build cannot see an addon that landed in akasha, so the temper folder is the only buildable copy, and twelve of the fourteen are named by a surviving addon manifest. Deleting on the first gate alone takes twelve libraries out of the shipped addon set.",
  evidence:
    "The census is clean. No file anywhere imports any of the fourteen, by package specifier or by relative path, no manifest names any of them as a dependency, and none of the fourteen declares a dependency of its own. Every remaining reference is a registration site rather than a consumer: a root `workspaces` entry, a `bun.lock` pair, a `territory-map.json` row, a `pages/package/*.md` page, and six references in `temper/addons/tsconfig.json`. Removing any of those early is the deletion rather than a step before it, so there is no safe early repoint here.\n\nWhat the addon manifests hold is a different kind of edge. Twelve of the fourteen are named at a `dependsOn` key by an addon that is not going: `LibDebugLogger` at twelve manifests with five of them hard, `LibCustomMenu` at seven with three hard, `LibNotification`, `LibAsync` and `LibMapPins-1.0` hard at three or two each. `LibMediaProvider` and `libAddonKeybinds` are the only two near-free.\n\nThe build resolves an addon by a literal `addon.json` at a workspace folder root, which akasha cannot hold, so the fourteen akasha eso-addon pages are invisible to it. That is already filed as `the-addon-build-cannot-see-an-addon-that-landed-in-akasha`, and an akasha eso-addon states no lua bundle either. What is new here is that those two hold fourteen teardowns rather than being a gap alongside them.\n\nThe ready-to-run teardown, both gates named and the removal script checked against a copy of the tree, is written up for whoever opens them.",
} as const satisfies Finding
