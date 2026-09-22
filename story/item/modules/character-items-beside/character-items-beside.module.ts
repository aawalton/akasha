import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterItemsBeside = {
  id: "01a0caa8-a2c1-7827-bdaa-42e97874aad7",
  type: "page-type/module",
  slug: "character-items-beside",
  definition: "the items filed beside the character a game's panel draws",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The items answered are the items filed beside one character and beside no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character asked after is the player the game being drawn names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The character is matched by the slug closing the address rather than by the page type opening it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item naming a slot is worn, and an item naming none is carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A worn item is filed under the title of the slot page it names rather than under that page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item naming a slot no page titles is carried rather than worn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot another item already fills leaves the later item among the carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The note a carried item shows is that item's description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item stating no title is left out rather than named by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worn slots are answered in the order their titles sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The carried items are answered in the order their names sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read for one game is dropped where the game asked after changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no player of its own is answered nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character filed no item at all is answered nothing rather than an empty pair.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read still outstanding is answered apart from a read answering no item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel holding no item of its own draws nothing while the read is still outstanding.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
