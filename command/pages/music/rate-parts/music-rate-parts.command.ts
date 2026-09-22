import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicRateParts = {
  id: "01a0c59f-227b-7315-8c34-306abf9c8760",
  type: "page-type/command",
  slug: "music-rate-parts",
  definition: "the command recording a grade onto every part of a music collection",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page named is not graded, and the parts under it are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page reached down from the page named is graded, however deep.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No song is graded, because Alan grades the recording he heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is walked through, so what sits under a song is still reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page reached more than one way is graded once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade reaches the recording rather than the place one release gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part more than one collection holds is graded once and counted as shared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part already carrying a grade is left as that part is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--regrade` writes over a grade a part already carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--plan` names every part the run would grade and writes none of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is a rung on the ladder music grades pages by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a music provider.",
    },
  ],
  name: "rate-parts",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/plan" },
    { argument: "argument/regrade" },
    { argument: "argument/slug", required: true },
    { argument: "argument/grade-target", required: true },
    { argument: "argument/grade", required: true },
  ],
} as const satisfies Command
