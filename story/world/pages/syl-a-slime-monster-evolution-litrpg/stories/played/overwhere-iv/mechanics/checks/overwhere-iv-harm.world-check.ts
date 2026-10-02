import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvHarm = {
  id: "01a0ed25-39ec-7bd3-8f78-ff33d0f43690",
  type: "page-type/world-check",
  slug: "overwhere-iv-harm",
  title: "Harm",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "how much harm a blow that landed in Overwhere IV deals, and what it leaves",
  description: "How badly a blow that landed hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an act has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light blow adds nothing, a solid one two, a heavy one four, a crushing one eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fist, a slime or a small beast is light; a blade, club or wolf's bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A great beast or a strong spell is heavy; a monster of a high tier crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Rift Rend is rending: it adds twelve and no ward stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rend laid clean through a neck or a heart is vital, and deals twice its harm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'A vital rend adds `"vital":true` to the reading; any other blow leaves it out.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rend through the throat silences its foe at once, whatever harm it deals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe folded onto a braced point takes the blow as heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe charging onto a braced point takes the blow as heavy too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held rend a foe runs into neck first is vital, as a rend laid clean through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Rift Rend laid along her own weapon and landed at a cost shears the weapon too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds three, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ward runs from nought to six: hide or leather one to two, mail three, plate five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala is spared against every foe but one the game master named mortal before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spared character is beaten back at one health, never downed by the blow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beaten back is a real setback: she is driven off, captured, robbed or shamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is mortal only where it is far beyond her and she chose to face it anyway.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Before she faces a mortal foe, the scene plainly shows her it could kill her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lasting injury is written as a condition, and heals as rest and healing allow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bruised clears after two nights' sleep, or at once under any healing magic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "While Bruised, acts that load the hurt limb take minus one; rest with it raised halves the time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The health left is written on the character's health page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"force":"solid","landed":"success","ward":0,"health":30,"spared":true}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's most health is 30 at Human LV 1, and five more for each racial level after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A common beast or a townsman has 8 to 15; a seasoned fighter 20 to 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A monster has about its level times three, and a boss of its kind twice that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of rest gives back two health; a night's sleep gives back ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Healing magic or a healing potion gives back what its maker's skill allows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One healing gives back up to twice its healer's Healer level in health, never past most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healing also ends Bruised and closes cuts and scrapes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought a character is down: dead if the foe meant it, else out of the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Health never shows as a number; the prose shows it as pain, blood and weariness.",
    },
  ],
} as const satisfies WorldCheck
