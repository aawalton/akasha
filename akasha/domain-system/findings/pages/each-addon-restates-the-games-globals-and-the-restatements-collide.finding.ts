import type { Finding } from "../finding.page-type.ts"

export const eachAddonRestatesTheGamesGlobalsAndTheRestatementsCollide = {
  id: "01a0606a-aa7c-73d6-81f5-9508d432800a",
  pageTypeSlug: "finding",
  slug: "each-addon-restates-the-games-globals-and-the-restatements-collide",
  domainSlug: "domain/temper",
  claim:
    "No akasha file may import `temper/addons/types`, so eleven addon packages in akasha each restate the ESO and Lua names they reach in a `*-declarations` module. Every restatement lands in the same global scope, so they collide. `akasha audit --check typecheck` answers 133 refusal lines, 107 of them in those modules. The rest are knock-on: a package that met every check at its own write breaks when the next package lands a narrower shape for a name both reach.",
  evidence:
    "`akasha audit --check typecheck` over 23,849 files answers 295 refusals and prints 133 lines; 107 name a `*-declarations.module.code.ts`. By code: 90 TS2451 `Cannot redeclare block-scoped variable`, 14 TS2339, 7 TS2717, 5 TS6200, 5 TS2554, 5 TS2300, 2 TS2740, 2 TS2558, 2 TS2551, 1 TS2403. Tallying the `const` lines of the eleven modules: `EVENT_MANAGER`, `EVENT_ADD_ON_LOADED` and `$multi` are each declared six times, `ZO_PreHook` and `string` five, `GetString` four, and `zo_strformat`, `WINDOW_MANAGER`, `SLASH_COMMANDS`, `MOUSE_BUTTON_INDEX_LEFT`, `LuaTable` and `LibDebugLogger` three. The knock-on reads plainly at akasha/temper/temper-lib-data-encode/data-encode-decoder/data-encode-decoder.module.code.ts line 46: `Property 'len' does not exist`, because temper-lib-chat-message's `const string` won the name and carries `format` and `gsub` rather than `len`. Each of the six addons I landed met 34 checks at `akasha write --dry-run`, since the write-time program holds only the files of that one change and can never see the collision. `page-type/type-declaration` carrying `file-property/ambient-types` landed while this wave ran, so a `.d.ts` may now keep the name a compiler reads. One shared akasha package of the ESO declarations, imported rather than restated, deletes all eleven modules. The six commits are 90f955a3e6, 63d734db43, 45b56c6c11, d99a98cf8e and 55c5996c88.",
} as const satisfies Finding
