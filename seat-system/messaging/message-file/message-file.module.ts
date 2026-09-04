import type { Module } from "@akasha/code-system/module"

export const messageFile = {
  id: "01a06a00-69c9-7000-9e16-a5778d6ad576",
  pageTypeSlug: "module",
  slug: "message-file",
  definition: "a message on disk: written as a page, read from both stores, and taken once read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is a page under the message page type.",
    },
    {
      invariantKind: "departure",
      statement: "A message page is named for the last twelve hex of the message's id.",
    },
    {
      invariantKind: "departure",
      statement: "A message page's name opens with no digit.",
    },
    {
      invariantKind: "departure",
      statement: "A message is written to the page store alone.",
    },
    {
      invariantKind: "departure",
      statement: "The old markdown store is read still and written never.",
    },
    {
      invariantKind: "departure",
      statement: "A message waiting in the old markdown store is delivered as it always was.",
    },
    {
      invariantKind: "departure",
      statement: "The old markdown store goes once the old markdown store holds no message.",
    },
    {
      invariantKind: "departure",
      statement: "A message addressed to no seat the seat index knows is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An unreadable seat index writes rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A message page composed outside the one folder read here is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Which store holds a message is answered by the file on disk.",
    },
    {
      invariantKind: "departure",
      statement: "The shape of a message's id answers which store holds the message never.",
    },
    {
      invariantKind: "departure",
      statement: "Reading a message is the message file's absence.",
    },
    {
      invariantKind: "departure",
      statement:
        "A claim on a message is a value beside the message rather than a change to the page.",
    },
    {
      invariantKind: "departure",
      statement: "The value beside a message is dropped for the store the message was found in.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a watch is handed is the folder a message arrives in.",
    },
  ],
} as const satisfies Module
