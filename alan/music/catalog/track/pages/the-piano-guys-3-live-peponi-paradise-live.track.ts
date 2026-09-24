import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LivePeponiParadiseLive = {
  id: "01a0afa2-155b-7358-9ccd-4d1dfc421ea1",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-peponi-paradise-live",
  ownLength: 4.444883333333333,
  ownProgress: 4.444883333333333,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Peponi (Paradise) [Live]",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Alex Boyé" }],
  trackKey: "peponiparadiselive|0jW6R8CVyVohuUJVcuweDI,6SraGCznFUAZ3zb4zVe3DM|266693",
  song: "song/the-piano-guys-peponi-paradise",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 18,
      externalId: "4KTvBpuyzikbShNQ2wl3NQ",
      externalLink: "https://open.spotify.com/track/4KTvBpuyzikbShNQ2wl3NQ",
    },
  ],
} as const satisfies Track
