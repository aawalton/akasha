import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedTheJungleBookSarabande = {
  id: "01a0afa2-1223-779b-8506-502a70501b57",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-the-jungle-book-sarabande",
  ownLength: 3.7020833333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ekMALFUBI4AaxazzS3hiC",
      externalLink: "https://open.spotify.com/track/6ekMALFUBI4AaxazzS3hiC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Jungle Book / Sarabande",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thejunglebooksarabande|0jW6R8CVyVohuUJVcuweDI|222125",
} as const satisfies Track
