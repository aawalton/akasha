import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSideToSideRemixesSideToSideSlushiiRemix = {
  id: "01a0a6c5-38de-782b-9bf0-29fd6bb3d207",
  type: "page-type/track",
  slug: "ariana-grande-side-to-side-remixes-side-to-side-slushii-remix",
  ownLength: 3.374,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-side-to-side-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27WOAkJrAYagnYj7Y2tsFw",
      externalLink: "https://open.spotify.com/track/27WOAkJrAYagnYj7Y2tsFw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Side To Side - Slushii Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
    { externalId: "41rVuRHYAiH7ltBTHVR9We", artistName: "Slushii" },
  ],
  trackKey:
    "sidetosideslushiiremix|0hCNtLu0JehylgoiP8L4Gh,41rVuRHYAiH7ltBTHVR9We,66CXWjxzNUsdJxJ2JdwvnR|202440",
  song: "song/ariana-grande-side-to-side",
} as const satisfies Track
