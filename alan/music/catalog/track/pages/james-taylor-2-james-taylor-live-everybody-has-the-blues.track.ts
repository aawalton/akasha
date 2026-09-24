import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveEverybodyHasTheBlues = {
  id: "01a0abeb-3c7b-7155-af8b-5dae208bb08f",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-everybody-has-the-blues",
  ownLength: 2.56555,
  ownProgress: 2.56555,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everybody Has The Blues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "everybodyhastheblues|0vn7UBvSQECKJm2817Yf1P|153933",
  song: "song/james-taylor-everybody-has-the-blues",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 7,
      externalId: "1clezMVAmwn9KcXDEkTeq0",
      externalLink: "https://open.spotify.com/track/1clezMVAmwn9KcXDEkTeq0",
    },
  ],
} as const satisfies Track
