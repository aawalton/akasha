import { expect, test } from "bun:test"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { companionArmorSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { CATALOG_READS } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-reading/companion-catalog-reading.module.code.ts"
import { companionJewelrySlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { companionSkillSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-slots/companion-skill-slots.module.code.ts"
import { companionWeaponSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-slots/companion-weapon-slots.module.code.ts"

test("every page type the catalogue reads answers the keys it is asked, with pages", () => {
  for (const [pageTypeSlug, keys] of CATALOG_READS) {
    const asked = asking(akashaRoot(), { pageTypeSlug, keys })
    expect("refused" in asked ? asked.refused : null).toBeNull()
    expect("rows" in asked ? asked.rows.length : 0).toBeGreaterThan(0)
  }
})

test("the catalogue built from the checkout gives every slot its page", () => {
  holdCompanionCatalogFromCheckout()
  expect(companionArmorSlots.list.map((slot) => slot.id)).toEqual([...companionArmorSlots.ids])
  expect(companionJewelrySlots.list.map((slot) => slot.id)).toEqual([...companionJewelrySlots.ids])
  expect(companionWeaponSlots.list.map((slot) => slot.id)).toEqual([...companionWeaponSlots.ids])
  expect(companionSkillSlots.list.map((slot) => slot.id)).toEqual([...companionSkillSlots.ids])
})
