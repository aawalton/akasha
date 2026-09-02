export interface MetricEffectEntry {
  metricId: string
  effectType: string
  effectValue: { value: number; seconds: number }
}

export interface BuffEffectEntry {
  buffId: string
  seconds: number
}

export interface DebuffEffectEntry {
  debuffId: string
  seconds: number
}

export type PoisonEffectEntry = MetricEffectEntry | BuffEffectEntry | DebuffEffectEntry

export interface PoisonEffect {
  id: string
  name: string
  cooldown?: number
  icon?: string
  isPositive?: boolean
  oppositeId?: string
  effects: readonly PoisonEffectEntry[]
}

export const TEMPER_POISON_EFFECTS = [
  {
    id: "breach",
    name: "Breach",
    icon: "resources/crafting_alchemy_trait_lowerspellresist.png",
    isPositive: false,
    oppositeId: "increase-spell-resist",
    effects: [
      {
        metricId: "resistance-spell",
        effectType: "number-for-seconds",
        effectValue: { value: -1320, seconds: 36.6 },
      },
    ],
  },
  {
    id: "cowardice",
    name: "Cowardice",
    icon: "resources/crafting_alchemy_trait_lowerspellpower.png",
    isPositive: false,
    oppositeId: "increase-spell-power",
    effects: [{ debuffId: "minor-cowardice", seconds: 36.6 }],
  },
  {
    id: "defile",
    name: "Defile",
    icon: "resources/crafting_poison_trait_decreasehealing.png",
    isPositive: false,
    oppositeId: "vitality",
    effects: [{ debuffId: "minor-defile", seconds: 36.6 }],
  },
  {
    id: "detection",
    name: "Detection",
    icon: "resources/crafting_alchemy_trait_detection.png",
    isPositive: true,
    oppositeId: "invisible",
    effects: [
      {
        metricId: "stealth-detection",
        effectType: "number-for-seconds",
        effectValue: { value: 43.5, seconds: 12 },
      },
    ],
  },
  {
    id: "enervation",
    name: "Enervation",
    icon: "resources/crafting_alchemy_trait_lowerweaponcrit.png",
    isPositive: false,
    oppositeId: "increase-weapon-crit",
    effects: [{ debuffId: "minor-enervation", seconds: 36.6 }],
  },
  {
    id: "entrapment",
    name: "Entrapment",
    icon: "resources/crafting_alchemy_trait_stun.png",
    isPositive: false,
    oppositeId: "unstoppable",
    effects: [],
  },
  {
    id: "fracture",
    name: "Fracture",
    icon: "resources/crafting_alchemy_trait_lowerarmor.png",
    isPositive: false,
    oppositeId: "increase-armor",
    effects: [
      {
        metricId: "resistance-physical",
        effectType: "number-for-seconds",
        effectValue: { value: -1320, seconds: 36.6 },
      },
    ],
  },
  {
    id: "gradual-ravage-health",
    name: "Gradual Ravage Health",
    icon: "resources/crafting_poison_trait_dot.png",
    isPositive: false,
    oppositeId: "lingering-health",
    effects: [
      {
        metricId: "health-restore",
        effectType: "number-for-seconds",
        effectValue: { value: 954, seconds: 37.6 },
      },
    ],
  },
  {
    id: "heroism",
    name: "Heroism",
    icon: "resources/crafting_alchemy_trait_heroism.png",
    isPositive: true,
    oppositeId: "timidity",
    effects: [{ buffId: "minor-heroism", seconds: 36.6 }],
  },
  {
    id: "hindrance",
    name: "Hindrance",
    icon: "resources/crafting_alchemy_trait_reducespeed.png",
    isPositive: false,
    oppositeId: "speed",
    effects: [
      {
        metricId: "movement-speed",
        effectType: "fractional-change-for-seconds",
        effectValue: { value: -0.4, seconds: 36.6 },
      },
    ],
  },
  {
    id: "increase-armor",
    name: "Increase Physical Resistance",
    icon: "resources/crafting_alchemy_trait_increasearmor.png",
    isPositive: true,
    oppositeId: "fracture",
    effects: [
      {
        metricId: "target-physical-resistance",
        effectType: "number-for-seconds",
        effectValue: { value: -1320, seconds: 5.5 },
      },
      {
        metricId: "resistance-physical",
        effectType: "number-for-seconds",
        effectValue: { value: 1320, seconds: 5.5 },
      },
    ],
  },
  {
    id: "increase-spell-power",
    name: "Increase Spell Power",
    icon: "resources/crafting_alchemy_trait_increasespellpower.png",
    isPositive: true,
    oppositeId: "cowardice",
    effects: [{ buffId: "major-sorcery", seconds: 36.6 }],
  },
  {
    id: "increase-spell-resist",
    name: "Increase Spell Resistance",
    cooldown: 10,
    oppositeId: "breach",
    effects: [
      {
        metricId: "target-spell-resistance",
        effectType: "number-for-seconds",
        effectValue: { value: -1320, seconds: 5.5 },
      },
      {
        metricId: "resistance-spell",
        effectType: "number-for-seconds",
        effectValue: { value: 1320, seconds: 5.5 },
      },
    ],
  },
  {
    id: "increase-weapon-crit",
    name: "Increase Weapon Crit",
    icon: "resources/crafting_alchemy_trait_weaponcrit.png",
    isPositive: true,
    oppositeId: "enervation",
    effects: [{ buffId: "major-savagery", seconds: 36.6 }],
  },
  {
    id: "increase-weapon-power",
    name: "Increase Weapon Power",
    icon: "resources/crafting_alchemy_trait_increaseweaponpower.png",
    isPositive: true,
    oppositeId: "maim",
    effects: [{ buffId: "major-brutality", seconds: 36.6 }],
  },
  {
    id: "invisible",
    name: "Invisible",
    icon: "resources/crafting_alchemy_trait_invisible.png",
    isPositive: true,
    oppositeId: "detection",
    effects: [{ buffId: "vanish", seconds: 12 }],
  },
  {
    id: "lingering-health",
    name: "Lingering Health",
    icon: "resources/crafting_poison_trait_hot.png",
    isPositive: true,
    oppositeId: "gradual-ravage-health",
    effects: [
      {
        metricId: "health-restore",
        effectType: "number-for-seconds",
        effectValue: { value: 898, seconds: 13 },
      },
    ],
  },
  {
    id: "maim",
    name: "Maim",
    icon: "resources/crafting_alchemy_trait_lowerweaponpower.png",
    isPositive: false,
    oppositeId: "increase-weapon-power",
    effects: [{ debuffId: "minor-maim", seconds: 36.6 }],
  },
  {
    id: "protection",
    name: "Protection",
    icon: "resources/crafting_poison_trait_protection.png",
    isPositive: true,
    oppositeId: "vulnerability",
    effects: [{ buffId: "minor-protection", seconds: 12 }],
  },
  {
    id: "ravage-health",
    name: "Ravage Health",
    cooldown: 10,
    oppositeId: "restore-health",
    effects: [
      {
        metricId: "target-damage-taken-poison",
        effectType: "number-for-seconds",
        effectValue: { value: 1266, seconds: 5.5 },
      },
    ],
  },
  {
    id: "ravage-magicka",
    name: "Ravage Magicka",
    cooldown: 10,
    oppositeId: "restore-magicka",
    effects: [
      {
        metricId: "target-magicka-ability-cost",
        effectType: "fraction-change-for-seconds",
        effectValue: { value: 0.1, seconds: 10.5 },
      },
    ],
  },
  {
    id: "ravage-stamina",
    name: "Ravage Stamina",
    cooldown: 10,
    oppositeId: "restore-stamina",
    effects: [
      {
        metricId: "target-stamina-ability-cost",
        effectType: "fraction-change-for-seconds",
        effectValue: { value: 0.1, seconds: 10.5 },
      },
    ],
  },
  {
    id: "restore-health",
    name: "Restore Health",
    cooldown: 10,
    oppositeId: "ravage-health",
    effects: [
      {
        metricId: "target-damage-taken-poison",
        effectType: "number-for-seconds",
        effectValue: { value: 1266, seconds: 3.9 },
      },
      {
        metricId: "health-restore",
        effectType: "number-for-seconds",
        effectValue: { value: 1266, seconds: 3.9 },
      },
    ],
  },
  {
    id: "restore-magicka",
    name: "Restore Magicka",
    cooldown: 10,
    oppositeId: "ravage-magicka",
    effects: [
      {
        metricId: "target-magicka-ability-cost",
        effectType: "fraction-change-for-seconds",
        effectValue: { value: 0.1, seconds: 5.5 },
      },
      {
        metricId: "magicka-restore",
        effectType: "number-for-seconds",
        effectValue: { value: 238, seconds: 3.9 },
      },
    ],
  },
  {
    id: "restore-stamina",
    name: "Restore Stamina",
    cooldown: 10,
    oppositeId: "ravage-stamina",
    effects: [
      {
        metricId: "target-stamina-ability-cost",
        effectType: "fraction-change-for-seconds",
        effectValue: { value: 0.1, seconds: 5.5 },
      },
      {
        metricId: "stamina-restore",
        effectType: "number-for-seconds",
        effectValue: { value: 238, seconds: 5.5 },
      },
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "resources/crafting_alchemy_trait_speed.png",
    isPositive: true,
    oppositeId: "hindrance",
    effects: [{ buffId: "major-expedition", seconds: 12 }],
  },
  {
    id: "spell-critical",
    name: "Spell Critical",
    icon: "resources/crafting_alchemy_trait_spellcrit.png",
    isPositive: true,
    oppositeId: "uncertainty",
    effects: [{ buffId: "major-prophecy", seconds: 36.6 }],
  },
  {
    id: "timidity",
    name: "Timidity",
    icon: "resources/crafting_alchemy_trait_timidity.png",
    isPositive: false,
    oppositeId: "heroism",
    effects: [{ debuffId: "minor-timidity", seconds: 36.6 }],
  },
  {
    id: "uncertainty",
    name: "Uncertainty",
    icon: "resources/crafting_alchemy_trait_lowerspellcrit.png",
    isPositive: false,
    oppositeId: "spell-critical",
    effects: [{ debuffId: "minor-uncertainty", seconds: 36.6 }],
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    icon: "resources/crafting_alchemy_trait_unstoppable.png",
    isPositive: true,
    oppositeId: "entrapment",
    effects: [],
  },
  {
    id: "vitality",
    name: "Vitality",
    icon: "resources/crafting_poison_trait_increasehealing.png",
    isPositive: true,
    oppositeId: "defile",
    effects: [{ buffId: "major-vitality", seconds: 12 }],
  },
  {
    id: "vulnerability",
    name: "Vulnerability",
    icon: "resources/crafting_poison_trait_damage.png",
    isPositive: false,
    oppositeId: "protection",
    effects: [{ debuffId: "minor-vulnerability", seconds: 12 }],
  },
] as const satisfies readonly PoisonEffect[]

export type PoisonEffectId = (typeof TEMPER_POISON_EFFECTS)[number]["id"]
