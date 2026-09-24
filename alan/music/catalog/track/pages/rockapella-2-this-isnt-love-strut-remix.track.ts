import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2ThisIsntLoveStrutRemix = {
  id: "01a0d52b-52db-72ed-8634-8199dda859cf",
  type: "page-type/track",
  slug: "rockapella-2-this-isnt-love-strut-remix",
  ownLength: 3.9520333333333335,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "This Isn't Love - Strut Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "thisisntlovestrutremix|1AFSUleuDTapVhm5zUf4ix|237122",
  song: "song/rockapella-this-isnt-love",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 12,
      externalId: "7mVy2trgK7zhwhBbylS1ho",
      externalLink: "https://open.spotify.com/track/7mVy2trgK7zhwhBbylS1ho",
    },
  ],
} as const satisfies Track
