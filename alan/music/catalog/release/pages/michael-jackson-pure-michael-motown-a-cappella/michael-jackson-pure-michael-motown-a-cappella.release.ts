import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonPureMichaelMotownACappella = {
  id: "01a0676a-d727-7034-a64b-11963678b2ab",
  type: "page-type/release",
  slug: "michael-jackson-pure-michael-motown-a-cappella",
  title: "Pure Michael: Motown A Cappella",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 27.4286,
  ownProgress: 27.4286,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2009-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NaoFCzy9TC9Y8e74ks72N",
      externalLink: "https://open.spotify.com/album/5NaoFCzy9TC9Y8e74ks72N",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
