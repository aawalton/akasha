import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionBeMyBaby = {
  id: "01a0a6c5-16ed-7fdd-96e9-b4007e8391ca",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-be-my-baby",
  ownLength: 3.6175,
  ownProgress: 3.6175,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Be My Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Cashmere Cat" }],
  trackKey: "bemybaby|2LZDXcxJWgsJfKXZv9a5eG,66CXWjxzNUsdJxJ2JdwvnR|217050",
  song: "song/ariana-grande-be-my-baby",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 7,
      externalId: "0BFkaHSK8Irpp9KX7XUsvd",
      externalLink: "https://open.spotify.com/track/0BFkaHSK8Irpp9KX7XUsvd",
    },
  ],
} as const satisfies Track
