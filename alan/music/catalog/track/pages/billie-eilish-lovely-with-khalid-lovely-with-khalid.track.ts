import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishLovelyWithKhalidLovelyWithKhalid = {
  id: "01a0b638-eaa9-7150-97e9-ed727e55e327",
  type: "page-type/track",
  slug: "billie-eilish-lovely-with-khalid-lovely-with-khalid",
  ownLength: 3.3364166666666666,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-lovely-with-khalid"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0u2P5u6lvoDfwTYjAADbn4",
      externalLink: "https://open.spotify.com/track/0u2P5u6lvoDfwTYjAADbn4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "lovely (with Khalid)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "6LuN9FCkKOj5PcnpouEgny", artistName: "Khalid" },
  ],
  trackKey: "lovelywithkhalid|6LuN9FCkKOj5PcnpouEgny,6qqNVTkY8uBg9cP3Jd7DAH|200185",
  song: "song/billie-eilish-lovely-2",
} as const satisfies Track
