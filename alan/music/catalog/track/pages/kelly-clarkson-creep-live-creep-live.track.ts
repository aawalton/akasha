import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonCreepLiveCreepLive = {
  id: "01a14f45-0231-7a15-a876-337e07e06df3",
  type: "page-type/track",
  slug: "kelly-clarkson-creep-live-creep-live",
  ownLength: 4.142433333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-creep-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Creep - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "creeplive|3BmGtnKgCSGYIUhmivXKWX|248546",
  song: "song/kelly-clarkson-creep",
  carriedBy: [
    {
      release: "release/kelly-clarkson-creep-live",
      discNumber: 1,
      position: 1,
      externalId: "3knblvtjbcTtEk0HCiJHZK",
      externalLink: "https://open.spotify.com/track/3knblvtjbcTtEk0HCiJHZK",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
