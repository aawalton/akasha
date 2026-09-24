import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisDimitriVegasLikeMikeRemix = {
  id: "01a0b9ee-f2d7-7563-a8cd-b5648742b3f5",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-dimitri-vegas-like-mike-remix",
  ownLength: 3.8428833333333334,
  ownProgress: 3.8428833333333334,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This - Dimitri Vegas & Like Mike Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "The Chainsmokers" },
    { artist: "artist/coldplay" },
    { artistName: "Dimitri Vegas & Like Mike" },
  ],
  trackKey:
    "somethingjustlikethisdimitrivegaslikemikeremix|4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp,73jBynjsVtofjRpdpRAJGk|230573",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-something-just-like-this-remixes",
      discNumber: 1,
      position: 3,
      externalId: "3LewMbGqmR4IYtifSNxbGz",
      externalLink: "https://open.spotify.com/track/3LewMbGqmR4IYtifSNxbGz",
    },
  ],
} as const satisfies Track
