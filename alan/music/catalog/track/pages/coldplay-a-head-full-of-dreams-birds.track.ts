import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsBirds = {
  id: "01a0b9ee-d524-7c0a-8783-edc33ba6880a",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-birds",
  ownLength: 3.818216666666667,
  ownProgress: 3.818216666666667,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Birds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "birds|4gzpq5DPGxSnKTe4SA8HAU|229093",
  song: "song/coldplay-birds",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 2,
      externalId: "3HWDWyIqWuLsTHECx9DvXF",
      externalLink: "https://open.spotify.com/track/3HWDWyIqWuLsTHECx9DvXF",
    },
  ],
} as const satisfies Track
