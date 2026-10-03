import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const beatEditor = {
  id: "01a1036d-1063-7583-b562-88c7977dd3ca",
  type: "page-type/step-status",
  slug: "beat-editor",
  title: "Beat Editor",
  definition: "the beat editor's move, cutting a written chapter's beats to at most half",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a chapter of a story with editor steps reaches this step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game master's first beats come here, and beats it mends go on past this step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The beat editor advances the chapter to mechanics, or to writer with no mechanics seat.",
    },
  ],
} as const satisfies StepStatus
