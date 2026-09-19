import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonDonTWorryBoutMeRemixesDontWorryBoutMeRudimentalRemix = {
  id: "01a0aa7c-3e55-702f-b658-a1b0d5783d4d",
  type: "page-type/track",
  slug: "zara-larsson-don-t-worry-bout-me-remixes-dont-worry-bout-me-rudimental-remix",
  ownLength: 3.21895,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-don-t-worry-bout-me-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0YftavVa8tCdwosp2yR1PQ",
      externalLink: "https://open.spotify.com/track/0YftavVa8tCdwosp2yR1PQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Don't Worry Bout Me - Rudimental Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "4WN5naL3ofxrVBgFpguzKo", artistName: "Rudimental" },
  ],
  trackKey: "dontworryboutmerudimentalremix|1Xylc3o4UrD53lo9CvFvVg,4WN5naL3ofxrVBgFpguzKo|193137",
  song: "song/zara-larsson-don-t-worry-bout-me",
} as const satisfies Track
