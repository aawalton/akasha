import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheLookingGlass = {
  id: "01a0676a-d72d-7035-a618-716eb603f071",
  type: "page-type/release",
  slug: "paul-cardall-the-looking-glass",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "1999-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31tc6XnhHUP3WOWSfC2AuX",
      externalLink: "https://open.spotify.com/album/31tc6XnhHUP3WOWSfC2AuX",
    },
  ],
  title: "The Looking Glass",
} as const satisfies Release
