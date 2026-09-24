import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsOpenBlue = {
  id: "01a0b4c8-20da-7ff5-8c3e-2e97737331c2",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-open-blue",
  ownLength: 3.3366166666666666,
  ownProgress: 3.3366166666666666,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Open Blue",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "openblue|7FQRbf8gbKw8KZQZAJWxH2|200197",
  song: "song/paul-cardall-open-blue",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 3,
      externalId: "154IyuxAARq3v2L6hAjNQ7",
      externalLink: "https://open.spotify.com/track/154IyuxAARq3v2L6hAjNQ7",
    },
  ],
} as const satisfies Track
