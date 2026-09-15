import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nsync2ByeByeBye = {
  id: "01a0676a-d719-704f-ae71-e68201cd7a6a",
  type: "page-type/release",
  slug: "nsync-2-bye-bye-bye",
  title: "Bye Bye Bye",
  partOfCollections: ["artist/nsync"],
  position: 0,
  ownLength: 3.34,
  ownProgress: 3.34,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-01-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GUIkRnz03vje7l2mkG2NA",
      externalLink: "https://open.spotify.com/album/5GUIkRnz03vje7l2mkG2NA",
    },
  ],
} as const satisfies Release
