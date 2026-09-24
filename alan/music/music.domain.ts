import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const music = {
  id: "01a06222-4d01-78f8-8ed6-e3f5ec16f8a3",
  type: "page-type/domain",
  slug: "music",
  definition: "music heard and what is kept of it",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "music" }],
  parts: [
    "domain/music-catalog",
    "domain/music-choosing",
    "domain/music-command",
    "domain/music-listening",
    "domain/spotify",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every music package is reached through akasha rather than through `collections/`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A live music call reads its pacing gap at the call rather than once at load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything music keeps is a page in akasha.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No music is kept in markdown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every play Alan finishes is filed onto the day of that play.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind of thing music keeps has a page type of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Music keeps the songs made apart from the plays heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Music names a grade `grade` in code, in data and in text alike.",
    },
  ],
} as const satisfies Domain
