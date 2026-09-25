import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldAppShell = {
  id: "01a0c65b-6a5f-75c7-91b0-1543f3362467",
  type: "page-type/module",
  slug: "innworld-app-shell",
  definition: "this wiki's page frame",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The frame is the one every other site of Alan's is drawn inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sidebar names the nav items naming this site, and no item is written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section gathers the page types few readers come for, and the section is no link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which section a page type sits under is settled on the nav items.",
    },
  ],
} as const satisfies Module
