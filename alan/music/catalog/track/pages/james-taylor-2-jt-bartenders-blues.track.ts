import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtBartendersBlues = {
  id: "01a0abeb-4658-735a-a1bb-8e9917826531",
  type: "page-type/track",
  slug: "james-taylor-2-jt-bartenders-blues",
  ownLength: 4.207466666666667,
  ownProgress: 4.207466666666667,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bartender's Blues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "bartendersblues|0vn7UBvSQECKJm2817Yf1P|252448",
  song: "song/james-taylor-bartenders-blues",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 5,
      externalId: "1Pm0IxpzPNGF9O6fvYyP2q",
      externalLink: "https://open.spotify.com/track/1Pm0IxpzPNGF9O6fvYyP2q",
    },
  ],
} as const satisfies Track
