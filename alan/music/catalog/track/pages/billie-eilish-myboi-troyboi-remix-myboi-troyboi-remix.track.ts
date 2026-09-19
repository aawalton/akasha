import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishMyboiTroyboiRemixMyboiTroyboiRemix = {
  id: "01a0b638-eaf6-7764-b143-153ca0b580fd",
  type: "page-type/track",
  slug: "billie-eilish-myboi-troyboi-remix-myboi-troyboi-remix",
  ownLength: 3.521733333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-myboi-troyboi-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1T3E8z6VMXSsACrBSQHTkN",
      externalLink: "https://open.spotify.com/track/1T3E8z6VMXSsACrBSQHTkN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "MyBoi - TroyBoi Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "0tvpihdAsKiNnP6sWS3jUI", artistName: "TroyBoi" },
  ],
  trackKey: "myboitroyboiremix|0tvpihdAsKiNnP6sWS3jUI,6qqNVTkY8uBg9cP3Jd7DAH|211304",
  song: "song/billie-eilish-myboi",
} as const satisfies Track
