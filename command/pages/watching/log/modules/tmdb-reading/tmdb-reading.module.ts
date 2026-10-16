import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tmdbReading = {
  id: "01a1447c-42d3-7000-b116-5120b0ae70ad",
  type: "page-type/module",
  slug: "tmdb-reading",
  definition: "what TMDB answers of a show's seasons and episodes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "TMDB is reached with the token in `~/.secrets.env`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show TMDB is asked about is named by its TMDB id or found by its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode type TMDB answers is spelled as the catalogue spells it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode type the catalogue does not name is left unstated.",
    },
  ],
  createdAt: "2026-10-16T11:32:36.691Z",
  updatedAt: "2026-10-16T11:32:36.691Z",
} as const satisfies Module
