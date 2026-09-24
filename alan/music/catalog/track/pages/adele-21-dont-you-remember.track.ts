import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21DontYouRemember = {
  id: "01a0d52b-c25a-7798-b52e-da58b2581bb9",
  type: "page-type/track",
  slug: "adele-21-dont-you-remember",
  ownLength: 4.053333333333334,
  ownProgress: 0,
  partOfCollections: ["release/adele-21"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Don't You Remember",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "dontyouremember|4dpARuHxo51G3z768sgnrY|243200",
  song: "song/adele-dont-you-remember",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 4,
      externalId: "4RyjMERDcCJHTkFpXzgUw4",
      externalLink: "https://open.spotify.com/track/4RyjMERDcCJHTkFpXzgUw4",
    },
  ],
} as const satisfies Track
