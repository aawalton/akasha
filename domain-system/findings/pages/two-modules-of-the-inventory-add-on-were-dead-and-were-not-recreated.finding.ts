import type { Finding } from "../finding.page-type.ts"

export const twoModulesOfTheInventoryAddOnWereDeadAndWereNotRecreated = {
  id: "01a0627e-66ef-7aaa-b134-ea5678ce46c4",
  pageTypeSlug: "finding",
  slug: "two-modules-of-the-inventory-add-on-were-dead-and-were-not-recreated",
  domainSlug: "domain/temper",
  claim:
    "Two source files of the inventory add-on were imported by nothing and were left behind rather than recreated: a four-line Lua string-find wrapper and a twelve-line re-export of the inspire helpers. Their absence from akasha/temper/temper-items-addon is by choice, and the typecheck and the Lua build both pass without them.",
  evidence:
    "`temper/game-items-addon/src/lua-string-utils.ts` is four lines: `luaStringContains` over `string.find` with the plain flag. `temper/game-items-addon/src/rules-eval-lookup.ts` is twelve lines re-exporting `isDeconUsefulForAny`, `isDeconUsefulForCharacter` and `isDeconUsefulForCurrent` from `rules-core-inspire`; under akasha the `no-re-export` check refuses that shape outright. `grep -rln 'lua-string-utils\\|rules-eval-lookup' temper/game-items-addon/src` answers nothing but the two files themselves. The recreation's import census over the 156 sources named both as unreachable from `main.ts`, and they were dropped at the generator rather than rewritten. After `ee3181a15b` the tree typechecks at 0 refusals over 19,649 roots and `TemperInventory.lua` compiles at 1,790,305 bytes, so nothing reached them.",
} as const satisfies Finding
