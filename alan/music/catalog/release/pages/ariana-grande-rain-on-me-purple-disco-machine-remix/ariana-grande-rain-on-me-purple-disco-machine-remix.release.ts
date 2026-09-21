import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeRainOnMePurpleDiscoMachineRemix = {
  id: "01a0676a-d727-7045-8bce-031b17730445",
  type: "page-type/release",
  slug: "ariana-grande-rain-on-me-purple-disco-machine-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2020-07-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42hbqXgvZ1dI3gQ1ZDnHA5",
      externalLink: "https://open.spotify.com/album/42hbqXgvZ1dI3gQ1ZDnHA5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Rain On Me (Purple Disco Machine Remix)",
} as const satisfies Release
