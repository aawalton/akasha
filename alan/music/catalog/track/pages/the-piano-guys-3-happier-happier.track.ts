import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3HappierHappier = {
  id: "01a0afa2-1d5b-75a4-be3c-7a3d26700eaf",
  type: "page-type/track",
  slug: "the-piano-guys-3-happier-happier",
  ownLength: 3.74,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-happier"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BDB6Mf9m4qhgxZzv03ziX",
      externalLink: "https://open.spotify.com/track/2BDB6Mf9m4qhgxZzv03ziX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Happier",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "happier|0jW6R8CVyVohuUJVcuweDI|224400",
} as const satisfies Track
