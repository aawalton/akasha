import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e01 = {
  id: "01a18843-5080-78fc-a333-dd54770f0ef0",
  type: "page-type/episode",
  slug: "babylon-5-s03e01",
  description:
    "An Earth Force investigator comes to Babylon 5 with Lt. Keffer's last recording, asking the ambassadors if they recognize the ship in it. Meanwhile, Londo takes steps to remove himself from the Shadows, and Sheridan takes the White Star out for its first mission.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 1,
  publishedAt: "1995-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235944",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/1",
    },
  ],
  title: "Matters of Honor",
  episodeType: "standard",
  stillPath: "/cq3kxN7Bd0awOZ4aFahqI40w4vK.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
