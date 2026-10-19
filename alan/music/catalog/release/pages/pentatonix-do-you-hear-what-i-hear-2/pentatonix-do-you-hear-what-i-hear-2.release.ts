import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixDoYouHearWhatIHear2 = {
  id: "01a0676a-d71c-701c-b9d8-d0ed245a7f09",
  type: "page-type/release",
  slug: "pentatonix-do-you-hear-what-i-hear-2",
  title: "Do You Hear What I Hear?",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-12-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FJVY528PwIOfqDkAn25a4",
      externalLink: "https://open.spotify.com/album/2FJVY528PwIOfqDkAn25a4",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
