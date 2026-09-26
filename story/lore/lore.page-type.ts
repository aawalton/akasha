import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const lore = {
  id: "01a0d41b-785e-7bb8-b6fd-3c32ff5a377a",
  type: "page-type/page-type",
  slug: "lore",
  definition: "a truth about a world",
  pluralSlug: "lore",
  extends: ["page-type/page"],
  parts: [
    "page-type/place",
    "relation-property/lore-about",
    "record-property/lore-facts",
    "text-property/lore-fact",
    "multi-relation-property/lore-knowers",
    "file-property/lore-secrets",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: true, many: false },
    { pageProperty: "relation-property/lore-about", required: false, many: false },
    { pageProperty: "record-property/lore-facts", required: false, many: true, maxCount: null },
    { pageProperty: "file-property/lore-secrets", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact sits on one lore page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact states the world rather than instructs the game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One lore page holds every fact about its target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page other than a place names its target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lore true of a whole world is about that world's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who knows a fact is stated on the fact rather than on its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page with no fact anyone is told is withheld from a game master's seat.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
