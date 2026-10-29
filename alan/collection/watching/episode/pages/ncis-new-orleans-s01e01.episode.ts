import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e01 = {
  id: "01a1884b-3014-73ec-a2f0-ec3d6ec38fe5",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e01",
  description:
    "A case soon becomes personal for Pride after the body of a Petty Officer is identified as a former gang member he once attempted to help. Brody attempts to find the perfect place to call home in New Orleans.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 1,
  publishedAt: "2014-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1009950",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/1",
    },
  ],
  title: "Musician Heal Thyself",
  episodeType: "standard",
  stillPath: "/iCyfyycuC66DKxzB5Y85MM74oFK.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
