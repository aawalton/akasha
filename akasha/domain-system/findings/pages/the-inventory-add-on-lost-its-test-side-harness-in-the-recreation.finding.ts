import type { Finding } from "../finding.page-type.ts"

export const theInventoryAddOnLostItsTestSideHarnessInTheRecreation = {
  id: "01a0627e-66ef-75ee-bab7-48784b5a52e9",
  pageTypeSlug: "finding",
  slug: "the-inventory-add-on-lost-its-test-side-harness-in-the-recreation",
  domainSlug: "domain/temper",
  claim:
    "The inventory add-on carried three test-side files that no module imported at runtime: a fixture harness for cross-character bank dispatch, a reader of ESO globals from a saved file, and an emulation of Lua's tonumber. None was recreated, and no module page of temper-items-addon states a test, so the add-on landed with 152 modules and no test route at all.",
  evidence:
    "`temper/game-items-addon/src/rules-dispatch-cross-char/bag-world.ts` is 247 lines importing `bun:test`, `zod` and `@akasha/utils-narrow/require-match-positional`, and building a fake bag world around `clearAllPendingActions`, `BankSlotContext` and `onTradingHouseClosed`. `test-eso-load-globals.ts` (72 lines) reads a file through `node:fs` and parses it with `zod`; `test-lua-tonumber.ts` (28 lines) re-implements Lua's number parsing so a bun test can agree with the game. `grep -rln` over `src/` finds one importer among them, `test-eso-load-globals.ts` importing `test-lua-tonumber`, and no `.test.ts` beside any module. The three were dropped by the generator that produced the recreation because each reaches `node:` or `bun:test`, which no Lua bundle can carry and which the eso-addon page type has no property for; a module page's `test` property is the route, and none of the 152 module pages written at `ee3181a15b` states one. What is lost is the harness, not a running test: nothing in `temper/game-items-addon` ran it either.",
} as const satisfies Finding
