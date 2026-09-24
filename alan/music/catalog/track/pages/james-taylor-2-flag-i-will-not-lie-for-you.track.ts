import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagIWillNotLieForYou = {
  id: "01a0abeb-44cf-762c-8605-95583c612745",
  type: "page-type/track",
  slug: "james-taylor-2-flag-i-will-not-lie-for-you",
  ownLength: 3.2466666666666666,
  ownProgress: 3.2466666666666666,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Will Not Lie for You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "iwillnotlieforyou|0vn7UBvSQECKJm2817Yf1P|194800",
  song: "song/james-taylor-i-will-not-lie-for-you",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 4,
      externalId: "6SWenTaB4PNj8DCY8TY8Nu",
      externalLink: "https://open.spotify.com/track/6SWenTaB4PNj8DCY8TY8Nu",
    },
  ],
} as const satisfies Track
