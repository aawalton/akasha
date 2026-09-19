import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditTelling = {
  id: "01a0bb36-df5d-7c08-8b47-05d8913e3e37",
  type: "page-type/module",
  slug: "audit-telling",
  definition: "what a round found told to whoever champions checks, and the words it is told in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona championing checks is told of a refusal that check did not have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check already refusing is told of all the same, for a refusal that is new.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two refusals are the same refusal where the path each one names is the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message names the refusals a check newly has rather than every one it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check with no verdict before has every refusal it found read as new.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check turning clean again is told to nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one told is read from the pages rather than named in this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling nobody could receive is passed to Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling Alan was meant for is not passed to Alan a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One message carries every check that turned in a round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is held to the words a message page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal too long for that is shortened to say how much of it went.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message names where what each check answered is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The message counts what refused apart from what nothing measured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check is named here by its slug and its verdict rather than by how it ran.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a check, reads a log or writes a verdict.",
    },
  ],
} as const satisfies Module
