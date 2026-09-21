import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoSandboxGlobals = {
  id: "01a06365-e827-7005-8d42-8950da32503e",
  type: "page-type/module",
  slug: "eso-sandbox-globals",
  definition: "the substitute game globals a bundle finds when a sandbox loads the bundle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A stub answers every property reach with a stub of the stub's own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A stub reached twice under one name answers with the same stub both times.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A stub answers no promise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load seeds only the game names a bundle reads at load time.",
    },
  ],
} as const satisfies Module
