import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedSheetRows = {
  id: "01a0de6e-26a8-7f96-83bb-6542390fc85b",
  type: "page-type/module",
  slug: "played-sheet-rows",
  definition: "the sheet of a story played's character, read off the rows its pages answer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's level is the metric whose page type's slug ends in `level`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attribute is named by its page type's slug in capitals, less the opening the level's slug has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute page stating a title is named by it, in capitals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One naming no title but adding a name to its character's slug is named by that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resource is named by its page type's slug less its story's opening, in capitals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resource page adding a name to its character's slug puts that name before its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource page stating a title is named by it, in capitals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource with a most is shown as its value out of that most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resource stating the words the story gave for it is shown as those words, never its numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Resources stating a display order come first, in that order, and the rest follow by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is named by its currency's title, or by its own title, or as a purse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is counted in its currency's largest coins that fit it, largest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse whose currency states no coins is shown as its number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse stating the words the story gave for it is shown as those words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is named by its skill page's title and ranked by its rank page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill holding naming no skill page is named and noted by itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A held kind is named by the page its relation of that kind names, or by the holding itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's score is its level, or its rank where the rank is a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill's note is its skill page's description, or its holding's own note where that page has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trait is named by the trait page its holding names, or by the holding itself where it names none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's score is its rank, and its note is its trait page's description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest is keyed by its page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bond is named by the other characters in it and counts its points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attunement is named by its element and its rank, and counts its counter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skills, bonds and attunements are answered in the order their names sort.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
} as const satisfies Module
