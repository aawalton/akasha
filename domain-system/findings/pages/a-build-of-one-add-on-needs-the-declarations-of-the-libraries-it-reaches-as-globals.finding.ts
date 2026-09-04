import type { Finding } from "../finding.page-type.ts"

export const aBuildOfOneAddOnNeedsTheDeclarationsOfTheLibrariesItReachesAsGlobals = {
  id: "01a0628f-952c-71a0-ade6-ddcb1ef92ad7",
  pageTypeSlug: "finding",
  slug: "a-build-of-one-add-on-needs-the-declarations-of-the-libraries-it-reaches-as-globals",
  domainSlug: "domain/temper",
  claim:
    "The whole-tree typecheck sees every declaration file under `akasha/temper`, so a name declared inside one library's package resolves for every add-on. A build of one add-on reaches a narrower set, so the same name can be missing there. A clean tree typecheck is no evidence that one add-on builds: the navigation add-on typechecked at 0 refusals and built with 49 diagnostics, all `Cannot find name`.",
  evidence:
    "At `f6b1cda07b` the tree typechecked at `roots 20438; total refusals 0`. The single-add-on build of `temper-navigation-addon` by `lua-compiler/src/cli/tstl.ts` exited 2 with 49 diagnostics: 43 `WORLD_MAP_MANAGER`, declared in `temper-lib-map-ping/map-ping-declarations`; 5 `LibAsync`, declared in `temper-lib-async/async-global-declarations`; 1 `MouseIsOver`, declared in `temper-lib-scrollable-menu/scrollable-menu-game-shapes`. The two game globals were the game's rather than the libraries', so they moved to `temper-eso-types/eso-world-map-window` at `64239f0af2`. The `LibAsync` half was later settled the other way: the global moved into `temper-addon-library-types/lib-async` and the local page went, taking the navigation add-on from 5 errors to 0 at a byte-identical 2,587,442. The add-on manifest's `dependsOn` names LibAsync among nine libraries and the package manifest names none of them, so nothing in the akasha package says which libraries' declarations a build of it needs. Two later measurements bound how far this reads. The build's include is five glob groups rather than three, because reached workspace packages contribute `.d.ts` too. So a package's missing globals can be satisfied by a sibling that merely happens to declare the same names: `temper-lib-scrollable-menu` declares no dependencies at all, yet its three failing globals are owned by `temper-lib-map-pins` and `temper-lib-custom-menu`. The narrowing is real, and its edge is not where this first read it.",
} as const satisfies Finding
