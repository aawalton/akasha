import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixJoyfulJoyful = {
  id: "01a0676a-d722-702b-a518-feafb4616178",
  type: "page-type/release",
  slug: "pentatonix-joyful-joyful",
  title: "Joyful, Joyful",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.907767,
  ownProgress: 3.907767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "208bCz548yflYMALLMh1kN",
      externalLink: "https://open.spotify.com/album/208bCz548yflYMALLMh1kN",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
