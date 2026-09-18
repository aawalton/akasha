import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderAireAtlanticaRemix = {
  id: "01a0b638-edc0-7e62-bd90-4d356f6ea646",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-aire-atlantica-remix",
  ownLength: 3.6953,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "75WGjm9867pcRxGwiLRwK8",
      externalLink: "https://open.spotify.com/track/75WGjm9867pcRxGwiLRwK8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Six Feet Under - Aire Atlantica Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "6Ta9RS3a6sLulTlM4FWY5K", artistName: "Aire Atlantica" },
  ],
  trackKey: "sixfeetunderaireatlanticaremix|6Ta9RS3a6sLulTlM4FWY5K,6qqNVTkY8uBg9cP3Jd7DAH|221718",
} as const satisfies Track
