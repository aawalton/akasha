import type { Finding } from "../finding.page-type.ts"

export const anIdUnionCarriesNoCodecIndexAndTheTableItTypesDoes = {
  id: "01a060f0-3eb5-724b-b52b-8f316c371a94",
  pageTypeSlug: "finding",
  slug: "an-id-union-carries-no-codec-index-and-the-table-it-types-does",
  domainSlug: "domain/temper",
  claim:
    "Three equipment tables carry a build-codec wire index: setsAll.ids, standardArmorWeights.ids and weaponTypes.ids. The id types of all three now live in akasha as unions. A union names its members and no order among them, so moving an id type moves no index and is safe. Moving the tables is the operation that is not safe.",
  evidence:
    "build-codec-indices.ts line 64 takes setIds from setsAll.ids, line 49 takes armorWeightIds from standardArmorWeights.ids, and line 57 takes weaponTypeIds from weaponTypes.ids. SET_BITS at line 112, ARMOR_WEIGHT_BITS at line 102 and WEAPON_TYPE_BITS at line 107 are each bitsNeeded over those lengths, and getSetId at line 346, getArmorWeightId at line 306 and getWeaponTypeId at line 326 turn a stored wire index back into an id for build-codec v48 through v52.\n\ncreate-data-file.module.code.ts line 25 derives ids from Object.values(data), so the key order of each object literal is the wire order. That is why a division or a reorder of any of the three tables rewrites every saved build hash from the moved row onward, and why the crafted potion split already did so.\n\nThe akasha modules set-ids, set-ids-a-to-o, set-ids-p-to-z, armor-weight-ids and weapon-type-ids hold unions rather than tables. A union has no index, so none of them carries a constraint or a gap about place; such a pair would say something false. The three tables keep their order outside akasha, where that pair has no page to carry it, which is the reason this finding exists.\n\nMoving an id type into akasha is safe precisely because it moves no index. Finishing the job by moving the tables as well is the operation to weigh separately: that one meets the byte ceiling, needs a division of the 1,362,516-byte set table, and needs a check that the order survived index for index.",
} as const satisfies Finding
