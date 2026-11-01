import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import { spentAttributes } from "akasha/temper/addon/pages/characters/modules/characters-build-attributes/characters-build-attributes.module.code.ts"
import { BAR_SLOT_INDICES } from "akasha/temper/addon/pages/characters/modules/characters-build-bars/characters-build-bars.module.code.ts"
import { slottedOf } from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import { wornGear } from "akasha/temper/addon/pages/characters/modules/characters-build-gear/characters-build-gear.module.code.ts"
import {
  type CharacterTarget,
  TARGET_DISCIPLINES,
  type TargetBarSlot,
  type TargetDiscipline,
  type TargetDisciplineKey,
  type TargetStar,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

const FIRST_ICON = 1

function barNow(hotbar: HotBarCategory): readonly TargetBarSlot[] {
  return BAR_SLOT_INDICES.map((slot) => {
    const abilityId = GetSlotBoundId(slot, hotbar)
    const name = abilityId === 0 ? "" : zo_strformat("<<1>>", GetAbilityName(abilityId))
    return { name, abilityId }
  })
}

function starOf(id: number): TargetStar {
  return { id, name: id === 0 ? "" : zo_strformat("<<1>>", GetChampionSkillName(id)) }
}

function disciplineNow(discipline: TargetDisciplineKey, base: CharacterTarget): TargetDiscipline {
  const slotted = slottedOf(discipline).map(starOf)
  const held = base.champion.find((one) => one.discipline === discipline)
  const stars = held?.stars ?? slotted.filter((star) => star.id !== 0)
  return { discipline, slotted, stars }
}

export function newLiveTarget(base: CharacterTarget | undefined, title: string): CharacterTarget {
  return liveTargetOf({
    buildId: "",
    title,
    icon: FIRST_ICON,
    updatedAt: "",
    curseName: base?.curseName ?? "",
    attributes: { health: 0, magicka: 0, stamina: 0 },
    champion: base?.champion ?? [],
    bars: { primary: [], backup: [] },
    gear: [],
    passives: base?.passives ?? [],
    ...(base?.mundus === undefined ? {} : { mundus: base.mundus }),
    ...(base?.food === undefined ? {} : { food: base.food }),
  })
}

function curseNow(): string {
  const curse = GetPlayerCurseType()
  return curse === CURSE_TYPE_NONE ? "" : GetString("SI_CURSETYPE", curse)
}

export function liveTargetOf(base: CharacterTarget): CharacterTarget {
  return {
    ...base,
    curseName: curseNow(),
    attributes: spentAttributes(),
    champion: TARGET_DISCIPLINES.map((discipline) => disciplineNow(discipline, base)),
    bars: { primary: barNow(HOTBAR_CATEGORY_PRIMARY), backup: barNow(HOTBAR_CATEGORY_BACKUP) },
    gear: wornGear(),
  }
}
