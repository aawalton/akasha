import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIGrowth = {
  id: "01a0ed25-0488-7ca5-9f1f-ce7b5dcf8170",
  type: "page-type/world-check",
  slug: "overwhere-i-growth",
  title: "Growth",
  world: "world/hell-hound-evolution-litrpg",
  definition: "how far a deed raises a character's level, skills and legacy in Overwhere I",
  description: "How much stronger what someone did has made them.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is settled with no dice, in the turn the deed that earns it is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power is never handed out: growth comes only from what she does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No turn grows her for passing, resting or merely being there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill earns marks by the foe's level against her own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe five or more above her earns three, one at or above her level two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe up to five below her earns one, and a foe further below earns none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill earning none shows: No Experience Gained.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level takes marks one more than the level she is at, and spends them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each level gives Strength two, Dexterity two, Vigor two, Attunement four, Luck one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kill shows Foe Eliminated!, Prey Eliminated! or Great Foe Eliminated!, then Experience Gained!",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill counts uses since it last rose; a use is one where it bore on what mattered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill rises one level when its uses reach twice its level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use in a new way raises it once its uses reach its level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill tops out at level ten, and its uses start again at nought when it rises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rise gives three to the skill's stat; Starfall Surge's stat is Attunement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rise shows: Starfall Surge Leveled Up! 1 > 2, then +3 Attunement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A legacy rises a rank for a kill or feat ten levels per rank above her own level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A legacy tops out at rank five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rank adds ten to each element's reserve and one new way to use the legacy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder names each new way the legacy gives when it comes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settled by `akasha story settle --story overwhere-i --check overwhere-i-growth`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","gains":[{"kind":"level","level":1,"marks":0,"foeLevel":3}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill gain names skill, level, uses and novel; a legacy gain rank, level, featLevel.",
    },
  ],
} as const satisfies WorldCheck
