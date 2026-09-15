import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messageFile = {
  id: "01a06a00-69c9-7000-9e16-a5778d6ad576",
  type: "page-type/module",
  slug: "message-file",
  definition: "a message on disk: written as a page, read from both stores, and taken once read",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is a page under the message page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message page's name opens with no digit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is written to the page store alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message page names its seat by page type and slug, and reads back as the name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message addressed to no seat the seat index knows is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unreadable seat index writes rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A message lands at the path the composer gives rather than at one worked out again here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A message whose page would be over the byte ceiling is refused rather than landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page over that ceiling is a page no later change can write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is claimed and taken at the path the index files that message at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page composer may give a message a folder of its own, so the path is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message the index does not name is claimed and taken at the composed path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is reached by the index rather than by listing one folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message page the index files outside the one folder read here is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which store has a message is answered by the file on disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shape of a message's id answers which store has the message never.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading a message is the message file's absence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A claim on a message is a value beside the message rather than a change to the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value beside a message is dropped for the store the message was found in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a watch is handed is the folder a message arrives in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That folder is asked of the index rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No folder a message page sits in is written in this code.",
    },
  ],
} as const satisfies Module
