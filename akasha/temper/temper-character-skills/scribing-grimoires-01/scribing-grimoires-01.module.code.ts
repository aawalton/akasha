import type { GrimoireTemplate } from "../grimoire-template/grimoire-template.module.code.ts"

export const SCRIBING_GRIMOIRES_01 = {
  "smash": {
    id: "smash",
    name: "Smash",
    icon: "/esoui/art/icons/item_grimoire_2hander.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_2handed.dds",
    skillLineId: "weapon-two-handed",
    itemId: 204487,
    uespId: 4,
    compatibleFocusScripts: [
      "bleed-damage",
      "damage-shield",
      "healing",
      "knockback",
      "magic-damage",
      "physical-damage",
      "poison-damage",
      "stun",
      "taunt",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "leeching-thirst",
      "immobilizing-strike",
      "class-mastery",
      "sages-remedy",
      "druids-resurgence",
      "crusaders-defiance",
      "fencers-parry",
      "wayfarers-mastery",
    ],
    compatibleAffixScripts: [
      "interrupt",
      "savagery-and-prophecy",
      "expedition",
      "vitality",
      "berserk",
      "brutality-and-sorcery",
      "force",
      "maim",
      "mangle",
      "breach",
    ],
    signatureScripts: {
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "crusaders-defiance": {
        scriptId: "crusaders-defiance",
        description: "Removes and grants immunity to snares and immobilizations for 4 seconds.",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description: "Restores 1200 Stamina over 10 seconds.",
      },
      "fencers-parry": {
        scriptId: "fencers-parry",
        description:
          "Deflects the next direct damage attack made against you within 3 seconds. This can occur once every 3 seconds.",
      },
      "immobilizing-strike": {
        scriptId: "immobilizing-strike",
        description: "Immobilizes enemies for 3 seconds.",
      },
      "leeching-thirst": {
        scriptId: "leeching-thirst",
        description: "Heals you for 35% of the damage done.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2980 Physical Damage over 20 seconds to enemies.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals for 1790 Health over 10 seconds.",
      },
      "wayfarers-mastery": {
        scriptId: "wayfarers-mastery",
        description: "Grants you the bonus of the Follow Up passive ability.",
      },
    },
    affixScripts: {
      "berserk": {
        scriptId: "berserk",
        description: "Grants Minor Berserk for 20 seconds, increasing damage done by 5%.",
      },
      "breach": {
        scriptId: "breach",
        description:
          "Afflicts enemies with Minor Breach for 20 seconds, reducing Physical and Spell Resistance by 2974.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "expedition": {
        scriptId: "expedition",
        description: "Grants Minor Expedition for 20 seconds, increasing Movement Speed by 15%.",
      },
      "force": {
        scriptId: "force",
        description: "Grants Minor Force for 20 seconds, increasing Critical Damage by 10%.",
      },
      "interrupt": { scriptId: "interrupt", description: "Interrupts enemies that are casting." },
      "maim": {
        scriptId: "maim",
        description: "Afflicts enemies with Minor Maim for 20 seconds, reducing damage done by 5%.",
      },
      "mangle": {
        scriptId: "mangle",
        description:
          "Afflicts enemies with Minor Mangle for 20 seconds, reducing Max Health by 10%.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
      "vitality": {
        scriptId: "vitality",
        description:
          "Grants Minor Vitality for 20 seconds, increasing healing received and damage shield strength by 6%.",
      },
    },
  },
  "elemental-explosion": {
    id: "elemental-explosion",
    name: "Elemental Explosion",
    icon: "/esoui/art/icons/item_grimoire_staffdestro.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
    skillLineId: "weapon-destruction-staff",
    itemId: 204488,
    uespId: 5,
    compatibleFocusScripts: [
      "dispel",
      "flame-damage",
      "frost-damage",
      "knockback",
      "magic-damage",
      "physical-damage",
      "shock-damage",
      "stun",
      "trauma",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "immobilizing-strike",
      "assassins-misery",
      "class-mastery",
      "warmages-defense",
      "druids-resurgence",
    ],
    compatibleAffixScripts: [
      "off-balance",
      "savagery-and-prophecy",
      "brutality-and-sorcery",
      "cowardice",
      "enervation",
      "lifesteal",
      "defile",
      "brittle",
      "magickasteal",
    ],
    signatureScripts: {
      "assassins-misery": {
        scriptId: "assassins-misery",
        description: "Afflicts enemies with Burning, Chill, and Concussion.",
      },
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description: "Restores 470 Magicka to you per enemy hit.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description:
          "Create a field of distortion under the first enemy hit for 6 seconds, reducing the Movement Speed of enemies inside by 40%.",
      },
      "immobilizing-strike": {
        scriptId: "immobilizing-strike",
        description: "Immobilizes enemies for 3 seconds.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2980 Magic Damage over 20 seconds to enemies.",
      },
      "warmages-defense": {
        scriptId: "warmages-defense",
        description:
          "If an enemy was hit, grants you a damage shield that absorbs 2055 damage for 6 seconds. Each additional enemy hit increases the shield's strength by 20%.",
      },
    },
    affixScripts: {
      "brittle": {
        scriptId: "brittle",
        description:
          "Afflicts enemies with Minor Brittle for 20 seconds, increasing their Critical Damage taken by 10%.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "If an enemy was hit, grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "cowardice": {
        scriptId: "cowardice",
        description:
          "Afflicts enemies with Minor Cowardice for 20 seconds, reducing Weapon and Spell Damage by 215.",
      },
      "defile": {
        scriptId: "defile",
        description:
          "Afflicts enemies with Minor Defile, which reduces healing received and damage shield strength by 6% for 20 seconds.",
      },
      "enervation": {
        scriptId: "enervation",
        description:
          "Afflicts enemies with Minor Enervation for 20 seconds, reducing Critical Damage by 10%.",
      },
      "lifesteal": {
        scriptId: "lifesteal",
        description:
          "Afflicts enemies with Minor Lifesteal for 20 seconds, healing attackers for 600 Health every 1 second.",
      },
      "magickasteal": {
        scriptId: "magickasteal",
        description:
          "Afflicts enemies with Minor Magickasteal for 20 seconds, restoring 168 Magicka to attackers every 1 second.",
      },
      "off-balance": {
        scriptId: "off-balance",
        description: "Sets enemies Off Balance for 7 seconds.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
    },
  },
  "menders-bond": {
    id: "menders-bond",
    name: "Mender's Bond",
    icon: "/esoui/art/icons/item_grimoire_staffresto.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
    skillLineId: "weapon-restoration-staff",
    itemId: 204489,
    uespId: 6,
    compatibleFocusScripts: [
      "damage-shield",
      "generate-ultimate",
      "healing",
      "immobilize",
      "magic-damage",
      "mitigation",
      "restore-resources",
    ],
    compatibleSignatureScripts: [
      "hunters-snare",
      "knights-valor",
      "class-mastery",
      "sages-remedy",
      "warmages-defense",
      "druids-resurgence",
      "crusaders-defiance",
    ],
    compatibleAffixScripts: [
      "evasion",
      "vitality",
      "empower",
      "protection",
      "courage",
      "heroism",
      "intellect-and-endurance",
      "force",
      "vulnerability",
      "maim",
      "breach",
      "brittle",
    ],
    signatureScripts: {
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "crusaders-defiance": {
        scriptId: "crusaders-defiance",
        description: "Grants immunity to disabling effects for 3 seconds to the ally.",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description:
          "Restores 80 Magicka and 80 Stamina every 1 second for 5 seconds to the ally and other allies when they leave the link.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description: "Reduces the Movement Speed of enemies in the link by 30% for 2 seconds.",
      },
      "knights-valor": {
        scriptId: "knights-valor",
        description:
          "Increases Block amount by 8% and reduces Block cost by 8% for the ally and other allies in the link.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description:
          "Heals the ally and other allies when they leave the link for 1428 Health over 5 seconds.",
      },
      "warmages-defense": {
        scriptId: "warmages-defense",
        description:
          "Grants a damage shield when other allies leave the link that absorbs 1279 damage for 6 seconds.",
      },
    },
    affixScripts: {
      "breach": {
        scriptId: "breach",
        description:
          "Afflicts Minor Breach to enemies in the link for 10 seconds, reducing Physical and Spell Resistance by 2974.",
      },
      "brittle": {
        scriptId: "brittle",
        description:
          "Afflicts Minor Brittle to enemies in the link for 10 seconds, increasing their Critical Damage taken by 10%.",
      },
      "courage": {
        scriptId: "courage",
        description:
          "Grants Minor Courage to the ally and allies in the link for 10 seconds, increasing Weapon and Spell Damage by 215.",
      },
      "empower": {
        scriptId: "empower",
        description:
          "Grants Empower to the ally and allies in the link for 10 seconds, increasing the damage of Heavy Attacks against monsters by 70%.",
      },
      "evasion": {
        scriptId: "evasion",
        description:
          "Grants Minor Evasion to the ally and allies in the link for 10 seconds, reducing damage from area attacks by 10%.",
      },
      "force": {
        scriptId: "force",
        description:
          "Grants Minor Force to the ally and allies in the link for 10 seconds, increasing Critical Damage by 10%.",
      },
      "heroism": {
        scriptId: "heroism",
        description:
          "Grants Minor Heroism to the ally and allies in the link for 10 seconds, generating 1 Ultimate every 1.5 seconds.",
      },
      "intellect-and-endurance": {
        scriptId: "intellect-and-endurance",
        description:
          "Grants Minor Intellect and Minor Endurance to the ally and allies in the link for 10 seconds, increasing Magicka and Stamina Recovery by 15%.",
      },
      "maim": {
        scriptId: "maim",
        description:
          "Afflicts Minor Maim to enemies in the link for 10 seconds, reducing damage done by 5%.",
      },
      "protection": {
        scriptId: "protection",
        description:
          "Grants Minor Protection to the ally and allies in the link for 10 seconds, reducing damage taken by 5%.",
      },
      "vitality": {
        scriptId: "vitality",
        description:
          "Grants Minor Vitality to the ally and allies in the link for 10 seconds, increasing healing received and damage shield strength by 6%.",
      },
      "vulnerability": {
        scriptId: "vulnerability",
        description:
          "Afflicts Minor Vulnerability to enemies in the link for 10 seconds, increasing damage taken by 5%.",
      },
    },
  },
} as const satisfies Record<string, GrimoireTemplate>
