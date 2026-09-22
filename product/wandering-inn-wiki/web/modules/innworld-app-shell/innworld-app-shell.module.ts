import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldAppShell = {
  id: "01a0c65b-6a5f-75c7-91b0-1543f3362467",
  type: "page-type/module",
  slug: "innworld-app-shell",
  definition: "the frame every page of this wiki is drawn inside",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The frame is the one every other site of Alan's is drawn inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sidebar names every page type this wiki reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No nav page is read, since the reader of this site reaches none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The credit to the author of the work sits under every page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type the sidebar names wears an icon, since none states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A heading gathers the page types few readers come for, and the heading is no link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which heading a page type sits under is settled here rather than on that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type under no heading here is drawn at the foot rather than left out.",
    },
  ],
} as const satisfies Module
