import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeGenerating = {
  id: "01a0d4dd-b151-7c71-ac4c-0aca0b91216e",
  type: "page-type/module",
  slug: "change-generating",
  definition: "the edits every change generator adds to a change, run in the order they name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generators run are the ones the index the change leaves names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator runs after every change generator it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Change generators neither naming the other run in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator naming none is handed the change as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator naming any is handed every edit made before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator's code is loaded from the body the change leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator that broke or gave no code refuses the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Change generators naming each other in a ring refuse the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change generator is run over the whole tree, whatever it could turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run over the whole tree is handed the shadow its caller read the tree through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each run of a change generator appends what that run cost beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator whose page is not on disk yet is run uncosted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator given no code is not run, so nothing is costed for it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to disk but those costs.",
    },
  ],
} as const satisfies Module
