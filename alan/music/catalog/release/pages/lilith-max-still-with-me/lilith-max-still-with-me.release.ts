import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxStillWithMe = {
  id: "01a0676a-d72a-701f-814c-75fe6622d3d7",
  type: "page-type/release",
  slug: "lilith-max-still-with-me",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2024-03-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2XFZGyKpNRX0FFT07EiYYh",
      externalLink: "https://open.spotify.com/album/2XFZGyKpNRX0FFT07EiYYh",
    },
  ],
  title: "Still with Me",
} as const satisfies Release
