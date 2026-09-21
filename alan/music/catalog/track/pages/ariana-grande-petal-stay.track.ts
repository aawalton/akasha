import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalStay = {
  id: "01a0a6c5-0444-725d-bf6b-c73e25ae718f",
  type: "page-type/track",
  slug: "ariana-grande-petal-stay",
  ownLength: 2.4736666666666665,
  ownProgress: 2.4736666666666665,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "stay",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "stay|66CXWjxzNUsdJxJ2JdwvnR|148420",
  song: "song/ariana-grande-stay",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 4,
      externalId: "0QltPqkR4dnhbINyBOU5SY",
      externalLink: "https://open.spotify.com/track/0QltPqkR4dnhbINyBOU5SY",
    },
  ],
} as const satisfies Track
