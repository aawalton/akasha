import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverThereforeIAm = {
  id: "01a0b638-e589-7319-acc7-dbea845351e4",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-therefore-i-am",
  ownLength: 2.892316666666667,
  ownProgress: 2.892316666666667,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Therefore I Am",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "thereforeiam|6qqNVTkY8uBg9cP3Jd7DAH|173539",
  song: "song/billie-eilish-therefore-i-am",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 14,
      externalId: "20R4HfKloPKgXDqU7UKk3x",
      externalLink: "https://open.spotify.com/track/20R4HfKloPKgXDqU7UKk3x",
    },
  ],
} as const satisfies Track
