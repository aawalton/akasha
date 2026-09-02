import type { Finding } from "../finding.page-type.ts"

export const theAddonBuildCannotSeeAnAddonThatLandedInAkasha = {
  id: "01a0606a-b33d-70ab-8e97-9224f585a8ee",
  pageTypeSlug: "finding",
  slug: "the-addon-build-cannot-see-an-addon-that-landed-in-akasha",
  domainSlug: "domain/temper",
  claim:
    "The addon build finds an addon by a literal `addon.json` at a workspace folder root, and akasha can hold no file by that name. Two dot-parts is one short of what the naming grammar needs, so `addon.json` is a stray. Beside an akasha page the manifest is `<slug>.eso-addon.addon-manifest.json`, which the resolver skips. Every addon landing in akasha is invisible to the build until a seam writes the name the resolver reads.",
  evidence:
    'temper/shared-build-deploy-addons-resolve/src/index.ts line 30 builds `join(dir, "addon.json")` and line 46 drops any workspace folder where that file is absent, so discovery is keyed on the exact name. sibling-addons.ts line 22 does the same. akasha/pages-system/page/page-file-name/page-file-name.module.code.ts sets LEAST to 3 and `partedIn` answers null for a name with fewer dot-parts, so `addon.json` is a stray and file-has-its-page refuses a stray. The manifest that landed with akasha/temper/temper-lib-debug-logger in ad233a31f915af174e7fb4ce21a60733f1d8e454 is therefore named temper-lib-debug-logger.eso-addon.addon-manifest.json, holding the source addon.json byte for byte. The eso-addon page type already expects the mend and names it a departure: `A seam writes the manifest the game reads from the one beside the page` (akasha/code-system/eso-addon/eso-addon.page-type.ts line 45). Nothing writes that seam today. A second half of the same gap: the build compiles an addon through its tsconfig.json, which names the tstl bundle, the bundle entry and the output folder, and a tsconfig has no page type either (finding a-package-typecheck-config-has-no-page-type). So for temper-lib-debug-logger, luaBundle LibDebugLogger.lua, luaBundleEntry ./src/main.ts, luaTarget 5.1 and outDir ../addons/dist/LibDebugLogger are all dropped rather than carried. Until both halves are written, an addon in akasha typechecks and reads well and produces no Lua. Source still holds the buildable copy, so nothing shipped is broken.',
} as const satisfies Finding
