import type { Finding } from "../finding.page-type.ts"

export const splittingADataTableForTheByteCeilingMovedACodecIndex = {
  id: "01a0609d-ecb9-7204-82b6-a18eef7e7212",
  pageTypeSlug: "finding",
  slug: "splitting-a-data-table-for-the-byte-ceiling-moved-a-codec-index",
  domainSlug: "domain/temper",
  claim:
    "temper-alchemy split the 31,891-byte crafted potion table four ways to clear the 15,000-byte ceiling, and the split reordered it. potions.ids is the build codec's wire index, so a saved build hash decoded to the wrong potion from index 14 on. The order is restored. Any other temper data table split to fit the ceiling needs the same check.",
  evidence:
    "temper/game-codec/src/character/build-codec-indices.ts line 84 takes potionIds from potions.ids, and getPotionId(index) at line 382 turns a wire index back into an id for build-codec v48 through v52. temper/game-items-alchemy/src/generated/temper-potion-crafted.generated.ts held 35 crafted potions in one order; the recreation split them into potions-crafted-health, potions-crafted-magicka, potions-crafted-stamina and potions-crafted-other, and the module gathering them spread the four groups in turn. The 46 ids matched as a set and the values compared equal as JSON, so only the order differed, first at index 14: the source held vitality-stealth-detection there and the recreation held endurance-fortitude-health-restore-resistance-physical-stamina-restore. potions-crafted.module.code.ts now names all 35 keys in the source order and reads each one from the four groups, and potions.ids compares identical again. championPoints.ids over 121 entries, classes.ids over 8, poisons.ids over 1, buffOrDebuff.ids over 77 and sourceCategories.ids over 22 were compared the same way and were already identical. tools/lib/temper-addon-data/generators/potion-mappings.ts line 72 writes the same index into the addon's Lua, so the addon would have drifted with it.",
} as const satisfies Finding
