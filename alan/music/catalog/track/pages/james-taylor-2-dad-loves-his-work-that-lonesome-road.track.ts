import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkThatLonesomeRoad = {
  id: "01a0abeb-4460-752b-be84-829424df0294",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-that-lonesome-road",
  ownLength: 2.3566666666666665,
  ownProgress: 2.3566666666666665,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "That Lonesome Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "thatlonesomeroad|0vn7UBvSQECKJm2817Yf1P|141400",
  song: "song/james-taylor-that-lonesome-road",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 11,
      externalId: "04RAcppX0YjUqDYWy4nAix",
      externalLink: "https://open.spotify.com/track/04RAcppX0YjUqDYWy4nAix",
    },
  ],
} as const satisfies Track
