import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole2Sugarcoat = {
  id: "01a0c43e-787c-785b-bc16-91c78cdfad9b",
  type: "page-type/track",
  slug: "emei-rabbithole-2-sugarcoat",
  ownLength: 2.5045,
  ownProgress: 2.5045,
  partOfCollections: ["release/emei-rabbithole-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "SUGARCOAT",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "sugarcoat|7E2aQQjErJocovYFjYLzWU|150270",
  song: "song/emei-sugarcoat",
  carriedBy: [
    {
      release: "release/emei-rabbithole-2",
      discNumber: 1,
      position: 4,
      externalId: "7ds2cvPKeRrbIVHTctkBc4",
      externalLink: "https://open.spotify.com/track/7ds2cvPKeRrbIVHTctkBc4",
    },
  ],
} as const satisfies Track
