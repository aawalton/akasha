import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1SkippinABeat = {
  id: "01a0aa7c-3423-77e4-91aa-9b14108d0cd8",
  type: "page-type/track",
  slug: "zara-larsson-1-skippin-a-beat",
  ownLength: 2.7310166666666666,
  ownProgress: 2.7310166666666666,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Skippin A Beat",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "skippinabeat|1Xylc3o4UrD53lo9CvFvVg|163861",
  song: "song/zara-larsson-skippin-a-beat",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 1,
      externalId: "5OYANUpKMMHodc3QM1crJB",
      externalLink: "https://open.spotify.com/track/5OYANUpKMMHodc3QM1crJB",
    },
  ],
} as const satisfies Track
