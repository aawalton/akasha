import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2ANewJourney = {
  id: "01a0676a-d715-7037-88d7-1bccfa64972e",
  type: "page-type/release",
  slug: "celtic-woman-2-a-new-journey",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2007-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1og5dt9eliYqKQG8eBH9jf",
      externalLink: "https://open.spotify.com/album/1og5dt9eliYqKQG8eBH9jf",
    },
  ],
  title: "A New Journey",
} as const satisfies Release
