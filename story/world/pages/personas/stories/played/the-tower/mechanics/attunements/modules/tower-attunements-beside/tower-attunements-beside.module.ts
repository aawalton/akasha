import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerAttunementsBeside = {
  id: "01a0ca9c-ba6b-72de-8f44-1bc1163474d9",
  type: "page-type/module",
  slug: "tower-attunements-beside",
  definition: "the attunements filed beside the character a game's panel draws",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The attunements answered are the attunements filed beside one character and beside no other.",
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
      statement: "An attunement is named by the title of its element and the title of its rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The counter an attunement carries is the number its row shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row whose element or rank names no title is left out rather than named in part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The attunements are answered in the order the names they carry sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read for one game is dropped where the game asked after changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no player of its own is answered no attunement.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No note is carried, because the pages read here hold none.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
