export const GRIMOIRE_NAME_TO_INDEX: Record<string, number> = {
  ["Vault"]: 0,
  ["Wield Soul"]: 1,
  ["Shield Throw"]: 2,
  ["Smash"]: 3,
  ["Elemental Explosion"]: 4,
  ["Mender's Bond"]: 5,
  ["Traveling Knife"]: 6,
  ["Soul Burst"]: 7,
  ["Ulfsild's Contingency"]: 8,
  ["Torchbearer"]: 9,
  ["Trample"]: 10,
  ["Banner Bearer"]: 11,
}
export const GRIMOIRE_NAME_TO_TEMPER_ID: Record<string, string> = {
  ["Vault"]: "vault",
  ["Wield Soul"]: "wield-soul",
  ["Shield Throw"]: "shield-throw",
  ["Smash"]: "smash",
  ["Elemental Explosion"]: "elemental-explosion",
  ["Mender's Bond"]: "menders-bond",
  ["Traveling Knife"]: "traveling-knife",
  ["Soul Burst"]: "soul-burst",
  ["Ulfsild's Contingency"]: "ulfsilds-contingency",
  ["Torchbearer"]: "torchbearer",
  ["Trample"]: "trample",
  ["Banner Bearer"]: "banner-bearer",
}
export function getGrimoireIndex(name: string): number {
  return GRIMOIRE_NAME_TO_INDEX[name] ?? 0
}
export function getGrimoireTemperId(name: string): string {
  return GRIMOIRE_NAME_TO_TEMPER_ID[name] ?? "vault"
}
export const FOCUS_SCRIPT_NAME_TO_INDEX: Record<string, number> = {
  ["Physical Damage"]: 0,
  ["Poison Damage"]: 1,
  ["Disease Damage"]: 2,
  ["Bleed Damage"]: 3,
  ["Magic Damage"]: 4,
  ["Shock Damage"]: 5,
  ["Frost Damage"]: 6,
  ["Flame Damage"]: 7,
  ["Trauma"]: 8,
  ["Multi-Target"]: 9,
  ["Taunt"]: 10,
  ["Knockback"]: 11,
  ["Pull"]: 12,
  ["Immobilize"]: 13,
  ["Stun"]: 14,
  ["Dispel"]: 15,
  ["Healing"]: 16,
  ["Restore Resources"]: 17,
  ["Damage Shield"]: 18,
  ["Generate Ultimate"]: 19,
  ["Mitigation"]: 20,
}
export const FOCUS_SCRIPT_NAME_TO_TEMPER_ID: Record<string, string> = {
  ["Physical Damage"]: "physical-damage",
  ["Poison Damage"]: "poison-damage",
  ["Disease Damage"]: "disease-damage",
  ["Bleed Damage"]: "bleed-damage",
  ["Magic Damage"]: "magic-damage",
  ["Shock Damage"]: "shock-damage",
  ["Frost Damage"]: "frost-damage",
  ["Flame Damage"]: "flame-damage",
  ["Trauma"]: "trauma",
  ["Multi-Target"]: "multi-target",
  ["Taunt"]: "taunt",
  ["Knockback"]: "knockback",
  ["Pull"]: "pull",
  ["Immobilize"]: "immobilize",
  ["Stun"]: "stun",
  ["Dispel"]: "dispel",
  ["Healing"]: "healing",
  ["Restore Resources"]: "restore-resources",
  ["Damage Shield"]: "damage-shield",
  ["Generate Ultimate"]: "generate-ultimate",
  ["Mitigation"]: "mitigation",
}
export function getFocusScriptIndex(name: string): number {
  return FOCUS_SCRIPT_NAME_TO_INDEX[name] ?? 0
}
export function getFocusScriptTemperId(name: string): string {
  return FOCUS_SCRIPT_NAME_TO_TEMPER_ID[name] ?? "physical-damage"
}
export const SIGNATURE_SCRIPT_NAME_TO_INDEX: Record<string, number> = {
  ["Lingering Torment"]: 1,
  ["Hunter's Snare"]: 2,
  ["Knight's Valor"]: 3,
  ["Leeching Thirst"]: 4,
  ["Immobilizing Strike"]: 5,
  ["Assassin's Misery"]: 6,
  ["Anchorite's Cruelty"]: 7,
  ["Class Mastery"]: 8,
  ["Sage's Remedy"]: 9,
  ["Warmage's Defense"]: 10,
  ["Druid's Resurgence"]: 11,
  ["Thief's Swiftness"]: 12,
  ["Crusader's Defiance"]: 13,
  ["Fencer's Parry"]: 14,
  ["Gladiator's Tenacity"]: 15,
  ["Anchorite's Potency"]: 16,
  ["Wayfarer's Mastery"]: 17,
  ["Warrior's Opportunity"]: 18,
  ["Cavalier's Charge"]: 19,
  ["Growing Impact"]: 20,
}
export const SIGNATURE_SCRIPT_NAME_TO_TEMPER_ID: Record<string, string> = {
  ["Lingering Torment"]: "lingering-torment",
  ["Hunter's Snare"]: "hunters-snare",
  ["Knight's Valor"]: "knights-valor",
  ["Leeching Thirst"]: "leeching-thirst",
  ["Immobilizing Strike"]: "immobilizing-strike",
  ["Assassin's Misery"]: "assassins-misery",
  ["Anchorite's Cruelty"]: "anchorites-cruelty",
  ["Class Mastery"]: "class-mastery",
  ["Sage's Remedy"]: "sages-remedy",
  ["Warmage's Defense"]: "warmages-defense",
  ["Druid's Resurgence"]: "druids-resurgence",
  ["Thief's Swiftness"]: "thiefs-swiftness",
  ["Crusader's Defiance"]: "crusaders-defiance",
  ["Fencer's Parry"]: "fencers-parry",
  ["Gladiator's Tenacity"]: "gladiators-tenacity",
  ["Anchorite's Potency"]: "anchorites-potency",
  ["Wayfarer's Mastery"]: "wayfarers-mastery",
  ["Warrior's Opportunity"]: "warriors-opportunity",
  ["Cavalier's Charge"]: "cavaliers-charge",
  ["Growing Impact"]: "growing-impact",
}
export function getSignatureScriptIndex(name: string): number {
  return SIGNATURE_SCRIPT_NAME_TO_INDEX[name] ?? 0
}
export function getSignatureScriptTemperId(name: string): string {
  return SIGNATURE_SCRIPT_NAME_TO_TEMPER_ID[name] ?? "no-signature-script"
}
export const AFFIX_SCRIPT_NAME_TO_INDEX: Record<string, number> = {
  ["Off Balance"]: 1,
  ["Interrupt"]: 2,
  ["Savagery and Prophecy"]: 3,
  ["Expedition"]: 4,
  ["Resolve"]: 5,
  ["Evasion"]: 6,
  ["Vitality"]: 7,
  ["Berserk"]: 8,
  ["Brutality and Sorcery"]: 9,
  ["Empower"]: 10,
  ["Protection"]: 11,
  ["Courage"]: 12,
  ["Heroism"]: 13,
  ["Intellect and Endurance"]: 14,
  ["Force"]: 15,
  ["Vulnerability"]: 16,
  ["Maim"]: 17,
  ["Cowardice"]: 18,
  ["Enervation"]: 19,
  ["Mangle"]: 20,
  ["Breach"]: 21,
  ["Lifesteal"]: 22,
  ["Defile"]: 23,
  ["Brittle"]: 24,
  ["Uncertainty"]: 25,
  ["Magickasteal"]: 26,
}
export const AFFIX_SCRIPT_NAME_TO_TEMPER_ID: Record<string, string> = {
  ["Off Balance"]: "off-balance",
  ["Interrupt"]: "interrupt",
  ["Savagery and Prophecy"]: "savagery-and-prophecy",
  ["Expedition"]: "expedition",
  ["Resolve"]: "resolve",
  ["Evasion"]: "evasion",
  ["Vitality"]: "vitality",
  ["Berserk"]: "berserk",
  ["Brutality and Sorcery"]: "brutality-and-sorcery",
  ["Empower"]: "empower",
  ["Protection"]: "protection",
  ["Courage"]: "courage",
  ["Heroism"]: "heroism",
  ["Intellect and Endurance"]: "intellect-and-endurance",
  ["Force"]: "force",
  ["Vulnerability"]: "vulnerability",
  ["Maim"]: "maim",
  ["Cowardice"]: "cowardice",
  ["Enervation"]: "enervation",
  ["Mangle"]: "mangle",
  ["Breach"]: "breach",
  ["Lifesteal"]: "lifesteal",
  ["Defile"]: "defile",
  ["Brittle"]: "brittle",
  ["Uncertainty"]: "uncertainty",
  ["Magickasteal"]: "magickasteal",
}
export function getAffixScriptIndex(name: string): number {
  return AFFIX_SCRIPT_NAME_TO_INDEX[name] ?? 0
}
export function getAffixScriptTemperId(name: string): string {
  return AFFIX_SCRIPT_NAME_TO_TEMPER_ID[name] ?? "no-affix-script"
}
