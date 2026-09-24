import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayColoraturaColoratura = {
  id: "01a0b9ee-ef5f-7c6d-b4dc-25778c03b3f9",
  type: "page-type/track",
  slug: "coldplay-coloratura-coloratura",
  ownLength: 10.316,
  ownProgress: 10.316,
  partOfCollections: ["release/coldplay-coloratura"],
  status: "completed",
  unit: "unit/minutes",
  title: "Coloratura",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "coloratura|4gzpq5DPGxSnKTe4SA8HAU|618960",
  song: "song/coldplay-coloratura",
  carriedBy: [
    {
      release: "release/coldplay-coloratura",
      discNumber: 1,
      position: 1,
      externalId: "6P2Y4KnF2x8uwZV2cZWA8t",
      externalLink: "https://open.spotify.com/track/6P2Y4KnF2x8uwZV2cZWA8t",
    },
  ],
} as const satisfies Track
