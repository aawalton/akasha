import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21TakeItAll = {
  id: "01a0d52b-c25a-78f3-b6de-21e4df012700",
  type: "page-type/track",
  slug: "adele-21-take-it-all",
  ownLength: 3.804883333333333,
  ownProgress: 0,
  partOfCollections: ["release/adele-21"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Take It All",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "takeitall|4dpARuHxo51G3z768sgnrY|228293",
  song: "song/adele-take-it-all",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 7,
      externalId: "08YJEcxGtYXwCGqXMZDiyQ",
      externalLink: "https://open.spotify.com/track/08YJEcxGtYXwCGqXMZDiyQ",
    },
  ],
} as const satisfies Track
