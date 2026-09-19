import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeGoodAsHellFeatArianaGrandeRemixGoodAsHellFeatArianaGrandeRemix = {
  id: "01a0a6c5-39a3-7883-9332-b493feec7b25",
  type: "page-type/track",
  slug: "ariana-grande-good-as-hell-feat-ariana-grande-remix-good-as-hell-feat-ariana-grande-remix",
  ownLength: 2.650183333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-good-as-hell-feat-ariana-grande-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07Oz5StQ7GRoygNLaXs2pd",
      externalLink: "https://open.spotify.com/track/07Oz5StQ7GRoygNLaXs2pd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Good as Hell (feat. Ariana Grande) - Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "56oDRnqbIiwx4mymNEv7dS", artistName: "Lizzo" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "goodashellfeatarianagranderemix|56oDRnqbIiwx4mymNEv7dS,66CXWjxzNUsdJxJ2JdwvnR|159011",
  song: "song/ariana-grande-good-as-hell",
} as const satisfies Track
