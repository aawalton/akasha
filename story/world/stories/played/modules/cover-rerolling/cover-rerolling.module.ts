import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const coverRerolling = {
  id: "01a0e851-25d9-756c-ab3b-35fef0612b06",
  type: "page-type/module",
  slug: "cover-rerolling",
  definition: "a story picture its reader asked for drawn again from its own prompt at a new seed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover is drawn again from the prompt and model its image page records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cover is drawn again at 832 by 1216, the one portrait size every story picture takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover drawn again takes a new seed, since the old seed draws the same picture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every turn and chapter of the story naming the old cover names the new one, in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A written story's chapters name the new picture as cover, as scene and on each beat picturing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beats file is rewritten only on the lines picturing the old picture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The old cover is graded F in that commit, so the graded-F sweep deletes it once nothing names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That commit states the commit its turns and old cover were read at, since each holds a body already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turns are read after the render, so the commit rests on the story as it now is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ask is taken off the story once the new cover is in place or refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is left on the story in words its player reads.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One cover is drawn at a time, since one workload runs on the GPU at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture service that does not answer refuses the ask rather than holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stories watched are the ones there when the watch starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Quiet work the watch is handed runs on its lane every 30 seconds while no reroll is asked.",
    },
  ],
} as const satisfies Module
