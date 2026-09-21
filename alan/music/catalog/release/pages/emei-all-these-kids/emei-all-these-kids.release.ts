import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiAllTheseKids = {
  id: "01a0676a-d716-7027-ae55-99e44823186a",
  type: "page-type/release",
  slug: "emei-all-these-kids",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-09-20",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PiygkH7sI89FdZc9GVdKM",
      externalLink: "https://open.spotify.com/album/2PiygkH7sI89FdZc9GVdKM",
    },
  ],
  title: "ALL THESE KIDS",
} as const satisfies Release
