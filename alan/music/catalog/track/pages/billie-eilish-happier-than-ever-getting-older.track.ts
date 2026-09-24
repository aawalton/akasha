import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverGettingOlder = {
  id: "01a0b638-e3a7-79ef-81b1-f198b1af13c6",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-getting-older",
  ownLength: 4.07035,
  ownProgress: 4.07035,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Getting Older",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "gettingolder|6qqNVTkY8uBg9cP3Jd7DAH|244221",
  song: "song/billie-eilish-getting-older",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 1,
      externalId: "4HOryCnbme0zBnF8LWij3f",
      externalLink: "https://open.spotify.com/track/4HOryCnbme0zBnF8LWij3f",
    },
  ],
} as const satisfies Track
