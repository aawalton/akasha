import type { Finding } from "../finding.page-type.ts"

export const aBuildOfOneAddOnNeedsTheDeclarationsOfTheLibrariesItReachesAsGlobals = {
  id: "01a0628f-952c-71a0-ade6-ddcb1ef92ad7",
  pageTypeSlug: "finding",
  slug: "a-build-of-one-add-on-needs-the-declarations-of-the-libraries-it-reaches-as-globals",
  domainSlug: "domain/temper",
  claim:
    "The whole-tree typecheck sees every declaration file under `akasha/temper`, so a name declared inside one library's package resolves for every add-on. A build of one add-on includes only that add-on, `temper-eso-types` and `temper-addon-library-types`, so the same name is missing there. A clean tree typecheck is no evidence that one add-on builds: the navigation add-on typechecked at 0 refusals and built with 49 diagnostics, all `Cannot find name`.",
  evidence:
    "At `f6b1cda07b` the tree typechecked at `roots 20438; total refusals 0`. The single-add-on build of `temper-navigation-addon` by `lua-compiler/src/cli/tstl.ts`, including the package and the two shared declaration sets as every earlier single-add-on build did, exited 2 with 49 diagnostics: 43 `WORLD_MAP_MANAGER`, declared in `temper-lib-map-ping/map-ping-declarations`; 5 `LibAsync`, declared in `temper-lib-async/async-global-declarations`; 1 `MouseIsOver`, declared in `temper-lib-scrollable-menu/scrollable-menu-game-shapes`. The two game globals were the game's rather than the libraries', so they moved to `temper-eso-types/eso-world-map-window` at `64239f0af2`. `LibAsync` is the library's own name, and belongs where it is; the build reached 0 diagnostics only once `akasha/temper/temper-lib-async/**/*.d.ts` joined the include set. The add-on manifest's `dependsOn` names LibAsync among nine libraries, and the package manifest names none of them, so nothing in the akasha package says which libraries' declarations a build of it needs. The decision this informs is what the `temper-addon-build` command includes when it builds one add-on: the shared sets alone leave any add-on that reaches a library global unbuildable, and the temper original reached them through `temper/addons/types/libs/**/*.d.ts`, which the shared sets do not fully replace.",
} as const satisfies Finding
