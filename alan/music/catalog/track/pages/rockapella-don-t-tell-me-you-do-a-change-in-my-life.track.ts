import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoAChangeInMyLife = {
  id: "01a0d52b-52dc-7d33-ac1a-6d83ba0a5299",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-a-change-in-my-life",
  ownLength: 4.63,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "not-started",
  unit: "unit/minutes",
  title: "A Change in My Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "achangeinmylife|1AFSUleuDTapVhm5zUf4ix|277800",
  song: "song/rockapella-a-change-in-my-life",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 7,
      externalId: "31oEJcA3WgnKXNQvTNXWuy",
      externalLink: "https://open.spotify.com/track/31oEJcA3WgnKXNQvTNXWuy",
    },
  ],
} as const satisfies Track
