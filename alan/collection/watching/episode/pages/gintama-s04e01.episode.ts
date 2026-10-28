import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS04e01 = {
  id: "01a183d6-3268-7298-b819-9583169f1e91",
  type: "page-type/episode",
  slug: "gintama-s04e01",
  description:
    "Gintoki visits a barber shop to get his hair cut. After Kagura mentions that the seventh volume of the manga Abu is missing, the barber runs off to buy the volume and leaves the Yorozuya to look after the shop. After a while Katsura and Kondo enter the shop to get an image change. Then the Shogun enters suddenly the shop and wants a hair cut, too. The Yorozuya fall into despair because they don't even know how to cut hair properly.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-4"],
  position: 1,
  publishedAt: "2009-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940437",
      externalLink: "https://www.themoviedb.org/tv/57041/season/4/episode/1",
    },
  ],
  title: "A Conversation With a Barber During a Haircut is The Most Pointless Thing in The World",
  episodeType: "standard",
  stillPath: "/aRSfxB4SNLVqYrJ1GUOupTEwl9j.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
