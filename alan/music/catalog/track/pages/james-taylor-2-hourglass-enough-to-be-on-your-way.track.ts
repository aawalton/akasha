import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassEnoughToBeOnYourWay = {
  id: "01a0abeb-39fd-721e-91de-f8128d226647",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-enough-to-be-on-your-way",
  ownLength: 5.448883333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "153KKNnw2TZh4L1FiqggRp",
      externalLink: "https://open.spotify.com/track/153KKNnw2TZh4L1FiqggRp",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Enough To Be On Your Way",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "enoughtobeonyourway|0vn7UBvSQECKJm2817Yf1P|326933",
} as const satisfies Track
