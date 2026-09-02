import type {
  BaseAbilityValues,
  BasicValues,
  DamageCategory,
} from "@akasha/temper-combat-addon/combat-core-types"
import { isDamageCategory } from "@akasha/temper-combat-addon/combat-core-types"

const inf = math.huge

export const CATEGORY_LIST = {
  damageOut: [
    "DPSOut",
    "damageOutNormal",
    "damageOutCritical",
    "damageOutBlocked",
    "damageOutShielded",
    "damageOutTotal",
    "hitsOutNormal",
    "hitsOutCritical",
    "hitsOutBlocked",
    "hitsOutShielded",
    "hitsOutTotal",
  ],

  damageIn: [
    "DPSIn",
    "damageInNormal",
    "damageInCritical",
    "damageInBlocked",
    "damageInShielded",
    "damageInTotal",
    "hitsInNormal",
    "hitsInCritical",
    "hitsInBlocked",
    "hitsInShielded",
    "hitsInTotal",
  ],

  healingOut: [
    "HPSOut",
    "HPSAOut",
    "healingOutNormal",
    "healingOutCritical",
    "healingOutTotal",
    "healingOutOverflow",
    "healingOutAbsolute",
    "healsOutNormal",
    "healsOutCritical",
    "healsOutTotal",
    "healsOutOverflow",
    "healsOutAbsolute",
  ],

  healingIn: [
    "HPSIn",
    "healingInNormal",
    "healingInCritical",
    "healingInTotal",
    "healingInOverflow",
    "healingInAbsolute",
    "healsInNormal",
    "healsInCritical",
    "healsInTotal",
    "healsInOverflow",
    "healsInAbsolute",
  ],
} as const satisfies Record<DamageCategory, readonly string[]>

export type CategoryKey = (typeof CATEGORY_LIST)[DamageCategory][number]

export function createBasicValues(): BasicValues {
  const target: BasicValues = {
    damageOut: {},
    damageIn: {},
    healingOut: {},
    healingIn: {},
    spellResistance: {},
    physicalResistance: {},
    spellCrit: {},
    weaponCrit: {},
  }

  for (const [, list] of pairs(CATEGORY_LIST)) {
    for (const [, key] of ipairs(list)) {
      target[key] = 0
    }
  }

  return target
}

export const basicTable: BasicValues = createBasicValues()

export function createBaseAbility(tablekey: DamageCategory): BaseAbilityValues {
  const target: BaseAbilityValues = {
    max: 0,
    min: inf,
  }

  for (const [, key] of ipairs(CATEGORY_LIST[tablekey])) {
    target[key] = 0
  }

  return target
}

export const BASE_ABILITIES: Record<DamageCategory, BaseAbilityValues> = {
  damageOut: createBaseAbility("damageOut"),
  damageIn: createBaseAbility("damageIn"),
  healingOut: createBaseAbility("healingOut"),
  healingIn: createBaseAbility("healingIn"),
}

const HISTOGRAM_KEYS: Record<string, boolean> = {
  spellResistance: true,
  physicalResistance: true,
  spellCrit: true,
  weaponCrit: true,
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

export function sumUnitTables(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  reference: Record<string, unknown>
): undefined {
  for (const [key, object] of pairs(reference)) {
    if (istable(object)) {
      if (isDamageCategory(key)) {
        const sourceAbilities = source[key]
        const targetAbilities = target[key]
        if (!(istable(sourceAbilities) && istable(targetAbilities))) {
          error("ability tables missing while summing unit data")
        }

        for (const [id, ability] of pairs(sourceAbilities)) {
          if (!istable(ability)) {
            error("ability record corrupt while summing unit data")
          }
          const targetAbility = targetAbilities[id]
          if (targetAbility === undefined) {
            const copy: Record<string, unknown> = {}
            targetAbilities[id] = copy
            ZO_DeepTableCopy(ability, copy)
          } else if (istable(targetAbility)) {
            sumUnitTables(targetAbility, ability, BASE_ABILITIES[key])
          } else {
            error("ability record corrupt while summing unit data")
          }
        }
      } else if (HISTOGRAM_KEYS[key] === true) {
        const targetHistogram = target[key]
        const sourceHistogram = source[key]
        if (!(istable(targetHistogram) && istable(sourceHistogram))) {
          error("histogram tables missing while summing unit data")
        }
        sumUnitTables(targetHistogram, sourceHistogram, sourceHistogram)
      }
    } else if (type(object) === "number") {
      const targetValue = asNumber(target[key])
      const sourceValue = asNumber(source[key])

      if (key === "max") {
        target[key] = zo_max(targetValue ?? 0, sourceValue ?? 0)
      } else if (key === "min") {
        target[key] = zo_min(targetValue ?? inf, sourceValue ?? inf)
      } else {
        target[key] = (targetValue ?? 0) + (sourceValue ?? 0)
      }
    }
  }
  return undefined
}
