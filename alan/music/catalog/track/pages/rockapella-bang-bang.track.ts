import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangBang = {
  id: "01a0d52b-52db-7d7a-88a2-297d7313966a",
  type: "page-type/track",
  slug: "rockapella-bang-bang",
  ownLength: 3.25195,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bang",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "bang|1AFSUleuDTapVhm5zUf4ix|195117",
  song: "song/rockapella-bang",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 1,
      externalId: "4sOAPMhMWmvL5kB3oi8BY0",
      externalLink: "https://open.spotify.com/track/4sOAPMhMWmvL5kB3oi8BY0",
    },
  ],
} as const satisfies Track
