export interface CharacterBuildData {
  classIndex: number
  raceIndex: number
  allianceIndex: number
  roleBitmask: number
  vampireStageIndex: number
  curseIndex: number
  mundusIndex: number
  magicka: number
  health: number
  stamina: number
  skillLineIndices: number[]
  armor: CharacterArmorSlotData[]
  jewelry: CharacterJewelrySlotData[]
  weaponBars: CharacterWeaponBarData[]
  primarySkills: number[]
  backupSkills: number[]
  passiveBitmask: boolean[]
  championPoints: CharacterCPDisciplineData[]
  foodIndex: number
  potionIndex: number
  potion2Index: number
  targetArmorBit: number
  targetHealth: number
  scribing: CharacterScribingData[]
  esoPlusBit: number
}

export interface CharacterArmorSlotData {
  isEmpty: boolean
  weightIndex: number
  traitIndex: number
  enchantIndex: number
  setIndex: number
  qualityIndex: number
  enchantQualityIndex: number
}

export interface CharacterJewelrySlotData {
  isEmpty: boolean
  traitIndex: number
  enchantIndex: number
  setIndex: number
  qualityIndex: number
  enchantQualityIndex: number
}

export interface CharacterWeaponBarData {
  mainHand: CharacterWeaponSlotData
  offHand: CharacterWeaponSlotData
}

export interface CharacterWeaponSlotData {
  isEmpty: boolean
  isShield: boolean
  shieldTraitIndex: number
  shieldEnchantIndex: number
  typeIndex: number
  traitIndex: number
  enchantIndex: number
  poisonIndex: number
  setIndex: number
  qualityIndex: number
  enchantQualityIndex: number
}

export interface CharacterCPDisciplineData {
  slotted: number[]
  passive: number[]
}

export interface CharacterScribingData {
  scribedSkillIndex: number
  grimoireIndex: number
  focusIndex: number
  signatureIndex: number
  affixIndex: number
}
