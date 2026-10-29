import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e03 = {
  id: "01a18884-b706-751e-a807-1b95d8cb3db1",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e03",
  description:
    "Stardate: 42286.3. Data and Geordi become involved with a holodeck program about Sherlock Holmes and his investigations, when they create Sherlock's arch nemesis, Moriarty; however, modifications to the Moriarty character include the capability of out-smarting Data, which leads to some unexpected consequences.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 3,
  publishedAt: "1988-12-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37088",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/3",
    },
  ],
  title: "Elementary, Dear Data",
  episodeType: "standard",
  stillPath: "/oXlgCMXPLbvjb2q2k0rN8qXHryh.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
