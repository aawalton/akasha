import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedAlreadyGone = {
  id: "01a14f45-022b-7b53-a13e-bee3774f6c8c",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-already-gone",
  ownLength: 4.692666666666667,
  ownProgress: 4.692666666666667,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Already Gone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "alreadygone|3BmGtnKgCSGYIUhmivXKWX|281560",
  song: "song/kelly-clarkson-already-gone",
  carriedBy: [
    {
      release: "release/kelly-clarkson-all-i-ever-wanted",
      discNumber: 1,
      position: 6,
      externalId: "4fq2YUONcgrCJ2SPndSeKC",
      externalLink: "https://open.spotify.com/track/4fq2YUONcgrCJ2SPndSeKC",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
