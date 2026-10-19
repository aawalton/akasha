import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixDoYouHearWhatIHear = {
  id: "01a0676a-d71c-701b-872d-32588f9dfd6d",
  type: "page-type/release",
  slug: "pentatonix-do-you-hear-what-i-hear",
  title: "Do You Hear What I Hear?",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CemHS52SCDMHQ2JQ2kRdR",
      externalLink: "https://open.spotify.com/album/1CemHS52SCDMHQ2JQ2kRdR",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
