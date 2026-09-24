import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionIntro = {
  id: "01a0a6c5-1621-7b69-a36a-4ab4a5ea26b6",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-intro",
  ownLength: 1.3294333333333332,
  ownProgress: 1.3294333333333332,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Intro",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "intro|66CXWjxzNUsdJxJ2JdwvnR|79766",
  song: "song/ariana-grande-intro",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 1,
      externalId: "1djLdPkMQCbF1iENkeqXJG",
      externalLink: "https://open.spotify.com/track/1djLdPkMQCbF1iENkeqXJG",
    },
  ],
} as const satisfies Track
