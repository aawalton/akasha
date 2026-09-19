import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverGettingOlder = {
  id: "01a0b638-e3a7-79ef-81b1-f198b1af13c6",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-getting-older",
  ownLength: 4.07035,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HOryCnbme0zBnF8LWij3f",
      externalLink: "https://open.spotify.com/track/4HOryCnbme0zBnF8LWij3f",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Getting Older",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "gettingolder|6qqNVTkY8uBg9cP3Jd7DAH|244221",
  song: "song/billie-eilish-getting-older",
} as const satisfies Track
