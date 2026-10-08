import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLive = {
  id: "01a0676a-d72c-703b-a5ed-5ab521a92bc7",
  type: "page-type/release",
  slug: "paul-cardall-the-celebrate-life-concert-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2010-09-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N3QPn6eIMFc73jfHxtCC1",
      externalLink: "https://open.spotify.com/album/5N3QPn6eIMFc73jfHxtCC1",
    },
  ],
  title: "The Celebrate Life Concert (Live)",
  createdAt: "2026-09-03T13:17:30.284Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
