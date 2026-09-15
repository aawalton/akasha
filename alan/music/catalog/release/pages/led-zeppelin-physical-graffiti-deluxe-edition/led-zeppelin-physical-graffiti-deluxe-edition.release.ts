import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ledZeppelinPhysicalGraffitiDeluxeEdition = {
  id: "01a0676a-d726-7077-8980-ead213acda91",
  type: "release",
  slug: "led-zeppelin-physical-graffiti-deluxe-edition",
  title: "Physical Graffiti (Deluxe Edition)",
  partOfCollections: ["artist/led-zeppelin"],
  position: 0,
  ownLength: 124.434983,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1975-02-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "26tH0kjUhkxBEd3ipGkx3Y",
      externalLink: "https://open.spotify.com/album/26tH0kjUhkxBEd3ipGkx3Y",
    },
  ],
} as const satisfies Release
