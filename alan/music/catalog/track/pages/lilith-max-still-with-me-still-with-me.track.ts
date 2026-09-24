import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStillWithMeStillWithMe = {
  id: "01a0c95d-fff3-7e9c-829b-e33e24d29c0e",
  type: "page-type/track",
  slug: "lilith-max-still-with-me-still-with-me",
  ownLength: 3.0705833333333334,
  ownProgress: 3.0705833333333334,
  partOfCollections: ["release/lilith-max-still-with-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Still with Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "stillwithme|797SPxZf82IYq3XCM8c9AM|184235",
  song: "song/lilith-max-still-with-me",
  carriedBy: [
    {
      release: "release/lilith-max-still-with-me",
      discNumber: 1,
      position: 1,
      externalId: "5joaw0mnqPAzoWsdTsmdsl",
      externalLink: "https://open.spotify.com/track/5joaw0mnqPAzoWsdTsmdsl",
    },
  ],
} as const satisfies Track
