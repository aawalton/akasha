import type { Module } from "@akasha/code-system/module"

export const modelAsking = {
  id: "01a05a43-f8db-71c8-8c89-8850c6e1b851",
  pageTypeSlug: "module",
  slug: "model-asking",
  definition: "prompts put to a model, each answered by the words it opens with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module is spawned rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "Four prompts are in flight.",
    },
    {
      invariantKind: "departure",
      statement: "A check cannot wait for a call.",
    },
    {
      invariantKind: "departure",
      statement: "The job arrives on standard input and the answers leave on standard output.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt asked more than once stands more than once in the job.",
    },
    {
      invariantKind: "departure",
      statement: "The model is named by the caller rather than read from a family here.",
    },
    {
      invariantKind: "departure",
      statement: "A call that could not be made throws rather than answering emptily.",
    },
    {
      invariantKind: "departure",
      statement: "A job that could not be answered exits with exit code `3`.",
    },
    {
      invariantKind: "departure",
      statement: "Every way of failing leaves the same exit.",
    },
    {
      invariantKind: "departure",
      statement: "A wait the gateway asks for is the wait taken.",
    },
    {
      invariantKind: "departure",
      statement: "A status that will not come good is tried no further.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The gateway named by the environment is what stands between this module and Anthropic.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a model answered.",
    },
  ],
} as const satisfies Module
