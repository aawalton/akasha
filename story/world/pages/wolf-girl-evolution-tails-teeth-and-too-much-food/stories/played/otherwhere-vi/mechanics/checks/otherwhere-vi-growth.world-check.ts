import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViGrowth = {
  id: "01a0ea43-7073-7049-816d-623f05116bb3",
  type: "page-type/world-check",
  slug: "otherwhere-vi-growth",
  title: "Growth",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  definition: "how many levels a kill, a meal or a feat brings a character in Otherwhere VI",
  description: "How far a kill or a feat carries someone toward the next level.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is settled with no dice whenever a kill, a strong meal or a feat lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading states her Tier, level, level cap and progress, and each gain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Gains in one reading settle in order, each from the level and progress the one before left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Power is a creature's level, plus 10 at Tier 1, 35 at Tier 2, 85 at 3 and 185 at 4.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill gives the prey's power less hers plus five, from nought up to twelve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named monster's kill gives three times as much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill shared in a fight is split evenly among those who shared it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Eating a strong beast's meat gives a quarter of what its kill would, once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feat the System marks, a first survival or a hard lesson, gives one to five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The next level costs four plus the level she is at, times one more than her Tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At the level cap growth stops and what is left over is lost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each level gained gives three stat points, one at a time, to what she did to earn it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person with no Class spreads her level's points over three different stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level raises her HP, SP and MP maximums as their pages' sums say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level or stat gained raises what she has by what the maximum rose, and heals no more.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No level, stat or evolution closes a wound, mends a wrench or ends an injury.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The System shows each level as 【Level Up: 1 → 2】, its stat lines, and often a dry remark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her level and progress are written on their pages before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A monster's core eaten counts as a meal of that beast, and never twice for one beast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slime's core burns the mouth as a light blow; a corrupted core poisons as a solid one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leyline crystal eaten gives back five MP and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Plain food, weak beasts' meat and plants feed hunger only, and give no growth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person has no Beast Constitution, so spice and cooked food never poison her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person's first Class is offered from level 5, after a week spent at one pursuit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The System offers two or three Classes fitted to that pursuit, and she picks or waits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Class gives one skill fitted to it, and sends her level's points to its stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At the cap a person asks the System to advance her Class, somewhere safe, as a beast evolves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Advancing lifts her Tier and cap, resets her level to one, and keeps her race.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat page's slug ends in the number it keeps: level, growth, or one of the seven stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The seven stats are Strength, Dexterity, Vitality, Intelligence, Willpower, Charisma, Luck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is her progress toward the next level, as this check answers it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level page's maximum is the cap of her Tier: 10, 25, 50, then 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat rises one for each level point given it, as this check says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat also rises one for a week's hard training at what it measures, or a hard insight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Surviving a poison that took a fifth of her HP raises Vitality one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Charisma rises only from kindness truly returned; Luck only from a near death survived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System shows a stat's rise as a line such as 【Vitality +1】 as it happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in a stat is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stat shows as a number save where her status or the System shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fluency page's slug ends in the tongue it measures, from nought to ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala speaks and reads the common tongue as one born to it, and needs no page for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nought is no word; three is single words and gestures; six is plain talk; ten is native.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day spent among speakers who talk with her raises fluency one, up to six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Past six, a week among speakers raises it one; a patient teacher halves the time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her Intelligence of nine or more lets her keep what she hears the first time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Speech in a tongue below six is an act whose band rises as the fluency falls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tongue's page is filed at nought when she first hears it spoken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in fluency is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No fluency shows as a number; it shows as what she understands.",
    },
  ],
} as const satisfies WorldCheck
