import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYWhatIf = {
  id: "01a0b9ee-e409-7ba6-8311-2e5b9cd08625",
  type: "page-type/track",
  slug: "coldplay-x-y-what-if",
  ownLength: 4.975316666666667,
  ownProgress: 4.975316666666667,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "What If",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "whatif|4gzpq5DPGxSnKTe4SA8HAU|298519",
  song: "song/coldplay-what-if",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 2,
      externalId: "39qRdHcl2tizWbzlM9kUlN",
      externalLink: "https://open.spotify.com/track/39qRdHcl2tizWbzlM9kUlN",
    },
  ],
} as const satisfies Track
