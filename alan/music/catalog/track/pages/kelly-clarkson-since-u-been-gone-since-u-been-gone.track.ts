import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonSinceUBeenGoneSinceUBeenGone = {
  id: "01a0a5ae-e89d-7d7f-89b2-0489043ada44",
  type: "track",
  slug: "kelly-clarkson-since-u-been-gone-since-u-been-gone",
  ownLength: 3.148216666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-since-u-been-gone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uKQjqNZAxtFJ6k9xnLrYP",
      externalLink: "https://open.spotify.com/track/6uKQjqNZAxtFJ6k9xnLrYP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Since U Been Gone",
} as const satisfies Track
