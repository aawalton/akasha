import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatReplay = {
  id: "01a10238-e959-79ba-9502-1029307633d5",
  type: "page-type/module",
  slug: "beat-replay",
  definition: "the replay of a story's beats into its clock, its places and who is where",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat is handed in as a plain line, or as a json record stating its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record states the beat's time, place, who is there, who arrives and who leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat stating none of those is a plain beat and changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Everyone there is at the beat's place, and someone leaving stays where last seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Arriving where already there, or leaving where not there, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Someone there before any beat has named a place is refused.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A turn whose beats state no time ends at the time the turn states as its end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names a beat by its number and its turn, and never quotes it.",
    },
  ],
} as const satisfies Module
