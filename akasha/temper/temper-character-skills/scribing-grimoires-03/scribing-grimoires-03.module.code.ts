import type { GrimoireTemplate } from "../grimoire-template/grimoire-template.module.code.ts"

export const SCRIBING_GRIMOIRES_03 = {
  "torchbearer": {
    id: "torchbearer",
    name: "Torchbearer",
    icon: "/esoui/art/icons/item_grimoire_fightersguild.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
    skillLineId: "guild-fighters-guild",
    itemId: 204494,
    uespId: 10,
    compatibleFocusScripts: [
      "bleed-damage",
      "flame-damage",
      "frost-damage",
      "generate-ultimate",
      "healing",
      "knockback",
      "physical-damage",
      "stun",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "class-mastery",
      "druids-resurgence",
      "crusaders-defiance",
      "gladiators-tenacity",
      "warriors-opportunity",
    ],
    compatibleAffixScripts: [
      "savagery-and-prophecy",
      "resolve",
      "evasion",
      "vitality",
      "brutality-and-sorcery",
      "heroism",
      "cowardice",
      "mangle",
      "breach",
      "uncertainty",
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
        description:
          "Removes up to 1 negative effect with each sweep. This can occur once every 2 seconds per target.",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description: "Restores 200 Stamina with each sweep.",
      },
      "gladiators-tenacity": {
        scriptId: "gladiators-tenacity",
        description: "Reduces your damage taken by 30% for 2.2 seconds.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description: "Reduces the Movement Speed of enemies by 30% for 6 seconds.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 1180 Physical Damage over 20 seconds to enemies.",
      },
      "warriors-opportunity": {
        scriptId: "warriors-opportunity",
        description:
          "Increases your damage done to enemies affected with disabling effects by 10% for 6 seconds.",
      },
    },
    affixScripts: {
      "breach": {
        scriptId: "breach",
        description:
          "Afflicts Minor Breach for 20 seconds with each sweep, reducing Physical and Spell Resistance by 2974.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds with each sweep, increasing Weapon and Spell Damage by 20%.",
      },
      "cowardice": {
        scriptId: "cowardice",
        description:
          "Afflicts enemies with Minor Cowardice for 20 seconds with each sweep, reducing Weapon and Spell Damage by 215.",
      },
      "evasion": {
        scriptId: "evasion",
        description:
          "Grants Minor Evasion for 20 seconds with each sweep, reducing damage from area attacks by 10%.",
      },
      "heroism": {
        scriptId: "heroism",
        description:
          "Grants Minor Heroism for 20 seconds with each sweep, generating 1 Ultimate every 1.5 seconds.",
      },
      "mangle": {
        scriptId: "mangle",
        description:
          "Afflicts enemies with Minor Mangle for 20 seconds with each sweep, reducing Max Health by 10%.",
      },
      "resolve": {
        scriptId: "resolve",
        description:
          "Grants Minor Resolve for 20 seconds with each sweep, increasing Physical and Spell Resistance by 2974.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds with each sweep, increasing Weapon and Spell Critical rating by 2629.",
      },
      "uncertainty": {
        scriptId: "uncertainty",
        description:
          "Afflicts enemies with Minor Uncertainty for 20 seconds, reducing their Weapon and Spell Critical rating by 1314.",
      },
      "vitality": {
        scriptId: "vitality",
        description:
          "Grants Minor Vitality for 20 seconds with each sweep, increasing healing received and damage shield strength by 6%.",
      },
    },
  },
  "trample": {
    id: "trample",
    name: "Trample",
    icon: "/esoui/art/icons/item_grimoire_assault.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_assault.dds",
    skillLineId: "alliance-war-assault",
    itemId: 204495,
    uespId: 11,
    compatibleFocusScripts: [
      "dispel",
      "disease-damage",
      "frost-damage",
      "knockback",
      "magic-damage",
      "physical-damage",
      "stun",
      "trauma",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "immobilizing-strike",
      "assassins-misery",
      "class-mastery",
      "thiefs-swiftness",
      "wayfarers-mastery",
      "warriors-opportunity",
      "cavaliers-charge",
    ],
    compatibleAffixScripts: [
      "off-balance",
      "savagery-and-prophecy",
      "expedition",
      "brutality-and-sorcery",
      "protection",
      "heroism",
      "vulnerability",
      "cowardice",
      "mangle",
      "defile",
    ],
    signatureScripts: {
      "assassins-misery": {
        scriptId: "assassins-misery",
        description:
          "Afflicts enemies with the Concussion, Sundered, and Hemorrhaging status effects.",
      },
      "cavaliers-charge": {
        scriptId: "cavaliers-charge",
        description:
          "Increases the damage done by this ability as it travels outwards, increasing by 20% every 0.5 seconds.",
      },
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description:
          "Leave behind a field of caltrops for 10 seconds, dealing 45 Physical Damage every second and reducing enemy Movement Speed by 50%.",
      },
      "immobilizing-strike": {
        scriptId: "immobilizing-strike",
        description: "Immobilizes enemies for 3 seconds.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2080 Physical Damage over 20 seconds to enemies.",
      },
      "thiefs-swiftness": {
        scriptId: "thiefs-swiftness",
        description:
          "Leaves behind an area of speed for 10 seconds which increases the Movement Speed of you and your allies within by 15%.",
      },
      "warriors-opportunity": {
        scriptId: "warriors-opportunity",
        description:
          "Each enemy hit increases the damage to other enemies by 5%, stacking up to 20 times.",
      },
      "wayfarers-mastery": {
        scriptId: "wayfarers-mastery",
        description:
          "Adds 30 seconds to the duration of your existing Continuous Attack passive ability effect. This effect can occur once every 1 minute.",
      },
    },
    affixScripts: {
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
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
      "expedition": {
        scriptId: "expedition",
        description:
          "Grants you Major Expedition for 10 seconds, increasing Movement Speed by 30%.",
      },
      "heroism": {
        scriptId: "heroism",
        description:
          "Grants you Major Heroism for 10 seconds, generating 3 Ultimate every 1.5 seconds.",
      },
      "mangle": {
        scriptId: "mangle",
        description:
          "Afflicts enemies with Minor Mangle for 20 seconds, reducing Max Health by 10%.",
      },
      "off-balance": {
        scriptId: "off-balance",
        description: "Sets enemies Off Balance for 7 seconds.",
      },
      "protection": {
        scriptId: "protection",
        description: "Grants you Major Protection for 10 seconds, reducing damage taken by 10%.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
      "vulnerability": {
        scriptId: "vulnerability",
        description:
          "Afflicts enemies with Minor Vulnerability for 20 seconds, increasing damage taken by 5%.",
      },
    },
  },
  "banner-bearer": {
    id: "banner-bearer",
    name: "Banner Bearer",
    icon: "/esoui/art/icons/item_grimoire_support.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_support.dds",
    skillLineId: "alliance-war-support",
    itemId: 204496,
    uespId: 12,
    compatibleFocusScripts: [
      "flame-damage",
      "immobilize",
      "magic-damage",
      "mitigation",
      "multi-target",
      "physical-damage",
      "restore-resources",
      "shock-damage",
    ],
    compatibleSignatureScripts: [
      "class-mastery",
      "sages-remedy",
      "warmages-defense",
      "druids-resurgence",
      "thiefs-swiftness",
      "crusaders-defiance",
      "wayfarers-mastery",
      "cavaliers-charge",
    ],
    compatibleAffixScripts: [
      "savagery-and-prophecy",
      "resolve",
      "berserk",
      "brutality-and-sorcery",
      "protection",
      "courage",
      "heroism",
      "intellect-and-endurance",
    ],
    signatureScripts: {
      "cavaliers-charge": {
        scriptId: "cavaliers-charge",
        description:
          "Increase your Weapon and Spell Damage by 6 for every 1% bonus Movement Speed, up to a max of 450.",
      },
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse. This effect reapplies itself every 5 seconds.",
        classId: "necromancer",
      },
      "crusaders-defiance": {
        scriptId: "crusaders-defiance",
        description: "Reduce the effectiveness of negative snares by 30%.",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description:
          "Increases Health, Magicka, and Stamina Recovery of other group members by 139.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals for 336 Health every 2 seconds.",
      },
      "thiefs-swiftness": {
        scriptId: "thiefs-swiftness",
        description: "Reduce the cost of Sprint by 22%.",
      },
      "warmages-defense": {
        scriptId: "warmages-defense",
        description:
          "Grants a damage shield every 3 seconds for 3 seconds that absorbs up to 600 damage.",
      },
      "wayfarers-mastery": {
        scriptId: "wayfarers-mastery",
        description:
          "You count as being in a PvP area for Battle Resurrection, reducing the time it takes to resurrect another player.",
      },
    },
    affixScripts: {
      "berserk": {
        scriptId: "berserk",
        description: "Grants Minor Berserk, increasing damage done by 5%.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery, increasing Weapon and Spell Damage by 20%.",
      },
      "courage": {
        scriptId: "courage",
        description: "Grants Minor Courage, increasing Weapon and Spell Damage by 215.",
      },
      "heroism": {
        scriptId: "heroism",
        description: "Grants Minor Heroism, generating 1 Ultimate every 1.5 seconds.",
      },
      "intellect-and-endurance": {
        scriptId: "intellect-and-endurance",
        description:
          "Grants Minor Intellect and Minor Endurance, increasing Magicka and Stamina Recovery by 15%.",
      },
      "protection": {
        scriptId: "protection",
        description: "Grants Minor Protection, reducing damage taken by 5%.",
      },
      "resolve": {
        scriptId: "resolve",
        description: "Grants Minor Resolve, increasing Physical and Spell Resistance by 2974.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy, increasing Weapon and Spell Critical rating by 2629.",
      },
    },
  },
} as const satisfies Record<string, GrimoireTemplate>
