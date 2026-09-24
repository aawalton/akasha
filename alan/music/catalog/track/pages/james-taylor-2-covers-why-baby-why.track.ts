import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversWhyBabyWhy = {
  id: "01a0abeb-3411-76dd-b4e5-90aa61edf44e",
  type: "page-type/track",
  slug: "james-taylor-2-covers-why-baby-why",
  ownLength: 2.678,
  ownProgress: 2.678,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Why Baby Why",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "whybabywhy|0vn7UBvSQECKJm2817Yf1P|160680",
  song: "song/james-taylor-why-baby-why",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 4,
      externalId: "4D4nerNiBRsxjVyNdzWJcX",
      externalLink: "https://open.spotify.com/track/4D4nerNiBRsxjVyNdzWJcX",
    },
  ],
} as const satisfies Track
