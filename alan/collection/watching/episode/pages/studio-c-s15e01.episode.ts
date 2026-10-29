import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS15e01 = {
  id: "01a18855-c29e-7738-a7fe-712d67740e05",
  type: "page-type/episode",
  slug: "studio-c-s15e01",
  description:
    "Will Forte (Saturday Night Live, The Last Man on Earth) guest stars. A super villain's cat has a secret. A worker is stuck in a vat of cereal. Behind the scenes of the recording session for the Seinfeld theme song.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-15"],
  position: 1,
  publishedAt: "2022-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3750971",
      externalLink: "https://www.themoviedb.org/tv/68207/season/15/episode/1",
    },
  ],
  title: "With Special Guest Will Forte",
  episodeType: "standard",
  stillPath: "/do1xlaWvNSP8zU3Aj95fIXfcRD7.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
