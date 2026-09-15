import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLive = {
  id: "01a0676a-d72c-703b-a5ed-5ab521a92bc7",
  type: "page-type/release",
  slug: "paul-cardall-the-celebrate-life-concert-live",
  title: "The Celebrate Life Concert (Live)",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 60.050133,
  ownProgress: 60.050133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-09-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N3QPn6eIMFc73jfHxtCC1",
      externalLink: "https://open.spotify.com/album/5N3QPn6eIMFc73jfHxtCC1",
    },
  ],
} as const satisfies Release
