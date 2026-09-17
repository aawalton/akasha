import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedTourDeFrance = {
  id: "01a0afa2-1288-748a-a20d-6a298a13a37b",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-tour-de-france",
  ownLength: 3.59375,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28FzX6iJyT6c29jdP1uRZL",
      externalLink: "https://open.spotify.com/track/28FzX6iJyT6c29jdP1uRZL",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Tour de France",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "tourdefrance|0jW6R8CVyVohuUJVcuweDI|215625",
} as const satisfies Track
