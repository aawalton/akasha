import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310ASkyFullOfStars = {
  id: "01a0afa2-0be0-77ac-b26b-e0349bba0412",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-a-sky-full-of-stars",
  ownLength: 4.0909,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0OhlRpRBIK15U6ZbE59IIj",
      externalLink: "https://open.spotify.com/track/0OhlRpRBIK15U6ZbE59IIj",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Sky Full of Stars",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "askyfullofstars|0jW6R8CVyVohuUJVcuweDI|245454",
  song: "song/the-piano-guys-a-sky-full-of-stars",
} as const satisfies Track
