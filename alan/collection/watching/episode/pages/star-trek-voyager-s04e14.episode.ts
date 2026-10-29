import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e14 = {
  id: "01a18853-ac8e-7257-b18d-df140cea650d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e14",
  description:
    "Stardate: Unknown. When Seven discovers an alien communications array, the crew devises a way of sending the Doctor's program across it into the Alpha Quadrant, where he finds himself aboard a Starfleet vessel that has been commandeered by the Romulans.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 14,
  publishedAt: "1998-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113172",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/14",
    },
  ],
  title: "Message in a Bottle",
  episodeType: "standard",
  stillPath: "/688KRWUsLYgh3siW07Uomkm0lta.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
