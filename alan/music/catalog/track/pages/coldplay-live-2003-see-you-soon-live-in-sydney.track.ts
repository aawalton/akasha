import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003SeeYouSoonLiveInSydney = {
  id: "01a0b9ee-e673-707f-b1de-bfb62ae78dab",
  type: "page-type/track",
  slug: "coldplay-live-2003-see-you-soon-live-in-sydney",
  ownLength: 3.4851,
  ownProgress: 3.4851,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "See You Soon - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "seeyousoonliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|209106",
  song: "song/coldplay-see-you-soon",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 5,
      externalId: "4o0q6U6VX4a0VTZ06GOxg2",
      externalLink: "https://open.spotify.com/track/4o0q6U6VX4a0VTZ06GOxg2",
    },
  ],
} as const satisfies Track
