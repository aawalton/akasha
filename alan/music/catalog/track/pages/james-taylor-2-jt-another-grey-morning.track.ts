import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtAnotherGreyMorning = {
  id: "01a0abeb-463d-75ff-ac30-a87ef4365de6",
  type: "page-type/track",
  slug: "james-taylor-2-jt-another-grey-morning",
  ownLength: 2.73785,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3eC5kxXAJ24pVZQkdi8r6U",
      externalLink: "https://open.spotify.com/track/3eC5kxXAJ24pVZQkdi8r6U",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Another Grey Morning",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "anothergreymorning|0vn7UBvSQECKJm2817Yf1P|164271",
  song: "song/james-taylor-another-grey-morning",
} as const satisfies Track
