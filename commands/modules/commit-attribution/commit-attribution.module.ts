import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const commitAttribution = {
  id: "01a09c10-91c9-7a57-80f8-b3c2ffe0962c",
  type: "module",
  slug: "commit-attribution",
  definition: "the lines a commit message ends with naming the model and the session that wrote it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every commit a landing writes carries the attribution.",
    },
    {
      invariantKind: "departure",
      statement: "The attribution is composed by the command rather than typed by the agent.",
    },
    {
      invariantKind: "departure",
      statement: "The attribution lines come last in the message.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message already carrying a trailer key does not take a second line under that key.",
    },
    {
      invariantKind: "departure",
      statement: "A key already there is matched whatever case it is written in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each key is settled on its own, so a message carrying one of the two gains only the other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message whose last line is a trailer takes the attribution with no blank line between.",
    },
    {
      invariantKind: "departure",
      statement: "A commit no model is recorded for is co-authored as Claude.",
    },
    {
      invariantKind: "departure",
      statement: "The model is read as the id a seat records rather than as a name for a reader.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent records no model and is answered from the seat that ran it.",
    },
    {
      invariantKind: "absence",
      statement: "No session line is written where no session is known.",
    },
    {
      invariantKind: "departure",
      statement:
        "The session named is the one the environment names rather than the one the seat page states.",
    },
    {
      invariantKind: "gap",
      statement: "A seat page states the session the attribution names.",
    },
  ],
} as const satisfies Module
