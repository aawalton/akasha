import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1CantHoldBack = {
  id: "01a0aa7c-34cd-790d-b29f-a293293d84cc",
  type: "page-type/track",
  slug: "zara-larsson-1-cant-hold-back",
  ownLength: 3.6803166666666667,
  ownProgress: 3.6803166666666667,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Can't Hold Back",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "cantholdback|1Xylc3o4UrD53lo9CvFvVg|220819",
  song: "song/zara-larsson-can-t-hold-back",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 6,
      externalId: "6XtuvafYJpfFyKi0ijqggr",
      externalLink: "https://open.spotify.com/track/6XtuvafYJpfFyKi0ijqggr",
    },
  ],
} as const satisfies Track
