import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e10 = {
  id: "01a1887f-e18a-7469-b814-190200dce4da",
  type: "page-type/episode",
  slug: "star-trek-2-s03e10",
  description:
    "The crew of the Enterprise encounters an ageless and sadistic race of humanoids with the power of telekinesis and who claim to have organized their society around Ancient Greek ideals.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 10,
  publishedAt: "1968-11-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14014",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/10",
    },
  ],
  title: "Plato's Stepchildren",
  episodeType: "standard",
  stillPath: "/ldHptFNjV5naAFNHkMW6uzYFeho.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
