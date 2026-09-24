import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emei9Lives9Lives = {
  id: "01a0c43e-78e3-70f4-8a3b-e4a29af09c78",
  type: "page-type/track",
  slug: "emei-9-lives-9-lives",
  ownLength: 3.0375833333333335,
  ownProgress: 3.0375833333333335,
  partOfCollections: ["release/emei-9-lives", "release/emei-rabbithole-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "9 LIVES",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "9lives|7E2aQQjErJocovYFjYLzWU|182255",
  song: "song/emei-9-lives",
  carriedBy: [
    {
      release: "release/emei-9-lives",
      discNumber: 1,
      position: 1,
      externalId: "64APtv04ls8z8Cjv6iGUsY",
      externalLink: "https://open.spotify.com/track/64APtv04ls8z8Cjv6iGUsY",
    },
    {
      release: "release/emei-rabbithole-2",
      discNumber: 1,
      position: 3,
      externalId: "67Zmvqz78sjJwhHyT94DOZ",
      externalLink: "https://open.spotify.com/track/67Zmvqz78sjJwhHyT94DOZ",
    },
  ],
} as const satisfies Track
