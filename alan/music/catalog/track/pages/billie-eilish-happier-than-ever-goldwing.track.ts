import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverGoldwing = {
  id: "01a0b638-e45b-78cf-98fa-a84a5130aaba",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-goldwing",
  ownLength: 2.5256,
  ownProgress: 2.5256,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "GOLDWING",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "goldwing|6qqNVTkY8uBg9cP3Jd7DAH|151536",
  song: "song/billie-eilish-goldwing",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 6,
      externalId: "0FfqyjhB6Kspvit1oOo7ax",
      externalLink: "https://open.spotify.com/track/0FfqyjhB6Kspvit1oOo7ax",
    },
  ],
} as const satisfies Track
