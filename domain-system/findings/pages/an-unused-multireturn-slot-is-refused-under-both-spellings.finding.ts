import type { Finding } from "../finding.page-type.ts"

export const anUnusedMultireturnSlotIsRefusedUnderBothSpellings = {
  id: "01a06341-d9e8-700a-9002-6357411da4e0",
  pageTypeSlug: "finding",
  slug: "an-unused-multireturn-slot-is-refused-under-both-spellings",
  domainSlug: "domain/temper",
  claim:
    "A game call returning several values is destructured, and a slot the caller does not want has no spelling that lands. `_hasCharges` is refused by `lower-camel-case` for the leading underscore, and `hasCharges` is refused by `lint/correctness/noUnusedVariables` for going unread. The two rules leave no name between them. Destructuring elision satisfies both, because an empty slot declares no name at all.",
  evidence:
    "Recreating the datamining addon at `57ffdd2633`, `GetItemLinkEnchantInfo` and `GetItemLinkSetInfo` each return a value the caller drops. The legacy source spelled them `_hasCharges` and `_numNormal`. `akasha write` refused both: `line 57 declares the name `_hasCharges`, which is not written in `name-format/lower-camel-case`` and the same for `_numNormal` at line 61. Renaming to `hasCharges` and `numNormal` drew the opposite refusal from the linter, `This variable hasCharges is unused` at 57:10 and `This variable numNormal is unused` at 61:39. Writing `const [, enchantHeader, enchantDescription] = GetItemLinkEnchantInfo(itemLink)` and `const [hasSet, setName, numBonuses, , maxEquipped, setId] = GetItemLinkSetInfo(itemLink, false)` landed with 40 checks judging 22 paths and none refusing.\n\nElision keeps the shape a Lua multireturn needs. The addon built at exit 0 with 0 errors and 37,698 bytes, so the positional read survived to Lua. This matters because the alternative a caller reaches for under the first refusal is to bind the call to one name and read that name by index, which is the silent-nil defect filed as `47d285a4b9`: in Lua only the first value of a multireturn survives. The two naming rules push a caller toward exactly the shape that breaks.",
} as const satisfies Finding
