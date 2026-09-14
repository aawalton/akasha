import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const ledZeppelinPhysicalGraffitiRemaster = {
  id: "01a0676a-d726-7078-848b-576218718753",
  type: "release",
  slug: "led-zeppelin-physical-graffiti-remaster",
  title: "Physical Graffiti (Remaster)",
  partOfCollections: ["artist/led-zeppelin"],
  position: 0,
  ownLength: 82.897467,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1975-02-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Q7cPyiP8cMIlUEHAqeYfd",
      externalLink: "https://open.spotify.com/album/4Q7cPyiP8cMIlUEHAqeYfd",
    },
  ],
} as const satisfies Release
