import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jennyAppShell = {
  id: "01a06558-c2cc-700a-89e3-27c5e622acc4",
  type: "page-type/module",
  slug: "jenny-app-shell",
  definition: "the frame Jenny's pages are drawn inside, with the way out of the session",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The frame is the one every other site of Alan's is drawn inside.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No nav page is read, so the sidebar names the pages this site draws.",
    },
  ],
} as const satisfies Module
