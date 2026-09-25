import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAsking = {
  id: "01a05a43-f8db-71c8-8c89-8850c6e1b851",
  type: "page-type/module",
  slug: "model-asking",
  definition: "the messages that code sends to a model and the messages the model writes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This module is spawned rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Four prompts are in flight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check cannot wait for a call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The job arrives on standard input and the answers leave on standard output.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt asked more than once sits more than once in the job.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model answers at no temperature, so one prompt asked twice answers the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer has room to set out its reasons before the answer settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model is named by the caller rather than read from a family here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that could not be made throws rather than answering emptily.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each prompt is settled on its own, so one failing leaves the others' answers kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt that reached no model answers null in its own place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why each prompt reached no model is written on standard error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job where no prompt reached a model exits with exit code `3`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job where any prompt reached a model exits cleanly with every answer it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every way of failing leaves the same exit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait the gateway asks for is the wait taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A status that will not come good is tried no further.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The gateway named by the environment sits between this module and Anthropic.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a model's answer.",
    },
  ],
} as const satisfies Module
