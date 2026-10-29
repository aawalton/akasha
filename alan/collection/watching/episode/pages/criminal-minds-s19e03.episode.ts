import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS19e03 = {
  id: "01a18844-d7fb-7d17-bcba-38d863ed674c",
  type: "page-type/episode",
  slug: "criminal-minds-s19e03",
  description:
    "When new bodies are linked to Sicarius, the BAU takes Voit into the field to verify the killings.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-19"],
  position: 3,
  publishedAt: "2026-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7166548",
      externalLink: "https://www.themoviedb.org/tv/4057/season/19/episode/3",
    },
  ],
  title: "Body Count",
  episodeType: "standard",
  stillPath: "/2ntH3Alr4SUwYrSES6upPzN57Ud.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
