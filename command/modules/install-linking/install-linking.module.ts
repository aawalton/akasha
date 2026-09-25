import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const installLinking = {
  id: "01a09247-d31a-7256-813e-77eef6451d1b",
  type: "page-type/module",
  slug: "install-linking",
  definition: "the file a page holds linked where that page says the file is reached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page saying where the file it holds is reached has that file linked there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file linked is the one the page holds its body in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page saying so is weighed rather than only the pages a change moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link already naming that file is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming anything else is taken away and made again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Something there that is no link is left as it is and said as wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is not there is said as wrong rather than linked to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placing a page states for another kind of machine is not made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no kind of machine is placed on every kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The home a tilde opens onto is the one handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pages naming one link place that link once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link that could not be placed is said rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path a link is placed at is read off the page rather than off a table here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the checkout the machine's launcher runs places links into the home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other checkout links nothing and says which checkout the launcher runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A home with no launcher linked yet takes its links from the checkout landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file inside the repository.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says a link already naming what the page says.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A repository with no index has nothing weighed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types state a placing is read off the pages rather than a table here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type states a placing where that page type declares where its pages are reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page is linked only where that page or its page type says it is placed by a link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type naming no property holding its body has each page it places said as wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A placing outside the home is made by `akasha infrastructure provisioned-file-install`.",
    },
  ],
} as const satisfies Module
