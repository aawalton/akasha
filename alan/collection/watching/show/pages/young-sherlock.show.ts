import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const youngSherlock = {
  id: "01a13bc8-759d-72e3-b601-ebfe7512c083",
  type: "page-type/show",
  slug: "young-sherlock",
  title: "Young Sherlock",
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "in-progress",
  publishedAt: "2026-03-04",
  externalIdentity: [
    {
      source: "prime-video",
      externalId: "0OHZJ90LNM4KVKJXM4K15HDQJR",
      externalLink: "https://www.primevideo.com/detail/0OHZJ90LNM4KVKJXM4K15HDQJR",
    },
    { source: "tmdb", externalId: "255661", externalLink: "https://www.themoviedb.org/tv/255661" },
  ],
  createdAt: "2026-10-14T18:59:15.484Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Show
