import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtHoneyDontLeaveLA = {
  id: "01a0abeb-4619-7301-9e8b-691b1ec9915b",
  type: "page-type/track",
  slug: "james-taylor-2-jt-honey-dont-leave-l-a",
  ownLength: 3.1063833333333335,
  ownProgress: 3.1063833333333335,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Honey Don't Leave L.A.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "honeydontleavela|0vn7UBvSQECKJm2817Yf1P|186383",
  song: "song/james-taylor-honey-dont-leave-l-a",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 3,
      externalId: "4JYMyddoksmabha0ZCltwA",
      externalLink: "https://open.spotify.com/track/4JYMyddoksmabha0ZCltwA",
    },
  ],
} as const satisfies Track
