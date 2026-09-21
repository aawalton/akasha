import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheFlood = {
  id: "01a0676a-d72d-7012-b11d-f11c9761fcfc",
  type: "page-type/release",
  slug: "aurora-the-flood",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2025-04-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3T120QCrtTGvrVN2lxc8XP",
      externalLink: "https://open.spotify.com/album/3T120QCrtTGvrVN2lxc8XP",
    },
  ],
  title: "The Flood",
} as const satisfies Release
