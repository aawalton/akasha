import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiSunnydSunnyd = {
  id: "01a0c43e-7972-71d9-b266-786bee7ad46b",
  type: "page-type/track",
  slug: "emei-sunnyd-sunnyd",
  ownLength: 2.1112333333333333,
  ownProgress: 2.1112333333333333,
  partOfCollections: ["release/emei-sunnyd"],
  status: "completed",
  unit: "unit/minutes",
  title: "SUNNYD",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }, { artistName: "Whethan" }],
  trackKey: "sunnyd|0vqJkZ0RpLZixt3lTmD8vP,7E2aQQjErJocovYFjYLzWU|126674",
  song: "song/emei-sunnyd",
  carriedBy: [
    {
      release: "release/emei-sunnyd",
      discNumber: 1,
      position: 1,
      externalId: "4vnauoJf6OYYU73jPUJbZa",
      externalLink: "https://open.spotify.com/track/4vnauoJf6OYYU73jPUJbZa",
    },
  ],
} as const satisfies Track
