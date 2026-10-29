import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS04e05 = {
  id: "01a18854-50ab-79b5-a9fc-c5bde96d4369",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s04e05",
  description:
    "After groundquakes have devastated the planet Aleen, a Republic relief effort arrives, including the droids R2-D2 and C-3PO. When the native Aleena's pleas go unheard, it becomes the duty of the droids to embark on a surreal journey through Aleen's subterranean world to save the planet.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-4"],
  position: 5,
  publishedAt: "2011-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286669",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/5",
    },
  ],
  title: "Mercy Mission",
  episodeType: "standard",
  stillPath: "/5Mvq4mIarnQw2yTf6KKQBAiCqu1.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
