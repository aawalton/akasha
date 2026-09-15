import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitAttribution = {
  id: "01a09c10-91c9-7a57-80f8-b3c2ffe0962c",
  type: "module",
  slug: "commit-attribution",
  definition: "the lines a commit message ends with naming the model and the session that wrote it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every commit a landing writes carries the attribution.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The attribution is composed by the command rather than typed by the agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The attribution lines come last in the message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A message already carrying a trailer key does not take a second line under that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key already there is matched whatever case it is written in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Each key is settled on its own, so a message carrying one of the two gains only the other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A message whose last block is all trailers takes the attribution with no blank line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject line holding a colon is prose rather than a trailer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A model is named as a reader reads it, worked out from the id rather than listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit no model is recorded for is co-authored as Claude.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The model is read as the id a seat records rather than as a name for a reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent records no model and is answered from the seat that ran it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No session line is written where no session is known.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The session named is the one the environment names rather than the one the seat page states.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A seat page states the session the attribution names.",
    },
  ],
} as const satisfies Module
