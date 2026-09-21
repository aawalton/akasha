import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLetSomebodyGoOfenbachRemix = {
  id: "01a0676a-d723-7023-936a-eb63b497ac0f",
  type: "page-type/release",
  slug: "coldplay-let-somebody-go-ofenbach-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2022-04-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lbSZjlBsWuXtR3WqsdOSN",
      externalLink: "https://open.spotify.com/album/7lbSZjlBsWuXtR3WqsdOSN",
    },
  ],
  title: "Let Somebody Go (Ofenbach Remix)",
} as const satisfies Release
