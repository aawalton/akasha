import type { Finding } from "../finding.page-type.ts"

export const pairsOverAnUnknownTypechecksNothing = {
  id: "01a06248-a650-71b3-82c2-7d55718f1e03",
  pageTypeSlug: "finding",
  slug: "pairs-over-an-unknown-typechecks-nothing",
  domainSlug: "domain/temper",
  claim:
    "Iterating an `unknown` with `pairs()` makes both loop variables `never`, and `never` is assignable to everything, so the whole loop body passes the typecheck without being checked. A module that reads an `unknown`-returning API this way looks typed and is not.",
  evidence:
    "Found on 2026-09-02 while landing LibSets. `tstl-eso-sandbox.type-declaration.d.ts:109` declares `pairs<T>(t: T): LuaIterable<LuaMultiReturn<[keyof T, NonNullable<T[keyof T]>]>>`. With `T = unknown`, `keyof unknown` is `never`, so the key and the value are both `never`.\n\nI changed `lib-sets-api-5:88-89` so `GetAllDropZones` and `GetAllDropLocationNames` return `unknown`, matching their siblings and the implementation, and predicted that `lib-sets-kbf-drop-filters` — which guards the result, iterates it with `pairs()`, and passes a value into `CreateItemEntry(name: string)` — would refuse with TS2322 at both sites. It did not. The tier dry run reported no type error against the unedited file.\n\nI then compiled the shape on its own under `tsc --strict`: inside `for (const [k, v] of pairs(<unknown>))`, every one of `CreateItemEntry(v)`, `needsNumber(v)`, `needsNumber(k)` and `const x: { deeply: { nested: symbol } } = v` compiles. The loop body is unchecked. `lib-sets-kbf-drop-filters` lines 32-40 and 114-122 stand today with no type checking inside them, and any other `pairs()` over an `unknown` in the tree is in the same state.\n\nThe emitted Lua is unaffected, so nothing is wrong at runtime. What is wrong is the record: a green typecheck over such a loop says nothing.\n\nThe call taken: filed rather than fixed. The narrow fix in LibSets is to cast the `unknown` at the call site, as `lib-sets-search-ui-shared-rowmenu:180` already does for the same family. The wide fix is to the `pairs` declaration — an overload rejecting `unknown`, or a constraint `T extends object` — and that touches every addon, so it is not mine to make mid-swarm.",
} as const satisfies Finding
