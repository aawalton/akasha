import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const proseEditor = {
  id: "01a1036d-1064-704f-a363-6276a578d49e",
  type: "page-type/step-status",
  slug: "prose-editor",
  title: "Prose Editor",
  definition: "the prose editor's move, cutting a written chapter's prose to at most half",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a chapter of a story with editor steps reaches this step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's prose comes here before any recorder or reviewer reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose editor advances the chapter on as the writer would with no editor.",
    },
  ],
} as const satisfies StepStatus
