import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaHowBoutNowHowBoutNow = {
  id: "01a0d52b-52dd-7a1a-b1e6-301130b2fb57",
  type: "page-type/track",
  slug: "rockapella-how-bout-now-how-bout-now",
  ownLength: 3.5054333333333334,
  ownProgress: 3.5054333333333334,
  partOfCollections: ["release/rockapella-how-bout-now"],
  status: "completed",
  unit: "unit/minutes",
  title: "How Bout Now?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "howboutnow|1AFSUleuDTapVhm5zUf4ix|210326",
  song: "song/rockapella-how-bout-now",
  carriedBy: [
    {
      release: "release/rockapella-how-bout-now",
      discNumber: 1,
      position: 1,
      externalId: "6aOAbLYrddqH7sk6p5LaBx",
      externalLink: "https://open.spotify.com/track/6aOAbLYrddqH7sk6p5LaBx",
    },
  ],
} as const satisfies Track
