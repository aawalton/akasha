export function encodedTraitsOf(traits: readonly number[], isThreeReagent: boolean): number {
  if (traits.length === 0) return 0
  const effect1 = traits[0] ?? 0
  const effect2 = traits[1] ?? 0
  const effect3 = traits[2] ?? 0
  const reagent3Flag = isThreeReagent ? 0x80 : 0
  return ((effect1 | reagent3Flag) << 16) | (effect2 << 8) | effect3
}

export const ALCHEMY_EFFECT_IDS = {
  "restore-health": 1,
  "ravage-health": 2,
  "restore-magicka": 3,
  "ravage-magicka": 4,
  "restore-stamina": 5,
  "ravage-stamina": 6,
  "spell-resistance": 7,
  breach: 8,
  "increase-armor": 9,
  fracture: 10,
  "spell-power": 11,
  "lower-spell-power": 12,
  "weapon-power": 13,
  maim: 14,
  "spell-critical": 15,
  uncertainty: 16,
  "weapon-critical": 17,
  enervation: 18,
  unstoppable: 19,
  stun: 20,
  detection: 21,
  invisible: 22,
  speed: 23,
  hindrance: 24,
  protection: 25,
  vulnerability: 26,
  "sustained-restore-health": 27,
  "gradual-ravage-health": 28,
  vitality: 29,
  defile: 30,
  heroism: 31,
} as const
