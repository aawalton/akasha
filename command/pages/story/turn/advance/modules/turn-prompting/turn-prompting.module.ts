import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnPrompting = {
  id: "01a0deca-7611-7c9f-94b0-89aa26759a71",
  type: "page-type/module",
  slug: "turn-prompting",
  definition: "the prompt a fresh reviewer or writer seat starts on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt names the turn's path, the seat's job and where its instructions are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt names the exact advance the seat calls when it is done.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A prompt carries no directive, since the seat's role and persona hold those.",
    },
  ],
} as const satisfies Module
