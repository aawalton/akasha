import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBellyacheBellyache = {
  id: "01a0b638-ed22-77a9-88a5-4d91bcf1f7da",
  type: "page-type/track",
  slug: "billie-eilish-bellyache-bellyache",
  ownLength: 2.9862,
  ownProgress: 2.9862,
  partOfCollections: ["release/billie-eilish-bellyache", "release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "bellyache",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "bellyache|6qqNVTkY8uBg9cP3Jd7DAH|179172",
  song: "song/billie-eilish-bellyache",
  carriedBy: [
    {
      release: "release/billie-eilish-bellyache",
      discNumber: 1,
      position: 1,
      externalId: "51NFxnQvaosfDDutk0tams",
      externalLink: "https://open.spotify.com/track/51NFxnQvaosfDDutk0tams",
    },
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 6,
      externalId: "1ni8ZTAY1GHXEFOGHl7fdg",
      externalLink: "https://open.spotify.com/track/1ni8ZTAY1GHXEFOGHl7fdg",
    },
  ],
} as const satisfies Track
