import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveNewHymn = {
  id: "01a0abeb-3d63-765a-952a-4d90cb9bde17",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-new-hymn",
  ownLength: 3.0137666666666667,
  ownProgress: 3.0137666666666667,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "New Hymn",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "newhymn|0vn7UBvSQECKJm2817Yf1P|180826",
  song: "song/james-taylor-new-hymn",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 15,
      externalId: "4mspGeMQumiTR3u46ySXRf",
      externalLink: "https://open.spotify.com/track/4mspGeMQumiTR3u46ySXRf",
    },
  ],
} as const satisfies Track
