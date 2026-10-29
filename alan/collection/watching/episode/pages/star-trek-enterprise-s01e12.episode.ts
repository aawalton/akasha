import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e12 = {
  id: "01a18852-d430-70c1-93e2-6f8e572a56aa",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e12",
  description:
    "When Enterprise is attacked by an unidentified enemy ship, the crew must work frantically to get their new phase canons to operate. Meanwhile, the captain charges Hoshi with finding out Malcolm's favorite food in time for a surprise birthday dinner.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 12,
  publishedAt: "2002-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15547",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/12",
    },
  ],
  title: "Silent Enemy",
  episodeType: "standard",
  stillPath: "/gAwGlbId6yt7YxKwLfx4WvPxW8f.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
