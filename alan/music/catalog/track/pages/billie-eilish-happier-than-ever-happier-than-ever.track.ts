import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverHappierThanEver = {
  id: "01a0b638-e5b0-764b-b6da-a23d6b2be6fa",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-happier-than-ever",
  ownLength: 4.98165,
  ownProgress: 4.98165,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Happier Than Ever",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "happierthanever|6qqNVTkY8uBg9cP3Jd7DAH|298899",
  song: "song/billie-eilish-happier-than-ever",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 15,
      externalId: "4RVwu0g32PAqgUiJoXsdF8",
      externalLink: "https://open.spotify.com/track/4RVwu0g32PAqgUiJoXsdF8",
    },
  ],
} as const satisfies Track
