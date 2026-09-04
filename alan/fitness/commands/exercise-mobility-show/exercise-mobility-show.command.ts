import type { Command } from "@akasha/command-system/command"

export const exerciseMobilityShow = {
  id: "01a0685c-7d81-71c9-a5d3-5973fe27479b",
  pageTypeSlug: "command",
  slug: "exercise-mobility-show",
  definition:
    "the command saying how far Alan's joints have been moving and which way that is going",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--metric <metric>",
      takes: "the one measurement to keep, where every one is meant otherwise",
    },
    { said: "--limit <n>", takes: "how many readings to fetch, newest first" },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
  ],
  helpNotes: [
    "the readings come back newest first.",
    "a trend is worked out for each metric and side that carries numbers, read from the oldest of them to the newest.",
    "a reading carrying no number is part of no trend.",
    "a metric and side with fewer than two numbers has a trend of insufficient rather than flat.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trend belongs to a metric and a side together rather than to a metric alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Command
