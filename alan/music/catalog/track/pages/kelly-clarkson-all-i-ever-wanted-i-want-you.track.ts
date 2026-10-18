import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedIWantYou = {
  id: "01a14f45-022b-7f90-b5da-66acd0f6122c",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-i-want-you",
  ownLength: 3.5104333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Want You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "iwantyou|3BmGtnKgCSGYIUhmivXKWX|210626",
  song: "song/kelly-clarkson-i-want-you",
  carriedBy: [
    {
      release: "release/kelly-clarkson-all-i-ever-wanted",
      discNumber: 1,
      position: 13,
      externalId: "4AWHpoB0IIyYQSGVommXjN",
      externalLink: "https://open.spotify.com/track/4AWHpoB0IIyYQSGVommXjN",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
