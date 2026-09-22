import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messageSending = {
  id: "01a0c9b0-1b46-73d4-af37-b0116218a5cf",
  type: "page-type/module",
  slug: "message-sending",
  definition: "a message composed as a page and sent to the pages service",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is a page under the message page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page's name opens with no digit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is written to the page store alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is sent to the pages service wherever the sender runs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender carries the pages caller rather than the change engine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The origin a send reaches is the one the environment states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A send the environment states no origin for reaches the pages service on this workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The port that service listens on is read from that service's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A send names its writer as a name and an address, as a write to the pages does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the pages refused is refused with what the pages said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may put a pages writer of its own in place of the one reaching out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page names its seat by page type and slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message addressed to no seat the seat index knows is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unreadable seat index writes rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path a message is answered with is the one the composer gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message whose page would be over the byte ceiling is refused rather than sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page over that ceiling is a page no later change can write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder a watch is handed is the folder a message arrives in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder is asked of the index rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder a message page sits in is written in this code.",
    },
  ],
} as const satisfies Module
