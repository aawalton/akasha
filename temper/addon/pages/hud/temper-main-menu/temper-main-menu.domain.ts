import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperMainMenu = {
  id: "01a0c744-5d84-7921-beec-e7d56b1b150e",
  type: "page-type/domain",
  slug: "temper-main-menu",
  definition: "the entries an add-on adds to the game's main menu bar",
  parts: [
    "module/main-menu-casts",
    "module/main-menu-entry",
    "module/main-menu-keyboard",
    "module/main-menu-library",
    "module/main-menu-publish",
    "module/main-menu-scenes",
    "module/main-menu-setup",
    "module/main-menu-shape",
    "module/main-menu-version",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on reaches the menu bar through a global name rather than by importing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bars put up here are built in code rather than declared in XML.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A console client is handed no menu bar.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies Domain
