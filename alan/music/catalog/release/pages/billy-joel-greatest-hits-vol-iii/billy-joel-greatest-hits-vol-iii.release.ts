import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelGreatestHitsVolIii = {
  id: "01a0676a-d71f-702f-97a1-131d60d1b948",
  type: "page-type/release",
  slug: "billy-joel-greatest-hits-vol-iii",
  title: "Greatest Hits Vol. III",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 75.8508,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1997-06-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cJ6ZymbUcNGe1T8YZtGyE",
      externalLink: "https://open.spotify.com/album/3cJ6ZymbUcNGe1T8YZtGyE",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
