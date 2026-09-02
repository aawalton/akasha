import type { ItemKey } from "@akasha/temper-items-rules-core/use-destination-types"

export type LookupResult<T> = T | "unknown"

export type ClaimMap = ReadonlyMap<string, ReadonlySet<string>>

export interface EvalEnv {
  readonly isKnownByCharacter: (itemKey: ItemKey, charId: string) => LookupResult<boolean>

  readonly isKnownByAnyCharacter: (itemKey: ItemKey) => LookupResult<boolean>

  readonly isTraitResearched: (
    charId: string,
    craftingType: number,
    traitName: string
  ) => LookupResult<boolean>

  readonly isCraftingRankBelowCap: (charId: string, craftingType: number) => LookupResult<boolean>

  readonly matchesWantedEquipment: (facts: WantedEquipmentFacts) => LookupResult<boolean>

  readonly matchesWantedCompanionEquipment: (facts: WantedEquipmentFacts) => LookupResult<boolean>

  readonly isCompanionWornSlotFilled: (
    companionName: string,
    facts: WantedEquipmentFacts
  ) => LookupResult<boolean>

  readonly findCharacterForWantedEquipment: (
    facts: WantedEquipmentFacts
  ) => LookupResult<string | undefined>

  readonly findCompanionForWantedEquipment: (
    facts: WantedEquipmentFacts
  ) => LookupResult<string | undefined>

  readonly getConsumableStock: (itemId: number, charId: string) => LookupResult<number>

  readonly getConsumableWanters: (itemId: number) => LookupResult<ReadonlyArray<string>>

  readonly getBankStock: (itemId: number) => LookupResult<number>

  readonly getCooldownGroup: (itemId: number) => LookupResult<string | null>

  readonly isCooldownExpired: (groupKey: string) => LookupResult<boolean>

  readonly getTransmuteCrystalAmount: () => LookupResult<number>

  readonly getTransmuteCrystalCap: () => LookupResult<number>

  readonly getKnownScripts: (charId: string) => LookupResult<ReadonlySet<number>>

  readonly getTotalScriptCount: () => LookupResult<number>

  readonly getCharacterPriority: () => LookupResult<ReadonlyArray<string>>

  readonly getCurrentCharacter: () => LookupResult<string>

  readonly getAllCharacters: () => LookupResult<ReadonlyArray<string>>
}

export interface WantedEquipmentFacts {
  readonly equipType: number
  readonly traitType: number
  readonly quality: number
  readonly armorType?: number
  readonly weaponType?: number
}

export interface EvalContext {
  readonly env: EvalEnv
  readonly claimedByCharacter?: ClaimMap
  readonly skipStock?: boolean
  readonly stockGroupByRuleId?: ReadonlyMap<string, ReadonlySet<number>>
}
