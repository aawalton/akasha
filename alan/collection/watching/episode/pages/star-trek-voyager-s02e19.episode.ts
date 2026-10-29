import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e19 = {
  id: "01a18853-ac8b-7b11-8c10-b967beec5c0a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e19",
  description:
    "Stardate: 46504.3. After receiving a Vidiian patient who is about to die from the Phage, the doctor transfers her consciousness into the ship's computer and creates a holographic body. He soon finds himself becoming deeply attracted to her.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 19,
  publishedAt: "1996-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113053",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/19",
    },
  ],
  title: "Lifesigns",
  episodeType: "standard",
  stillPath: "/ejjSsTDcfhXbDAQv2kaErHxuRRa.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
