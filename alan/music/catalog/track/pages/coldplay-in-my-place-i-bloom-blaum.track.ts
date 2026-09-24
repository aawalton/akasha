import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayInMyPlaceIBloomBlaum = {
  id: "01a0b9ef-01ec-799d-b097-81993cd08b88",
  type: "page-type/track",
  slug: "coldplay-in-my-place-i-bloom-blaum",
  ownLength: 2.1848833333333335,
  ownProgress: 2.1848833333333335,
  partOfCollections: ["release/coldplay-in-my-place"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Bloom Blaum",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "ibloomblaum|4gzpq5DPGxSnKTe4SA8HAU|131093",
  song: "song/coldplay-i-bloom-blaum",
  carriedBy: [
    {
      release: "release/coldplay-in-my-place",
      discNumber: 1,
      position: 3,
      externalId: "6MCvGN1ZTLa3PZkGnLWccm",
      externalLink: "https://open.spotify.com/track/6MCvGN1ZTLa3PZkGnLWccm",
    },
  ],
} as const satisfies Track
