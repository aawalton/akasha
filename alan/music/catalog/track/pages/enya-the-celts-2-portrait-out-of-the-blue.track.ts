import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2PortraitOutOfTheBlue = {
  id: "01a0a5b0-2178-7b54-be99-88ba52e9836a",
  type: "page-type/track",
  slug: "enya-the-celts-2-portrait-out-of-the-blue",
  ownLength: 3.2111,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5F83kJlBQ49pUCqZw83Jlp",
      externalLink: "https://open.spotify.com/track/5F83kJlBQ49pUCqZw83Jlp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Portrait (Out of the Blue)",
} as const satisfies Track
