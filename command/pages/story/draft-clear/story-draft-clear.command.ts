import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyDraftClear = {
  id: "01a18333-a477-787a-ab76-8d04f6b67ee3",
  type: "page-type/command",
  slug: "story-draft-clear",
  definition: "the command taking a played story's action draft away, so its action bar is empty",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cleared story holds no action draft, and its action bar opens empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story holding no draft is cleared already, and is told so.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A clear sends nothing and changes no committed value.",
    },
  ],
  name: "draft-clear",
  arguments: [{ argument: "argument/story", required: true }],
  createdAt: "2026-10-28T15:49:22.166Z",
  updatedAt: "2026-10-28T15:49:22.166Z",
} as const satisfies Command
