import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderGazzoRemix = {
  id: "01a0b638-ed71-7a9c-b0fa-a76979db4061",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-gazzo-remix",
  ownLength: 3.466666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3UHa28GclZhNqqlaNFzKKY",
      externalLink: "https://open.spotify.com/track/3UHa28GclZhNqqlaNFzKKY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Six Feet Under - Gazzo Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "5st4KKihmnSMLRsxWOs2x3", artistName: "Gazzo" },
  ],
  trackKey: "sixfeetundergazzoremix|5st4KKihmnSMLRsxWOs2x3,6qqNVTkY8uBg9cP3Jd7DAH|208000",
  song: "song/billie-eilish-six-feet-under",
} as const satisfies Track
