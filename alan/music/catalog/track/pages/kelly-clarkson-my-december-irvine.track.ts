import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberIrvine = {
  id: "01a14f45-023a-7937-93f2-95c13d8b3db0",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-irvine",
  ownLength: 8.763766666666667,
  ownProgress: 8.763766666666667,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "Irvine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "irvine|3BmGtnKgCSGYIUhmivXKWX|525826",
  song: "song/kelly-clarkson-irvine",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 13,
      externalId: "0Fb4nlnX8gnLGC4OJxkwTY",
      externalLink: "https://open.spotify.com/track/0Fb4nlnX8gnLGC4OJxkwTY",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
