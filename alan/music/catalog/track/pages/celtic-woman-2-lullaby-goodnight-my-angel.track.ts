import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyGoodnightMyAngel = {
  id: "01a0abea-7155-7a94-8d45-90a93b978614",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-goodnight-my-angel",
  ownLength: 3.2462166666666668,
  ownProgress: 3.2462166666666668,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Goodnight My Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "goodnightmyangel|6NWtt9pNOL2Gx7kBykdE5x|194773",
  song: "song/celtic-woman-goodnight-my-angel",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 4,
      externalId: "5bNTYrQBhfZ3v2TuS2hyfB",
      externalLink: "https://open.spotify.com/track/5bNTYrQBhfZ3v2TuS2hyfB",
    },
  ],
} as const satisfies Track
