import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberYeah = {
  id: "01a14f45-023b-74ae-9436-a25600325093",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-yeah",
  ownLength: 2.7048833333333335,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Yeah",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "yeah|3BmGtnKgCSGYIUhmivXKWX|162293",
  song: "song/kelly-clarkson-yeah",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 11,
      externalId: "3oFm9PLUTytFcnmV8DO68G",
      externalLink: "https://open.spotify.com/track/3oFm9PLUTytFcnmV8DO68G",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
