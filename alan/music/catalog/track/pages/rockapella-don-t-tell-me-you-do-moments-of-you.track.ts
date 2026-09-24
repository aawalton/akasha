import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoMomentsOfYou = {
  id: "01a0d52b-52dd-7353-aea1-ea966efd0ba3",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-moments-of-you",
  ownLength: 3.455766666666667,
  ownProgress: 3.455766666666667,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moments of You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "momentsofyou|1AFSUleuDTapVhm5zUf4ix|207346",
  song: "song/rockapella-moments-of-you",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 1,
      externalId: "1TeQN2A3YlUQiABNHj80Jq",
      externalLink: "https://open.spotify.com/track/1TeQN2A3YlUQiABNHj80Jq",
    },
  ],
} as const satisfies Track
