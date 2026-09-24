import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverNda = {
  id: "01a0b638-e562-7608-a66d-21c67d913425",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-nda",
  ownLength: 3.2629333333333332,
  ownProgress: 3.2629333333333332,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "NDA",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "nda|6qqNVTkY8uBg9cP3Jd7DAH|195776",
  song: "song/billie-eilish-nda",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 13,
      externalId: "38GBNKZUhfBkk3oNlWzRYd",
      externalLink: "https://open.spotify.com/track/38GBNKZUhfBkk3oNlWzRYd",
    },
  ],
} as const satisfies Track
