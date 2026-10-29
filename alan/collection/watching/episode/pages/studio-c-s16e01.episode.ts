import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e01 = {
  id: "01a18855-c29e-7420-add8-a2b803bb4f68",
  type: "page-type/episode",
  slug: "studio-c-s16e01",
  description:
    "Jon Heder guest stars. Contestants can’t win a game show. Jon Heder and Jason Gray look for fans.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 1,
  publishedAt: "2022-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839034",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/1",
    },
  ],
  title: "Special Guest Jon Heder",
  episodeType: "standard",
  stillPath: "/l73Lb2656BAlIyogbocIerpReFg.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
