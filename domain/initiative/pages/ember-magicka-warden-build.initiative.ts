import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberMagickaWardenBuild = {
  id: "01a0de47-b798-7ab0-85e3-167e35639195",
  type: "page-type/initiative",
  slug: "ember-magicka-warden-build",
  domain: "domain/temper-player",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "Alan has a Warden character for this build.",
      workingMemory:
        "The build is the pure class Magicka Warden from Hyperioxes, in the No Trial Gear setup with medium armor. Hyperioxes simulates it at 172.1k DPS on the 21M Iron Atronach dummy on Update 50. https://hyperioxes.com/eso/dps/magicka-warden-build",
    },
    {
      statement: "The Warden has no subclass skill line.",
      workingMemory:
        "Subclassing turns Class Mastery off, and the build depends on Class Mastery. The class lines are Animal Companions, Green Balance and Winter's Embrace.",
    },
    {
      statement: "The Warden's Class Mastery is Wild Adaptation and Glacial Obstinance.",
    },
    {
      statement: "The Warden has every racial passive.",
      workingMemory:
        "The guide says to get every racial passive whatever the race is. The guide names no race.",
    },
    {
      statement: "The Warden has the Light Armor passives the build takes.",
      workingMemory:
        "Grace at low rank. Evocation, Spell Warding, Prodigy and Concentration at high rank.",
    },
    {
      statement: "The Warden has the Medium Armor passives the build takes.",
      workingMemory:
        "Dexterity, Wind Walker, Agility and Athletics at high rank. Improved Sneak is not needed.",
    },
    {
      statement: "Traveling Knife is scribed with Frost, Assassin's Misery and Berserk.",
    },
    {
      statement:
        "Ulfsild's Contingency is scribed with Frost, Lingering Torment, and Intellect and Endurance.",
    },
    {
      statement: "The front bar holds the build's five skills and Wild Guardian.",
      workingMemory:
        "Traveling Knife, Subterranean Assault, Ulfsild's Contingency, Barbed Trap and Cutting Dive, with Wild Guardian as the ultimate.",
    },
    {
      statement: "The back bar holds the build's five skills and Wild Guardian.",
      workingMemory:
        "Winter's Revenge, Arctic Blast, Lotus Blossom, Stampede and Blue Betty, with Wild Guardian as the ultimate.",
    },
    {
      statement: "The Warden wears a medium Slimecraw helm.",
      workingMemory:
        "Slimecraw is the monster set from Wayrest Sewers I. The helm is Divines with a Magicka glyph.",
    },
    {
      statement:
        "The Warden wears Highland Sentinel on the shoulders, the chest, the legs, the feet and one ring.",
      workingMemory:
        "Highland Sentinel is crafted. The four armor pieces are medium, Divines, with Magicka glyphs. The ring is Bloodthirsty with an Increase Magical Harm glyph.",
    },
    {
      statement:
        "The Warden wears Aerie's Cry on the hands, the waist, the neck and both front bar daggers.",
      workingMemory:
        "Aerie's Cry is the Warden class set from the Infinite Archive. The hands and the waist are light, Divines, with Magicka glyphs. The necklace is Bloodthirsty with an Increase Magical Harm glyph. Both daggers are Charged, the main hand with a Poison glyph and the off hand with a Flame glyph.",
    },
    {
      statement: "The Warden wears the Shattered Paths Signet as the second ring.",
      workingMemory:
        "The ring is Bloodthirsty with an Increase Magical Harm glyph. The guide does not say where the Signet drops.",
    },
    {
      statement: "The back bar is a Merciless Charge greatsword.",
      workingMemory:
        "The greatsword is Infused with a Weapon Damage glyph. The guide does not say where Merciless Charge drops.",
    },
    {
      statement: "Exploiter is slotted in place of Fighting Finesse.",
      workingMemory:
        "The guide states no other Champion Point, and no mundus, attributes or food for this setup.",
    },
    {
      statement: "Alan casts the build's five pre-buffs before each pull.",
      workingMemory:
        "Lotus Blossom, Blue Betty, Subterranean Assault, Arctic Blast and Ulfsild's Contingency can be cast before combat.",
    },
    {
      statement: "Alan plays the build's priority rotation.",
      workingMemory:
        "Recast each skill as it expires. Where several expire together the order is: Wild Guardian's active only as the fight ends, Blue Betty, Stampede, Lotus Blossom, Winter's Revenge, Subterranean Assault, Ulfsild's Contingency, Barbed Trap, Cutting Dive, the Traveling Knife debuff, Arctic Blast, then Traveling Knife as the spammable. The guide's static rotation is 7.7% weaker.",
    },
    {
      statement: "Alan's Warden parses close to 172k DPS on the 21M dummy.",
    },
  ],
  constraints: ["Update 51 changes Mundus Stones, buffs and class passives on September 28, 2026."],
} as const satisfies Initiative
