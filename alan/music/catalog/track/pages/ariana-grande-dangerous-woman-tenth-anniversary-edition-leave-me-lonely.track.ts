import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionLeaveMeLonely = {
  id: "01a0a6c5-0656-781b-b9fc-ff31a6511968",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-leave-me-lonely",
  grade: "A",
  ownLength: 3.82795,
  ownProgress: 3.82795,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Leave Me Lonely",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4ylR3zwA0zaapAu94fktwa", artistName: "Macy Gray" },
  ],
  trackKey: "leavemelonely|4ylR3zwA0zaapAu94fktwa,66CXWjxzNUsdJxJ2JdwvnR|229677",
  song: "song/ariana-grande-leave-me-lonely",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman-tenth-anniversary-edition",
      discNumber: 1,
      position: 8,
      externalId: "3z8MkhnA2WVfzoCrt3bM5j",
      externalLink: "https://open.spotify.com/track/3z8MkhnA2WVfzoCrt3bM5j",
    },
  ],
} as const satisfies Track
