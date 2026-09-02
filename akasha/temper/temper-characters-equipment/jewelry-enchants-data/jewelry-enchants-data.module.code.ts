import type {
  JewelryEnchantQualityComponents,
  JewelryEnchantTemplate,
} from "../jewelry-enchants/jewelry-enchants.module.code.ts"

export const TEMPER_JEWELRY_ENCHANTS_BY_ID = {
  "no-enchant": {
    id: "no-enchant" as const,
    name: "No Enchant",
    glyphName: "",
    essenceRune: "",
    effect: "",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  },
  "increase-physical-harm": {
    id: "increase-physical-harm" as const,
    name: "Increase Physical Harm",
    glyphName: "Glyph of Increase Physical Harm",
    essenceRune: "Taderi",
    effect: "Increases Weapon and Spell Damage",
    effects: [
      { metricId: "power-weapon" as const, effectType: "integer" as const, effectValue: 174 },
      { metricId: "power-spell" as const, effectType: "integer" as const, effectValue: 174 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE",
  },
  "increase-magical-harm": {
    id: "increase-magical-harm" as const,
    name: "Increase Magical Harm",
    glyphName: "Glyph of Increase Magical Harm",
    essenceRune: "Makderi",
    effect: "Increases Weapon and Spell Damage",
    effects: [
      { metricId: "power-weapon" as const, effectType: "integer" as const, effectValue: 174 },
      { metricId: "power-spell" as const, effectType: "integer" as const, effectValue: 174 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE",
  },
  "magicka-recovery": {
    id: "magicka-recovery" as const,
    name: "Magicka Recovery",
    glyphName: "Glyph of Magicka Recovery",
    essenceRune: "Makkoma",
    effect: "Increases Magicka Recovery",
    effects: [
      { metricId: "magicka-recovery" as const, effectType: "integer" as const, effectValue: 169 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN",
  },
  "stamina-recovery": {
    id: "stamina-recovery" as const,
    name: "Stamina Recovery",
    glyphName: "Glyph of Stamina Recovery",
    essenceRune: "Denima",
    effect: "Increases Stamina Recovery",
    effects: [
      { metricId: "stamina-recovery" as const, effectType: "integer" as const, effectValue: 169 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN",
  },
  "health-recovery": {
    id: "health-recovery" as const,
    name: "Health Recovery",
    glyphName: "Glyph of Health Recovery",
    essenceRune: "Okoma",
    effect: "Increases Health Recovery",
    effects: [
      { metricId: "health-recovery" as const, effectType: "integer" as const, effectValue: 169 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN",
  },
  "prismatic-recovery": {
    id: "prismatic-recovery" as const,
    name: "Prismatic Recovery",
    glyphName: "Glyph of Prismatic Recovery",
    essenceRune: "Indeko",
    effect: "Increases Health, Magicka, and Stamina Recovery",
    effects: [
      { metricId: "health-recovery" as const, effectType: "integer" as const, effectValue: 84 },
      { metricId: "magicka-recovery" as const, effectType: "integer" as const, effectValue: 84 },
      { metricId: "stamina-recovery" as const, effectType: "integer" as const, effectValue: 84 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN",
  },
  "reduce-spell-cost": {
    id: "reduce-spell-cost" as const,
    name: "Reduce Spell Cost",
    glyphName: "Glyph of Reduce Spell Cost",
    essenceRune: "Makderi",
    effect: "Reduces Magicka ability cost",
    effects: [
      {
        metricId: "magicka-ability-cost" as const,
        effectType: "integer" as const,
        effectValue: -203,
      },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST",
  },
  "reduce-feat-cost": {
    id: "reduce-feat-cost" as const,
    name: "Reduce Feat Cost",
    glyphName: "Glyph of Reduce Feat Cost",
    essenceRune: "Taderi",
    effect: "Reduces Stamina ability cost",
    effects: [
      {
        metricId: "stamina-ability-cost" as const,
        effectType: "integer" as const,
        effectValue: -203,
      },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST",
  },
  "reduce-skill-cost": {
    id: "reduce-skill-cost" as const,
    name: "Reduce Skill Cost",
    glyphName: "Glyph of Reduce Skill Cost",
    essenceRune: "Indeko",
    effect: "Reduces Magicka and Stamina ability cost",
    effects: [
      {
        metricId: "magicka-ability-cost" as const,
        effectType: "integer" as const,
        effectValue: -135,
      },
      {
        metricId: "stamina-ability-cost" as const,
        effectType: "integer" as const,
        effectValue: -135,
      },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER",
  },
  "flame-resist": {
    id: "flame-resist" as const,
    name: "Flame Resist",
    glyphName: "Glyph of Flame Resist",
    essenceRune: "Rakeipa",
    effect: "Increases Flame Resistance",
    effects: [
      { metricId: "resistance-flame" as const, effectType: "integer" as const, effectValue: 927 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT",
  },
  "frost-resist": {
    id: "frost-resist" as const,
    name: "Frost Resist",
    glyphName: "Glyph of Frost Resist",
    essenceRune: "Dekeipa",
    effect: "Increases Frost Resistance",
    effects: [
      { metricId: "resistance-frost" as const, effectType: "integer" as const, effectValue: 927 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT",
  },
  "shock-resist": {
    id: "shock-resist" as const,
    name: "Shock Resist",
    glyphName: "Glyph of Shock Resist",
    essenceRune: "Meip",
    effect: "Increases Shock Resistance",
    effects: [
      { metricId: "resistance-shock" as const, effectType: "integer" as const, effectValue: 927 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT",
  },
  "poison-resist": {
    id: "poison-resist" as const,
    name: "Poison Resist",
    glyphName: "Glyph of Poison Resist",
    essenceRune: "Kuoko",
    effect: "Increases Poison Resistance",
    effects: [
      { metricId: "resistance-poison" as const, effectType: "integer" as const, effectValue: 927 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_POISON_RESISTANT",
  },
  "disease-resist": {
    id: "disease-resist" as const,
    name: "Disease Resist",
    glyphName: "Glyph of Disease Resist",
    essenceRune: "Haoko",
    effect: "Increases Disease Resistance",
    effects: [
      { metricId: "resistance-disease" as const, effectType: "integer" as const, effectValue: 927 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT",
  },
  "decrease-physical-harm": {
    id: "decrease-physical-harm" as const,
    name: "Decrease Physical Harm",
    glyphName: "Glyph of Decrease Physical Harm",
    essenceRune: "Taderi",
    effect: "Increases Physical Resistance",
    effects: [
      {
        metricId: "resistance-physical" as const,
        effectType: "integer" as const,
        effectValue: 927,
      },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE",
  },
  "decrease-spell-harm": {
    id: "decrease-spell-harm" as const,
    name: "Decrease Spell Harm",
    glyphName: "Glyph of Decrease Spell Harm",
    essenceRune: "Makderi",
    effect: "Increases Spell Resistance",
    effects: [
      { metricId: "resistance-spell" as const, effectType: "integer" as const, effectValue: 927 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE",
  },
  "bashing": {
    id: "bashing" as const,
    name: "Bashing",
    glyphName: "Glyph of Bashing",
    essenceRune: "Taderi",
    effect: "Increases Bash Damage",
    effects: [
      { metricId: "bash-damage" as const, effectType: "integer" as const, effectValue: 500 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_BASH_DAMAGE",
  },
  "bracing": {
    id: "bracing" as const,
    name: "Bracing",
    glyphName: "Glyph of Bracing",
    essenceRune: "Kaderi",
    effect: "Reduces Block Cost",
    effects: [
      {
        metricId: "stamina-block-cost" as const,
        effectType: "integer" as const,
        effectValue: -203,
      },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH",
  },
  "potion-boost": {
    id: "potion-boost" as const,
    name: "Potion Boost",
    glyphName: "Glyph of Potion Boost",
    essenceRune: "Oru",
    effect: "Increases Potion Effect Duration",
    effects: [
      { metricId: "potion-duration" as const, effectType: "integer" as const, effectValue: 36 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_POTION_EFFECTIVENESS",
  },
  "potion-speed": {
    id: "potion-speed" as const,
    name: "Potion Speed",
    glyphName: "Glyph of Potion Speed",
    essenceRune: "Oru",
    effect: "Reduces Potion Cooldown",
    effects: [
      { metricId: "potion-cooldown" as const, effectType: "integer" as const, effectValue: -50 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POTION_COOLDOWN",
  },
} as const satisfies Record<string, JewelryEnchantTemplate>

export const TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES = {
  "increase-physical-harm": {
    "harm": { normal: 134, fine: 141, superior: 153, epic: 160, legendary: 174 },
  },
  "increase-magical-harm": {
    "harm": { normal: 134, fine: 141, superior: 153, epic: 160, legendary: 174 },
  },
  "magicka-recovery": {
    "recovery": { normal: 121, fine: 133, superior: 145, epic: 157, legendary: 169 },
  },
  "stamina-recovery": {
    "recovery": { normal: 121, fine: 133, superior: 145, epic: 157, legendary: 169 },
  },
  "health-recovery": {
    "recovery": { normal: 121, fine: 133, superior: 145, epic: 157, legendary: 169 },
  },
  "prismatic-recovery": {
    "prismatic-recovery": { normal: 67, fine: 71, superior: 75, epic: 80, legendary: 84 },
  },
  "reduce-spell-cost": {
    "reduce-cost": { normal: 154, fine: 167, superior: 179, epic: 191, legendary: 203 },
  },
  "reduce-feat-cost": {
    "reduce-cost": { normal: 154, fine: 167, superior: 179, epic: 191, legendary: 203 },
  },
  "reduce-skill-cost": {
    "reduce-skill-cost": { normal: 103, fine: 111, superior: 119, epic: 127, legendary: 135 },
  },
  "flame-resist": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "frost-resist": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "shock-resist": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "poison-resist": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "disease-resist": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "decrease-physical-harm": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "decrease-spell-harm": {
    "resistance": { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
  "bashing": { "bashing": { normal: 422, fine: 442, superior: 461, epic: 481, legendary: 500 } },
  "bracing": {
    "bracing": { normal: -154, fine: -167, superior: -179, epic: -191, legendary: -203 },
  },
  "potion-boost": {
    "potion-boost": { normal: 31, fine: 32, superior: 33, epic: 35, legendary: 36 },
  },
  "potion-speed": {
    "potion-speed": { normal: -10, fine: -20, superior: -30, epic: -40, legendary: -50 },
  },
} as const satisfies Record<string, JewelryEnchantQualityComponents>
