import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2NollaigNaMbanNollaigNaMban = {
  id: "01a0abea-7a7c-7805-b078-de1b90b76818",
  type: "page-type/track",
  slug: "celtic-woman-2-nollaig-na-mban-nollaig-na-mban",
  ownLength: 4.7793833333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-nollaig-na-mban"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qWuetc3xVFmKJ7s2CSVjK",
      externalLink: "https://open.spotify.com/track/2qWuetc3xVFmKJ7s2CSVjK",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Nollaig na mBan",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "0KT1pvlMlEkRJVQ1TKHhdj", artistName: "Sibéal" },
  ],
  trackKey: "nollaignamban|0KT1pvlMlEkRJVQ1TKHhdj,6NWtt9pNOL2Gx7kBykdE5x|286763",
  song: "song/celtic-woman-nollaig-na-mban",
} as const satisfies Track
