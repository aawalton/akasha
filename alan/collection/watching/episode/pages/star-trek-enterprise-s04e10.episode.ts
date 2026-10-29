import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e10 = {
  id: "01a18852-d433-7390-9d85-6b3ae1d2204c",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e10",
  description:
    "The inventor of the transporter, Emory Erickson, comes aboard Enterprise for a risky experiment.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 10,
  publishedAt: "2005-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15621",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/10",
    },
  ],
  title: "Daedalus",
  episodeType: "standard",
  stillPath: "/wCBKaKeEI0Rdd22vM9vLSkSGm89.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
