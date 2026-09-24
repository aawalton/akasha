import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1WannaBeYourBaby = {
  id: "01a0aa7c-3448-7c4e-9ff7-b89f58d5e859",
  type: "page-type/track",
  slug: "zara-larsson-1-wanna-be-your-baby",
  ownLength: 3.080783333333333,
  ownProgress: 3.080783333333333,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wanna Be Your Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "wannabeyourbaby|1Xylc3o4UrD53lo9CvFvVg|184847",
  song: "song/zara-larsson-wanna-be-your-baby",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 2,
      externalId: "5D8VLjaTQLbf8H7aNdA4Bz",
      externalLink: "https://open.spotify.com/track/5D8VLjaTQLbf8H7aNdA4Bz",
    },
  ],
} as const satisfies Track
