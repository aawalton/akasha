import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverEverybodyDies = {
  id: "01a0b638-e50e-7d58-8724-13fccdc12ede",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-everybody-dies",
  ownLength: 3.4437,
  ownProgress: 3.4437,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everybody Dies",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "everybodydies|6qqNVTkY8uBg9cP3Jd7DAH|206622",
  song: "song/billie-eilish-everybody-dies",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 11,
      externalId: "5jhBwnqzNNrENXnYrAdoCe",
      externalLink: "https://open.spotify.com/track/5jhBwnqzNNrENXnYrAdoCe",
    },
  ],
} as const satisfies Track
