import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ahsokaSeason2 = {
  id: "01a18843-0b81-7177-a8bc-6b195420653b",
  type: "page-type/season",
  slug: "ahsoka-season-2",
  description:
    "Season 2 continues the story of Ahsoka Tano and her extraordinary journey beyond the known galaxy. As Ahsoka and her Jedi apprentice Sabine Wren travel across a mysterious and perilous world to find their way home, their friends Hera, Ezra, Zeb, and Chopper, must face the powerful Grand Admiral Thrawn and his sinister allies, who seek to plunge the New Republic into war.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ahsoka"],
  position: 2,
  publishedAt: "2027-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "536578",
      externalLink: "https://www.themoviedb.org/tv/114461/season/2",
    },
  ],
  title: "Ahsoka Season 2",
  posterPath: "/dVElGqAtvJo6AyhSawr69nkPWjU.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:17.663Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Season
