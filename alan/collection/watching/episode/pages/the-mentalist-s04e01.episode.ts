import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS04e01 = {
  id: "01a18880-75e8-7f3d-b507-72a98d87f931",
  type: "page-type/episode",
  slug: "the-mentalist-s04e01",
  description:
    "In prison for killing his nemesis, Patrick Jane must prove that the man he shot really was Red John. Meanwhile, Lisbon urges Van Pelt to seek counseling in the aftermath of the death of her fiancé.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-4"],
  position: 1,
  publishedAt: "2011-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367764",
      externalLink: "https://www.themoviedb.org/tv/5920/season/4/episode/1",
    },
  ],
  title: "Scarlet Ribbons",
  episodeType: "standard",
  stillPath: "/5oME6nECiONQSAlYAuwNLpXVWX8.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
