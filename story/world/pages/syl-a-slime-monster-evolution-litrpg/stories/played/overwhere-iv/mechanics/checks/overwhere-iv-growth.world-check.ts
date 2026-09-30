import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvGrowth = {
  id: "01a0ed26-8ee1-78a0-ba7d-9ce34212115a",
  type: "page-type/world-check",
  slug: "overwhere-iv-growth",
  title: "Growth",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition:
    "how far experience and practice raise a character's levels and skills in Overwhere IV",
  description: "How much stronger fighting and practice have made someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Growth is settled with no dice, once a turn, when a foe fell or a skill was used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe she defeats gives its level in experience, twice that if at or over hers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe under half her level gives one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill is priced at the level she holds when it falls, not at the turn's start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harmless pest that makes no fight gives one, whatever its level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deed of note gives five to twenty: a quest done, a town saved, a first discovery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each defeat shows as: <Goblin LV 4 defeated. Experience gained.>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A defeat window names the foe's kind and level to anyone, Identify or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a fallen foe is named so; a living one's level needs Identify.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level takes ten times the level she is at in experience.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Without a class all experience goes to her race.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With a class, experience splits half to race and half to class unless she sets it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A split gives race the odd point, and is read as two gains: track race, track class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A revealed skill is held only once bought, and is then filed as held at LV 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A racial level earns a Trait Point and a class level a Skill Point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every tenth level earns one point more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A racial level shows as: <Racial Experience threshold reached. Human is now LV 2.>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class level shows as: <Class Experience threshold reached. Mage is now LV 2.>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her first class is offered after her first real fight is won.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A real fight puts her in danger; culling harmless pests like common slimes is none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight is won once every foe has fallen, yielded or fled, and she holds the field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe that flees gives no experience; a deed the fight saved still counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill she lacks is gained after three earnest uses of it, at LV 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill gained shows as: <New skill acquired: [Spearmanship LV 1].>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The offer lists basic classes that fit her deeds, such as Mage, Scout or Warrior.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A first fight won by a spell folded into a weapon's blow adds Spellblade to the offer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The offer shows as: <Class options available: [Warrior] [Mage] [Spellblade].>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Riftmancer is offered once she holds a class and Dimension Magic reaches LV 5.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A class taken shows as: <Class acquired: [Spellblade LV 1].> and earns a Skill Point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A class taken writes her class held, and class level and experience pages, at 1 and 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Spellblade LV 1 reveals [Spellstrike] and [Blade Ward], each bought for a Skill Point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reveal shows as: <Your class has revealed the following skill: [Spellstrike].>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Spellstrike takes two off a spell worked through a weapon's blow, to no less than one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Blade Ward turns one blow a cast, taking half its harm, for 3 mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class of any tier levels at the rate this check states for every class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill rises by earnest uses: one scene where it bore on an outcome that mattered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use under real danger, or the first use of a new spell, counts twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Hours of steady practice with a skill count as one use, however many casts they hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Practice counts only once a day for each skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From LV 1 a skill takes 2, 3, 3, 4, 4, 5, 6, 8 and 10 uses for each next level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "LV 10 is shown as LV MAX; raising it past that costs ten points of its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rise shows as: <Proficiency gained. [Blink LV 1] improved to [Blink LV 2].>",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Dimension Magic level adds ten paces of reach and three to her most mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At Dimension Magic LV 1 she can cast Blink and Rift Rend, once she finds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "She finds Blink the first time she tries to fold herself rather than a thing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "She finds Rift Rend the first time she tries to fold one part of a thing from the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Folding things toward her or away finds neither spell, however long she practises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At LV 3 she finds Spatial Sense, and at LV 5 Rift Beacon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Personal Rift comes with the Riftmancer class, and to no one without it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At LV 7 she can open a rift to a beacon she set, as far as the beacon lies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell found shows as: <New spell learned: [Blink].> and is filed as held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A first deed the world has never seen earns one Legend Point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","gains":[{"kind":"experience","track":"race",...}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An experience or level page's slug ends in its track: race or class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An experience page's most is what the next level takes, as this check states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience and levels rise only as this check answers, and a level spends it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her status shows the race level as Human LV 2, and a class as Mage LV 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A townsman is race LV 5 to 15; a guard or hunter 15 to 30; a gold adventurer 30 up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in experience or level is written with a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Experience never shows as a number; the System says only: Experience gained.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An evolution or a change of race writes the new species held.",
    },
  ],
} as const satisfies WorldCheck
