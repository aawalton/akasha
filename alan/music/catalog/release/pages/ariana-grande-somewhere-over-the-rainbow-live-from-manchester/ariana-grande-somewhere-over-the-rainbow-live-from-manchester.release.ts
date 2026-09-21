import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSomewhereOverTheRainbowLiveFromManchester = {
  id: "01a0676a-d729-7060-852f-dfadf390bd04",
  type: "page-type/release",
  slug: "ariana-grande-somewhere-over-the-rainbow-live-from-manchester",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2017-06-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DZ9A2AgtgmezypepyYGeJ",
      externalLink: "https://open.spotify.com/album/5DZ9A2AgtgmezypepyYGeJ",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Somewhere Over The Rainbow (Live From Manchester)",
} as const satisfies Release
