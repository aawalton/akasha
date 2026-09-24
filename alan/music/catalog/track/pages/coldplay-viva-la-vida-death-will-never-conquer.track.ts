import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaDeathWillNeverConquer = {
  id: "01a0b9ee-fbd4-769f-a128-7c957191e6d0",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-death-will-never-conquer",
  ownLength: 1.29755,
  ownProgress: 1.29755,
  partOfCollections: ["release/coldplay-viva-la-vida"],
  status: "completed",
  unit: "unit/minutes",
  title: "Death Will Never Conquer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "deathwillneverconquer|4gzpq5DPGxSnKTe4SA8HAU|77853",
  song: "song/coldplay-death-will-never-conquer",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida",
      discNumber: 1,
      position: 2,
      externalId: "5XXjAYhslP3i0eDc8LSxDU",
      externalLink: "https://open.spotify.com/track/5XXjAYhslP3i0eDc8LSxDU",
    },
  ],
} as const satisfies Track
