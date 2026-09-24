import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtTrafficJam = {
  id: "01a0abeb-46fc-7d6a-976a-8b94049c06be",
  type: "page-type/track",
  slug: "james-taylor-2-jt-traffic-jam",
  ownLength: 1.9747333333333332,
  ownProgress: 1.9747333333333332,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Traffic Jam",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "trafficjam|0vn7UBvSQECKJm2817Yf1P|118484",
  song: "song/james-taylor-traffic-jam",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 11,
      externalId: "3vr78UtsASit0Iwhps8HnE",
      externalLink: "https://open.spotify.com/track/3vr78UtsASit0Iwhps8HnE",
    },
  ],
} as const satisfies Track
