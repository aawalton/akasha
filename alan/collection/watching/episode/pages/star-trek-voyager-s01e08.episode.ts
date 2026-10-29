import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e08 = {
  id: "01a18853-ac89-7e17-b2c0-9a189223eb38",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e08",
  description:
    "Stardate: 48623.5. A transporter accident swaps Harry Kim with a dying woman from another dimension. Harry finds himself among aliens who believe he’s returned from their afterlife, while the woman, expecting paradise, wakes up on the Voyager.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 8,
  publishedAt: "1995-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112914",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/8",
    },
  ],
  title: "Emanations",
  episodeType: "standard",
  stillPath: "/yweYJYsM2WNN3DnGfceICzfX3Tk.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
