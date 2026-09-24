import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveAllOfMeLive = {
  id: "01a0afa2-1331-782b-99ab-0f9f73d12dcd",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-all-of-me-live",
  ownLength: 2.4953333333333334,
  ownProgress: 2.4953333333333334,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "All of Me (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "allofmelive|0jW6R8CVyVohuUJVcuweDI|149720",
  song: "song/the-piano-guys-all-of-me",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 3,
      externalId: "4aiFs6ayHT53BJYNvZwAzb",
      externalLink: "https://open.spotify.com/track/4aiFs6ayHT53BJYNvZwAzb",
    },
  ],
} as const satisfies Track
