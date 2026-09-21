import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsImagineDragonsSpotifySessions = {
  id: "01a0676a-d721-705b-80e1-5c718770e612",
  type: "page-type/release",
  slug: "imagine-dragons-imagine-dragons-spotify-sessions",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-04-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0XMkrjoxpwaGgb6MYgv2gA",
      externalLink: "https://open.spotify.com/album/0XMkrjoxpwaGgb6MYgv2gA",
    },
  ],
  title: "Imagine Dragons (Spotify Sessions)",
} as const satisfies Release
