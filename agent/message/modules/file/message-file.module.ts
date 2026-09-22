import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messageFile = {
  id: "01a06a00-69c9-7000-9e16-a5778d6ad576",
  type: "page-type/module",
  slug: "message-file",
  definition: "a message read off disk, claimed while it is answered, and taken once it is read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is a page under the message page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page names its seat by page type and slug, and reads back as the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is claimed and taken at the path the index files that message at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page composer may give a message a folder of its own, so the path is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the index does not name is claimed and taken at the composed path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is reached by the index rather than by listing one folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page the index files outside the one folder read here is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which store has a message is answered by the file on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape of a message's id answers which store has the message never.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a message is the message file's absence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is taken through the pages service rather than landed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take names the writer a send names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take the pages refused leaves the message where that message is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A claim on a message is a value beside the message rather than a change to the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value beside a message is dropped for the store the message was found in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder a message page sits in is written in this code.",
    },
  ],
} as const satisfies Module
