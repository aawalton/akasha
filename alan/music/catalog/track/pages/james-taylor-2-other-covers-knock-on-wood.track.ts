import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversKnockOnWood = {
  id: "01a0abeb-3397-7a87-8172-976fa575918f",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-knock-on-wood",
  ownLength: 3.8688833333333332,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1AOJ3y1KKpt19Mzd1MyiJT",
      externalLink: "https://open.spotify.com/track/1AOJ3y1KKpt19Mzd1MyiJT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Knock On Wood",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "knockonwood|0vn7UBvSQECKJm2817Yf1P|232133",
  song: "song/james-taylor-knock-on-wood",
} as const satisfies Track
