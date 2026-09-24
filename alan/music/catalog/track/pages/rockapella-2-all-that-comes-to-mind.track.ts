import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2AllThatComesToMind = {
  id: "01a0d52b-52da-791c-90a1-85c01aab5867",
  type: "page-type/track",
  slug: "rockapella-2-all-that-comes-to-mind",
  ownLength: 3.3653333333333335,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "All That Comes to Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "allthatcomestomind|1AFSUleuDTapVhm5zUf4ix|201920",
  song: "song/rockapella-all-that-comes-to-mind",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 10,
      externalId: "6QB6cTXPnuzeUHFAy4FScv",
      externalLink: "https://open.spotify.com/track/6QB6cTXPnuzeUHFAy4FScv",
    },
  ],
} as const satisfies Track
