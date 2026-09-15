import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const music = {
  id: "01a06222-4d01-78f8-8ed6-e3f5ec16f8a3",
  type: "page-type/domain",
  slug: "music",
  definition: "music heard and what is kept of it",
  parts: [
    "domain/music-catalog",
    "domain/music-choosing",
    "domain/music-command",
    "domain/music-listening",
    "domain/spotify",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every music package is reached through akasha rather than through `collections/`.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A live music call reads its pacing gap at the call rather than once at load.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Everything music keeps is a page in akasha.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No music is kept in markdown.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every play Alan finishes is filed onto the day of that play.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every kind of thing music keeps has a page type of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Music keeps the songs made apart from the plays heard.",
    },
  ],
} as const satisfies Domain
