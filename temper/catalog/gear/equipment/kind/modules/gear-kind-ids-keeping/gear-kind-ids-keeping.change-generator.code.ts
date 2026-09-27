import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import { temperJewelrySlot } from "akasha/temper/catalog/gear/temper-jewelry-slot/temper-jewelry-slot.page-type.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import { temperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

function every(): boolean {
  return true
}

function standard(page: Readonly<Record<string, unknown>>): boolean {
  return page.isStandard === true
}

const KEEPING: Keeping = {
  at: "temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts",
  pageTypeSlug: temperArmorSlot.slug,
  from: "slot and armor weight pages",
  unions: [
    { name: "ArmorSlotId", holds: every, pageTypeSlug: temperArmorSlot.slug },
    { name: "JewelrySlotId", holds: every, pageTypeSlug: temperJewelrySlot.slug },
    { name: "WeaponSlotId", holds: every, pageTypeSlug: temperWeaponSlot.slug },
    { name: "StandardArmorWeightId", holds: standard, pageTypeSlug: temperArmorWeight.slug },
    { name: "OtherArmorWeightId", holds: every, pageTypeSlug: temperArmorWeight.slug },
    { name: "WeaponTypeId", holds: every, pageTypeSlug: temperWeaponType.slug },
    { name: "ArmorTraitId", holds: every, pageTypeSlug: temperArmorTrait.slug },
    { name: "WeaponTraitId", holds: every, pageTypeSlug: temperWeaponTrait.slug },
    { name: "JewelryTraitId", holds: every, pageTypeSlug: temperJewelryTrait.slug },
  ],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
