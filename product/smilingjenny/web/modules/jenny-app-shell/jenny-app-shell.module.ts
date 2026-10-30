import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jennyAppShell = {
  id: "01a06558-c2cc-700a-89e3-27c5e622acc4",
  type: "page-type/module",
  slug: "jenny-app-shell",
  definition: "the menu the pages of smilingjenny.me show",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The menu is the one every other site of Alan's shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The menu names the nav items naming this site, and no item is written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing the menu shows offers a way to write a nav item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name over the menu is the title of Jenny's web app page.",
    },
  ],
  createdAt: "2026-09-03T03:38:30.988Z",
  updatedAt: "2026-10-30T17:01:29.202Z",
} as const satisfies Module
