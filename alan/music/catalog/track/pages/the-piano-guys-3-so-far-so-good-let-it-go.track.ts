import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodLetItGo = {
  id: "01a0afa2-1baf-7f2d-bad3-2d986ffc58d5",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-let-it-go",
  ownLength: 4.062666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QOelbDFgwXiagpUHBxARi",
      externalLink: "https://open.spotify.com/track/3QOelbDFgwXiagpUHBxARi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|243760",
  song: "song/the-piano-guys-let-it-go",
} as const satisfies Track
