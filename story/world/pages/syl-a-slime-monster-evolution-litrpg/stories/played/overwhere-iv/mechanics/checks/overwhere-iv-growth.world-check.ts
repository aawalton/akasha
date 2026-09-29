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
      statement:
        "A deed of note gives five to twenty: a quest done, a town saved, a first discovery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each defeat shows as: <Goblin LV 4 defeated. Experience gained.>",
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
        "The offer lists basic classes that fit her deeds, such as Mage, Scout or Warrior.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Riftmancer is offered once a class of hers and Dimension Magic both reach LV 10.",
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
      statement: "Each Dimension Magic level adds ten paces of reach and three most mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At Dimension Magic LV 1 she can cast Blink and Rift Rend, once she finds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At LV 3 she finds Spatial Sense, at LV 4 Personal Rift, at LV 5 Rift Beacon.",
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
  ],
} as const satisfies WorldCheck
