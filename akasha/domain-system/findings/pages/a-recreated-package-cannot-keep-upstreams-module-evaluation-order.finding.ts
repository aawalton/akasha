import type { Finding } from "../finding.page-type.ts"

export const aRecreatedPackageCannotKeepUpstreamsModuleEvaluationOrder = {
  id: "01a061b1-a093-772c-8773-388a941b80cf",
  pageTypeSlug: "finding",
  slug: "a-recreated-package-cannot-keep-upstreams-module-evaluation-order",
  domainSlug: "domain/temper",
  claim:
    "A body's named imports are sorted as it lands, so a recreated package's depth-first module evaluation order is not upstream's and cannot be made so. Landing `temper-skyshards` moved `skyshards-console-state` from evaluation position 21 to position 2. What holds instead is the relative order of the modules whose bodies do something when loaded. Three of the forty-six do, and their order is unchanged. A seat proving faithfulness should measure that subsequence rather than the whole sequence.",
  evidence:
    "Landed at `dd4bd3bc`, 46 modules recreated from `temper/game-collections-addon/src/skyshards`.\n\nDepth-first post-order from the entry point, skipping `import type` and treating a non-relative specifier as a leaf, gives 43 modules upstream and 46 in akasha. Against the bytes handed in, the two sequences were identical once the three new data-group pages were set aside. Against the bytes that landed they were not: `skyshards-console-state` had moved from 21 to 2, rotating every module between. Setting that one name aside as well makes the remainder identical again.\n\nThe move is inert because that module's body only declares an object literal of constants. An over-inclusive scan for load-time work, taking every top-level statement that is not an import, an export, an interface, a type alias, a function or a module declaration, plus every initializer holding a call, a `new` or an `await`, names four modules in the package. `skyshards-global` assigns `globalThis.TemperSkyShards`. `skyshards-logger` calls `LibDebugLogger.Create`. `skyshards-console-load` and `skyshards-pc-pins` each call `GetString` while building a click table. Nothing imports `skyshards-logger`, so three are reachable from the entry, and both sides give `skyshards-global -> skyshards-console-load -> skyshards-pc-pins`.\n\nThis bears on `lorebooks` and on the four root files of the same addon, where the order in `events.ts` is live.",
} as const satisfies Finding
