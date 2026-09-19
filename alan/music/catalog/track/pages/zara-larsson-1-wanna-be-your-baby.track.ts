import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1WannaBeYourBaby = {
  id: "01a0aa7c-3448-7c4e-9ff7-b89f58d5e859",
  type: "page-type/track",
  slug: "zara-larsson-1-wanna-be-your-baby",
  ownLength: 3.080783333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5D8VLjaTQLbf8H7aNdA4Bz",
      externalLink: "https://open.spotify.com/track/5D8VLjaTQLbf8H7aNdA4Bz",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Wanna Be Your Baby",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "wannabeyourbaby|1Xylc3o4UrD53lo9CvFvVg|184847",
  song: "song/zara-larsson-wanna-be-your-baby",
} as const satisfies Track
