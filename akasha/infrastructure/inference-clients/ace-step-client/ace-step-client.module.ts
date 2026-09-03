import type { Module } from "@akasha/code-system/module"

export const aceStepClient = {
  id: "01a0682d-8ef5-7006-9c39-daea2ba9c6dd",
  pageTypeSlug: "module",
  slug: "ace-step-client",
  definition: "a song asked of the ACE-Step service and the wav that service made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A song is asked for once and then polled for until it is done.",
    },
    {
      invariantKind: "departure",
      statement: "The seed is always told, so the service draws none of its own.",
    },
    {
      invariantKind: "departure",
      statement: "One song is asked for at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A task the poll does not yet name reads as still running.",
    },
    {
      invariantKind: "departure",
      statement: "A task that succeeded carrying no result payload is at fault rather than empty.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes are the answer only where they open `RIFF`.",
    },
    {
      invariantKind: "departure",
      statement: "The wav is written to disk here as well as answered with.",
    },
  ],
} as const satisfies Module
