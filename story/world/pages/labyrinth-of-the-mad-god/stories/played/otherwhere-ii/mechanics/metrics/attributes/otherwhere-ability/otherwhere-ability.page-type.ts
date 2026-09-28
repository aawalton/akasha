import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereAbility = {
  id: "01a0e9a0-abb2-71b3-a68c-d5d670d3aeaa",
  type: "page-type/page-type",
  slug: "otherwhere-ability",
  definition: "the rank one character holds in one ability in Otherwhere",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's title names the ability, and the world skill of that name says what it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ability comes from a class or an ability stone; a first stone offers a choice of two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A survivor of Earth has two active slots, one passive and one free.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ability from a stone fills a slot; a free slot holds one unused, swapped once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new ability begins at rank nought, and ranks run to six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ranks need level fifteen, essence and understanding won by use.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Working an ability is an action check on Magic for a spell, or Dexterity for a combat art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mana Dart deals harm as a solid blow that no ward stops, and drains as much stamina.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mend gives back two health for each point of the caster's Magic, over its minutes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A casting takes a few breaths of focus and fails if broken.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
