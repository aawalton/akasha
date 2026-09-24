import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2HomeForChristmasWeThreeKings = {
  id: "01a0abea-6d90-7cf8-8e20-a26d6fdf3bc2",
  type: "page-type/track",
  slug: "celtic-woman-2-home-for-christmas-we-three-kings",
  ownLength: 3.6193333333333335,
  ownProgress: 3.6193333333333335,
  partOfCollections: ["release/celtic-woman-2-home-for-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "We Three Kings",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "wethreekings|6NWtt9pNOL2Gx7kBykdE5x|217160",
  song: "song/celtic-woman-we-three-kings",
  carriedBy: [
    {
      release: "release/celtic-woman-2-home-for-christmas",
      discNumber: 1,
      position: 5,
      externalId: "46Nsjnb8gupZ0rL54zXbaW",
      externalLink: "https://open.spotify.com/track/46Nsjnb8gupZ0rL54zXbaW",
    },
  ],
} as const satisfies Track
