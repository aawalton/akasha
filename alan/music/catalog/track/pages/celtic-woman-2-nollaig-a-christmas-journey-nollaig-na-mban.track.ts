import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2NollaigAChristmasJourneyNollaigNaMban = {
  id: "01a0abea-4fda-7084-abab-d42e3746fc8d",
  type: "page-type/track",
  slug: "celtic-woman-2-nollaig-a-christmas-journey-nollaig-na-mban",
  ownLength: 4.7793833333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-nollaig-a-christmas-journey"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0K80LLk2ilqtNl6MAbmzR7",
      externalLink: "https://open.spotify.com/track/0K80LLk2ilqtNl6MAbmzR7",
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
