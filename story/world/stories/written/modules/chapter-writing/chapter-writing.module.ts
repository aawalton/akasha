import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterWriting = {
  id: "01a0e971-8b9c-7100-bec8-8d0af82a161f",
  type: "page-type/module",
  slug: "chapter-writing",
  definition: "the button on a written story's page that starts its next chapter",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The button names the story by its slug and asks nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter started, or why none was, is said under the button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The button waits while its ask is out, so one press starts one chapter.",
    },
  ],
} as const satisfies Module
