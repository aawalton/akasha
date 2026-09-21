import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionBabyBuffalo = {
  id: "01a0abeb-392b-7072-8ba5-6688e2c87c34",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-baby-buffalo",
  ownLength: 4.804883333333334,
  ownProgress: 4.804883333333334,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zwSHxzHHLv6pPCwj1QrxD",
      externalLink: "https://open.spotify.com/track/4zwSHxzHHLv6pPCwj1QrxD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Baby Buffalo",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "babybuffalo|0vn7UBvSQECKJm2817Yf1P|288293",
  song: "song/james-taylor-baby-buffalo",
  carriedBy: [
    {
      release: "release/james-taylor-2-october-road-special-edition",
      discNumber: 1,
      position: 11,
      externalId: "4zwSHxzHHLv6pPCwj1QrxD",
      externalLink: "https://open.spotify.com/track/4zwSHxzHHLv6pPCwj1QrxD",
    },
  ],
} as const satisfies Track
