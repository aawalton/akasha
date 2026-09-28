import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIvNeeds = {
  id: "01a0e9f1-97bd-70ba-b847-4b5b04c1bc0a",
  type: "page-type/world-check",
  slug: "otherwhere-iv-needs",
  title: "Needs",
  world: "world/beware-of-chicken",
  definition: "how hungry, thirsty, tired and cold a character in Otherwhere IV is",
  description: "How much going without is costing a body.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Needs are settled with no dice, once a turn for each character going without, before telling it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Thirst counts hours since a drink, hunger hours since a meal, and sleep hours awake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cold counts hours spent wet, or unsheltered in the night, without a fire.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each need reaches a stage, and each stage costs a bonus on every act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Thirst is slaked under eight hours, thirsty under sixteen, parched under twenty-eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Past twenty-eight hours thirst is failing and harms one an hour, and past forty-eight dying, three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Hunger is fed under ten hours, hungry under thirty, weak under seventy-two, then starving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Sleep is rested under eighteen, tired under twenty-eight, exhausted under forty-four, then spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Cold is nothing under two hours, chilled under six, cold under twelve, then freezing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Freezing harms one an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A snack or a sip halves what a need has counted, and a meal, a drink or a night's sleep clears it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Clear running hill water is safe to drink, and still or paddy water brings a flux.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fire, dry clothes and a roof clear the cold.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stage shows as a word the prose names; the body shows it.",
    },
  ],
} as const satisfies WorldCheck
