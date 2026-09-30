import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxGrowth = {
  id: "01a0ea3f-584b-769a-913c-035d23cbeac0",
  type: "page-type/world-check",
  slug: "otherwhere-ix-growth",
  title: "Growth",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition:
    "the levels, points and skill gains the system grants a character in Otherwhere IX for one turn",
  description: "How much stronger and more skilled a turn made someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Growth is settled once a turn for each character who faced a challenge, trained or used a skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A challenge is a foe or peril, named by its grade and whether it was overcome.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person is G Grade to level four, F to 99, E to 299, D to 999, C from 1000.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A challenge of her own grade gives one level, one grade above three, two six, three or more ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A challenge below her grade gives nothing, and a failed one nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A peril survived but not overcome gives half, rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Killing is not needed; driving off, outwitting or escaping a hunter overcomes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each four hours of hard training or meditation counts as one level's worth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Levels come at full pace to 24, half to 49, a quarter to 99, an eighth after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any real gain gives at least one level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Challenges in order, then training, each settle at the grade and pace the ones before left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each level gives eight unspent points, which she spends on attributes as she says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala gets no free points; those are one otherworlder's oddity, not hers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Most health is fifty plus ten per Constitution, and a third more from Constitution 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Most mana is twenty per Spirit plus two per Constitution, half again from Spirit 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute reaching 100 offers a choice of passives the world builder names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Raising most health or mana raises what she has left by as much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level gained restores no health and no mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One foe gives its levels once in all, however many turns the fight spans.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Levels already granted partway through a fight count toward that foe's total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is learned when she does its work in earnest and it comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill used in earnest gains a level, and strongly two; her Otherworlder class adds one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At skill level 10 a Mastery awakens, and she picks one specialisation offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At level 5 a magical skill may awaken a Path, with 10 Arcana and 50 G Grade Mystic Mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "She holds at most four Paths to a skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Absorbing a core gives one primary attribute one at G, two attributes one at F.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Absorbing a core gives two attributes two at E, three at D, and five at C.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Absorbing a core adds mana: ten at G, twenty at F, thirty at E, fifty at D, 150 at C.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her Unset trait gives half again each attribute a core awards, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Three cores of one grade may combine into one of the next, with its own small award.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "She has four body slots; an affixed core grants a trait and makes its mana at G Grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under Unset each affixed core leaves a mark on her body the world builder decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The world builder names every skill, specialisation, Path, passive and trait offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gain shows as a system box only where the system would show one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Level, attributes, health and mana are written on her pages before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck
