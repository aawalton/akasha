import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChristmasTogetherTheManger = {
  id: "01a0afa2-110c-718c-86b0-2b30ed479e3a",
  type: "page-type/track",
  slug: "the-piano-guys-3-christmas-together-the-manger",
  ownLength: 4.0072833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-christmas-together"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Azhx9AoHz79HY7YbIt7ds",
      externalLink: "https://open.spotify.com/track/5Azhx9AoHz79HY7YbIt7ds",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Manger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "themanger|0jW6R8CVyVohuUJVcuweDI|240437",
} as const satisfies Track
