import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003InMyPlaceLiveInSydney = {
  id: "01a0b9ee-e744-7c9e-9c85-882b360dfeda",
  type: "page-type/track",
  slug: "coldplay-live-2003-in-my-place-live-in-sydney",
  ownLength: 4.2184333333333335,
  ownProgress: 4.2184333333333335,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Place - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "inmyplaceliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|253106",
  song: "song/coldplay-in-my-place",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 11,
      externalId: "3osu6FKSmLJJmqnRw5R90G",
      externalLink: "https://open.spotify.com/track/3osu6FKSmLJJmqnRw5R90G",
    },
  ],
} as const satisfies Track
