import type { CharacterSkillActivationData } from "../character-skill-activation-types/character-skill-activation-types.module.code.ts"
import type { SkillId } from "../character-skills/character-skills.module.code.ts"

const CHARACTER_SKILL_ACTIVATIONS = {
  "dark-flare": {
    descriptionTemplate:
      "Conjure a ball of solar energy to heave at an enemy, dealing $1 Magic Damage and increasing your damage done with class abilities by 5% for 10 seconds.\n\nAfflicts the target and enemies within 8 meters with Major Defile, reducing their healing received and damage shield strength by 12% for 4 seconds.\n \nAlso grants you Empower for 10 seconds, increasing the damage of your Heavy Attacks against monsters by 70%.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 1.1599 },
      },
    ],
  },
  "power-of-the-light": {
    descriptionTemplate:
      "Summon an expanding beam of pure sunlight to doom an enemy, dealing $1 Physical Damage immediately and marking them for 6 seconds.\n\nAfter the duration ends, the sunlight bursts, dealing $2 Physical Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to 200%.\n\nYou can have only one Power of the Light active at a time, and each hit of the ability applies the Sundered status effect.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "physical",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.542443 },
      },
      {
        "effectType": "damage",
        "damageType": "physical",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.600347 },
      },
    ],
  },
  "purifying-light": {
    descriptionTemplate:
      "Summon an expanding beam of pure sunlight to doom an enemy, dealing $1 Magic Damage immediately and marking them for 6 seconds.\n\nAfter the duration ends, the sunlight bursts, dealing $2 Magic Damage, which increases based on the amount of damage you dealt to them over the duration, up to 200%. Also heals you and nearby allies in the area for $3 Health every 2 seconds, over 10 seconds.\n\nYou can have only one Purifying Light at a time.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.542443 },
      },
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.600347 },
      },
      {
        "effectType": "heal",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.280328 },
      },
    ],
  },
  "radiant-glory": {
    descriptionTemplate:
      "Burn an enemy with a ray of holy fire, dealing $1 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 33% Health.\n\nYou heal for 15% of the damage inflicted.\n\nThis ability is considered direct damage.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 3.49369 },
      },
    ],
  },
  "radiant-oppression": {
    descriptionTemplate:
      "Burn an enemy with a ray of holy fire, dealing $1 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 40% Health.\n\nThis ability is considered direct damage.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 3.49369 },
      },
    ],
  },
  "reflective-light": {
    descriptionTemplate:
      "Blast up to three enemies with a charge of radiant heat, dealing $1 Flame Damage, an additional $2 Flame Damage over 20 seconds, and reducing their Movement Speed by 40% for 3 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "flame",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.560416 },
      },
      {
        "effectType": "damage",
        "damageType": "flame",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 1.62644 },
      },
    ],
  },
  "solar-barrage": {
    descriptionTemplate:
      "Conjure solar energy to blast enemies around you, dealing $1 Magic Damage every 2 seconds and increasing your damage done with class abilities by 5% for 20 seconds.\n\nWhile this ability is active you gain Empower, increasing the damage of your Heavy Attacks against monsters by 70%.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.203854 },
      },
    ],
  },
  "solar-disturbance": {
    descriptionTemplate:
      "Call down a fragment of the sun, dealing $1 Magic Damage every 1 second for 8 seconds to enemies in the area and applying Major Maim to them for 10 seconds, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Supernova synergy, dealing $2 Magic Damage to all enemies in the area and stunning them for 3 seconds.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.542443 },
      },
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 1.2166 },
      },
    ],
  },
  "solar-prison": {
    descriptionTemplate:
      "Call down a fragment of the sun, dealing $1 Magic Damage every 1 second for 8 seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Gravity Crush synergy, dealing $2 Magic Damage to all enemies in the area and stunning them for 5 seconds.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.560416 },
      },
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 2.43364 },
      },
    ],
  },
  "unstable-core": {
    descriptionTemplate:
      "Envelop an enemy in a lightless sphere for 4 seconds, that harms them with growing intensity anytime they deal direct damage. Limited to one.\n\nTheir first attack reduces their Movement Speed by 30% for 4 seconds and deals $1 Magic Damage, their second attack immobilizes them for 3 seconds and deals $2 Magic Damage, and their third attack stuns them for 3 seconds and deals $3 Magic Damage. The effects can activate once every 1 second.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.20975 },
      },
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.420555 },
      },
      {
        "effectType": "damage",
        "damageType": "magic",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.840748 },
      },
    ],
  },
  "vampires-bane": {
    descriptionTemplate:
      "Blast an enemy with a charge of radiant heat, dealing $1 Flame Damage, and an additional $2 Flame Damage over 30 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 30 seconds, increasing your Weapon and Spell Critical rating by 2629.",
    effects: [
      {
        "effectType": "damage",
        "damageType": "flame",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 0.542443 },
      },
      {
        "effectType": "damage",
        "damageType": "flame",
        "formula": { "type": "stat-scaling", "stat": "higher-resource", "coefficient": 2.52078 },
      },
    ],
  },
} as const satisfies Partial<Record<SkillId, CharacterSkillActivationData>>

export const characterSkillActivationData: Partial<Record<SkillId, CharacterSkillActivationData>> =
  CHARACTER_SKILL_ACTIVATIONS
