import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const openingWindow = {
  id: "01a05bc7-9129-7008-8402-c98c706da8be",
  type: "page-type/module",
  slug: "opening-window",
  definition: "the span from one opening of Alan's day to the next opening of it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day opens when the first sleep block starting or running past six the evening before began.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Six in the evening is read on a Utah clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first of two blocks is the block that started earlier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block titled anything but sleep is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stretch titled rest is sleep not yet known to be sleep and is titled sleep in the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block ending at or before that hour opens no day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A block starting at or after six in the evening opens the day after rather than that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The blocks a day held are the entries beside that day's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's entries are reached through that day's page rather than by a path here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window closes at the moment the day after opened.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no recorded opening refuses as a value rather than raising.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here invents the moment a day opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Six in the evening in Utah brackets which sleep opens a day and bounds no window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day whose next opening is not recorded closes at the ESO reset that closes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day whose own opening is not recorded opens at the ESO reset that opens it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spanned window refuses only a day that will not parse.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks for a page type but the day's own.",
    },
  ],
} as const satisfies Module
