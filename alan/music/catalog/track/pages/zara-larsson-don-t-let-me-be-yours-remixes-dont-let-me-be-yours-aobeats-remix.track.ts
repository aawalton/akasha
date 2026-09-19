import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonDonTLetMeBeYoursRemixesDontLetMeBeYoursAobeatsRemix = {
  id: "01a0aa7c-4097-7133-9986-e7d7339a9265",
  type: "page-type/track",
  slug: "zara-larsson-don-t-let-me-be-yours-remixes-dont-let-me-be-yours-aobeats-remix",
  ownLength: 4.183483333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-don-t-let-me-be-yours-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cIK52LNUYrLb6TOD4Ouq0",
      externalLink: "https://open.spotify.com/track/3cIK52LNUYrLb6TOD4Ouq0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Don't Let Me Be Yours - AObeats Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "2tfyKNBwTB41ArvliXX1zA", artistName: "AOBeats" },
  ],
  trackKey: "dontletmebeyoursaobeatsremix|1Xylc3o4UrD53lo9CvFvVg,2tfyKNBwTB41ArvliXX1zA|251009",
  song: "song/zara-larsson-don-t-let-me-be-yours",
} as const satisfies Track
