import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonMyDecember = {
  id: "01a0676a-d725-7024-bcf7-081589d29536",
  type: "page-type/release",
  slug: "kelly-clarkson-my-december",
  title: "My December",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 70.583017,
  ownProgress: 70.583017,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LgTmVlUlNWsfriBJ0jury",
      externalLink: "https://open.spotify.com/album/4LgTmVlUlNWsfriBJ0jury",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
