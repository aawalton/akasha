import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAsking = {
  id: "01a05a43-f8db-71c8-8c89-8850c6e1b851",
  type: "module",
  slug: "model-asking",
  definition: "prompts put to a model, each answered by the words the model writes back",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module is spawned rather than imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Four prompts are in flight.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check cannot wait for a call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The job arrives on standard input and the answers leave on standard output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prompt asked more than once sits more than once in the job.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A model answers at no temperature, so one prompt asked twice answers the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer has room to set out its reasons before the answer settles.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The model is named by the caller rather than read from a family here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that could not be made throws rather than answering emptily.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job that could not be answered exits with exit code `3`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every way of failing leaves the same exit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait the gateway asks for is the wait taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status that will not come good is tried no further.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The gateway named by the environment sits between this module and Anthropic.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a model's answer.",
    },
  ],
} as const satisfies Module
