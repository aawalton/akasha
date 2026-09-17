import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3TheFirstNoelTheFirstNoel = {
  id: "01a0afa1-e669-72aa-a40d-cfca3a684206",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-first-noel-the-first-noel",
  ownLength: 2.816666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-first-noel"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EbQF0Tt5n7xgn62gJjGbi",
      externalLink: "https://open.spotify.com/track/7EbQF0Tt5n7xgn62gJjGbi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The First Noel",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thefirstnoel|0jW6R8CVyVohuUJVcuweDI|169000",
} as const satisfies Track
