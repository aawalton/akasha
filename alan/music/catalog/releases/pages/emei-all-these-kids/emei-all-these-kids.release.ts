import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const emeiAllTheseKids = {
  id: "01a0676a-d716-7027-ae55-99e44823186a",
  type: "release",
  slug: "emei-all-these-kids",
  title: "ALL THESE KIDS",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 4.3089,
  ownProgress: 4.3089,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-09-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PiygkH7sI89FdZc9GVdKM",
      externalLink: "https://open.spotify.com/album/2PiygkH7sI89FdZc9GVdKM",
    },
  ],
} as const satisfies Release
