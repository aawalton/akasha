import type { Command } from "@akasha/command-system/command"

export const exerciseRanks = {
  id: "01a0685d-b7ab-74c4-812e-967f191c9696",
  pageTypeSlug: "command",
  slug: "exercise-ranks",
  definition: "the command ordering movements by the blended selection objective, best first",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--exercises <csv>",
      takes: "the movements ranked, each named by id, by title or by part of either",
    },
    {
      said: "--limit <n>",
      takes:
        "the most movements given back when the whole catalog is ranked, fifteen where none is said",
    },
    { said: "--json", takes: "give the ranking as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the four goal scores behind each blend are longevity, energy, functionality and aesthetics.",
    "the weights the blend uses are read from the selection-policy page.",
    "naming movements ranks those alone and shows all of them, whatever the limit says.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The weights the blend uses are read from the selection-policy page.",
    },
    {
      invariantKind: "departure",
      statement: "The movements are ordered by their blended score, highest first.",
    },
    {
      invariantKind: "departure",
      statement: "Naming movements ranks those alone and holds back none of them.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no movement ranks the whole catalog and holds back all past the limit.",
    },
    {
      invariantKind: "departure",
      statement: "A score is read off the movement's own features rather than off its history.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a session or a set.",
    },
  ],
} as const satisfies Command
