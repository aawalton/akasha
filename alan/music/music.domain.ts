import type { Domain } from "../../domains/domain.page-type.ts"

export const music = {
  id: "01a06222-4d01-78f8-8ed6-e3f5ec16f8a3",
  pageTypeSlug: "domain",
  slug: "music",
  definition: "music heard and what is kept of it",
  pluralSlug: "music",
  partSlugs: [
    "domain/music-catalog",
    "domain/music-listening",
    "workspace-package/music-choosing",
    "workspace-package/music-commands",
    "workspace-package/spotify",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every music package is reached through akasha rather than through `collections/`.",
    },
    {
      invariantKind: "constraint",
      statement: "A live music call reads its pacing gap at the call rather than once at load.",
    },
    {
      invariantKind: "departure",
      statement: "Everything music keeps is a page in akasha.",
    },
    {
      invariantKind: "absence",
      statement: "No music is kept in markdown.",
    },
    {
      invariantKind: "gap",
      statement: "Every play Alan finishes is filed onto the day of that play.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of thing music keeps has a page type of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Music keeps what was made apart from what was heard.",
    },
  ],
} as const satisfies Domain
