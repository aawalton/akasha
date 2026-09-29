import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiWorking = {
  id: "01a0ed2c-910d-7bf5-b3a3-8b73b48e526a",
  type: "page-type/world-check",
  slug: "overwhere-iii-working",
  title: "Working",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "how much mana a working of Nala's gathers in Overwhere III, and what force it lands",
  description: "How much a working of hers carries.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A working is settled when Nala shapes mana into a spell, a skill or raw force.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A working carries the mana of her own she spends, Mana Weaver's lending, and a d6.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana Weaver lends its draw times the rank her holding has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beside a mana node the lending is multiplied by the trait's node factor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only currents within the trait's reach times its rank can be lent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "She may pull past the lending, and each point pulled past costs the trait's strain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Strain is health, and like any harm it leaves her at least 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under 6 mana lands light force, under 16 solid, under 30 heavy, and 30 or more crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the working lands at all is the action check's to say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every working powered by the trait against a real foe or feat is a telling use.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Mana counts never appear in the prose; the force shows in what it does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"own":2,"pull":0,"nearNode":false}`.',
    },
  ],
} as const satisfies WorldCheck
