import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310Happier = {
  id: "01a0afa2-0b39-7b19-ab0a-e77182a02473",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-happier",
  ownLength: 3.74,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46ZIrFWY7doQykCs1JD0ip",
      externalLink: "https://open.spotify.com/track/46ZIrFWY7doQykCs1JD0ip",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Happier",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "happier|0jW6R8CVyVohuUJVcuweDI|224400",
} as const satisfies Track
