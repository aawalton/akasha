import "akasha/temper/eso/type/eso-armory/eso-armory.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-03/eso-enums-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import type { ArmoryBuild } from "akasha/temper/addon/pages/characters/modules/characters-armory-pending/characters-armory-pending.module.code.ts"
import { BAR_SLOT_INDICES } from "akasha/temper/addon/pages/characters/modules/characters-build-bars/characters-build-bars.module.code.ts"
import { championSlotPlace } from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import {
  gearHeldAt,
  gearInSlot,
} from "akasha/temper/addon/pages/characters/modules/characters-build-gear/characters-build-gear.module.code.ts"

const OUT_OF_REACH = [BAG_BANK, BAG_SUBSCRIBER_BANK]

export interface ArmoryBuildData {
  readonly build: ArmoryBuild
  name: string
  icon: number
  IsInstanceOf: (this: ArmoryBuildData, kind: object) => boolean
  GetBuildIndex: (this: ArmoryBuildData) => number
  GetName: (this: ArmoryBuildData) => string
  SetName: (this: ArmoryBuildData, name: string) => void
  GetIconIndex: (this: ArmoryBuildData) => number
  SetIconIndex: (this: ArmoryBuildData, icon: number) => void
  GetIcon: (this: ArmoryBuildData) => string
  GetAttributeSpentPoints: (this: ArmoryBuildData, attribute: number) => number
  GetSlottedChampionSkillId: (this: ArmoryBuildData, slot: number) => number
  GetSlottedAbilityId: (this: ArmoryBuildData, slot: number, hotbar: number) => number
  GetEquipSlotInfo: (
    this: ArmoryBuildData,
    equipSlot: number
  ) => LuaMultiReturn<[state: number, bag: number, slotIndex: number]>
  GetEquipSlotItemLinkInfo: (
    this: ArmoryBuildData,
    equipSlot: number
  ) => LuaMultiReturn<[state: number, link: string]>
}

export function buildIconFile(icon: number): string {
  return string.format(ZO_ARMORY_BUILD_ICON_TEXTURE_FORMATTER, icon)
}

function attributePoints(build: ArmoryBuild, attribute: number): number {
  const spent = build.target.attributes
  if (attribute === ATTRIBUTE_HEALTH) return spent.health
  if (attribute === ATTRIBUTE_MAGICKA) return spent.magicka
  return spent.stamina
}

function championAt(build: ArmoryBuild, slot: number): number {
  const place = championSlotPlace(slot)
  if (place === undefined) return 0
  const held = build.target.champion.find((one) => one.discipline === place.discipline)
  return held?.slotted[place.at]?.id ?? 0
}

function abilityAt(build: ArmoryBuild, slot: number, hotbar: number): number {
  const bar =
    hotbar === HOTBAR_CATEGORY_BACKUP ? build.target.bars.backup : build.target.bars.primary
  return bar[BAR_SLOT_INDICES.indexOf(slot)]?.abilityId ?? 0
}

function equipSlotInfo(
  build: ArmoryBuild,
  equipSlot: number
): LuaMultiReturn<[state: number, bag: number, slotIndex: number]> {
  const gear = gearInSlot(build.target, equipSlot)
  if (gear === undefined) return $multi(ARMORY_BUILD_EQUIP_SLOT_STATE_EMPTY, BAG_WORN, equipSlot)
  const held = gearHeldAt(gear)
  if (held === undefined) return $multi(ARMORY_BUILD_EQUIP_SLOT_STATE_MISSING, BAG_WORN, equipSlot)
  const state = OUT_OF_REACH.includes(held.bag)
    ? ARMORY_BUILD_EQUIP_SLOT_STATE_INACCESSIBLE
    : ARMORY_BUILD_EQUIP_SLOT_STATE_VALID
  return $multi(state, held.bag, held.slotIndex)
}

export function armoryBuildDataOf(build: ArmoryBuild, index: number): ArmoryBuildData {
  return {
    build,
    name: build.title,
    icon: build.icon,
    IsInstanceOf: (kind) => kind === ZO_SkillsActionBarData,
    GetBuildIndex: () => index,
    GetName() {
      return this.name
    },
    SetName(name) {
      this.name = name
    },
    GetIconIndex() {
      return this.icon
    },
    SetIconIndex(icon) {
      this.icon = icon
    },
    GetIcon() {
      return buildIconFile(this.icon)
    },
    GetAttributeSpentPoints: (attribute) => attributePoints(build, attribute),
    GetSlottedChampionSkillId: (slot) => championAt(build, slot),
    GetSlottedAbilityId: (slot, hotbar) => abilityAt(build, slot, hotbar),
    GetEquipSlotInfo(equipSlot) {
      return equipSlotInfo(build, equipSlot)
    },
    GetEquipSlotItemLinkInfo(equipSlot) {
      const [state, bag, slotIndex] = equipSlotInfo(build, equipSlot)
      const link = state === ARMORY_BUILD_EQUIP_SLOT_STATE_VALID ? GetItemLink(bag, slotIndex) : ""
      return $multi(state, link)
    },
  }
}
