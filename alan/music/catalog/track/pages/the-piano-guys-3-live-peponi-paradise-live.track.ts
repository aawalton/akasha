import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LivePeponiParadiseLive = {
  id: "01a0afa2-155b-7358-9ccd-4d1dfc421ea1",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-peponi-paradise-live",
  ownLength: 4.444883333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KTvBpuyzikbShNQ2wl3NQ",
      externalLink: "https://open.spotify.com/track/4KTvBpuyzikbShNQ2wl3NQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Peponi (Paradise) [Live]",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "6SraGCznFUAZ3zb4zVe3DM", artistName: "Alex Boyé" },
  ],
  trackKey: "peponiparadiselive|0jW6R8CVyVohuUJVcuweDI,6SraGCznFUAZ3zb4zVe3DM|266693",
  song: "song/the-piano-guys-peponi-paradise",
} as const satisfies Track
