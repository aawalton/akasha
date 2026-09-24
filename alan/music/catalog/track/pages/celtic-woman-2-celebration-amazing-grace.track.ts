import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationAmazingGrace = {
  id: "01a0abea-559a-77d8-8229-e39b5fc68864",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-amazing-grace",
  ownLength: 5.0151,
  ownProgress: 5.0151,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amazing Grace",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "amazinggrace|6NWtt9pNOL2Gx7kBykdE5x|300906",
  song: "song/celtic-woman-amazing-grace",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 6,
      externalId: "7wfewEg6wiNeYUcBPT4b0w",
      externalLink: "https://open.spotify.com/track/7wfewEg6wiNeYUcBPT4b0w",
    },
  ],
} as const satisfies Track
