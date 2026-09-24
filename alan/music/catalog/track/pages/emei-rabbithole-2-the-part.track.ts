import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole2ThePart = {
  id: "01a0c43e-78bc-7ed6-a6c5-201160b3ee0a",
  type: "page-type/track",
  slug: "emei-rabbithole-2-the-part",
  ownLength: 2.7420833333333334,
  ownProgress: 2.7420833333333334,
  partOfCollections: ["release/emei-rabbithole-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "THE PART",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "thepart|7E2aQQjErJocovYFjYLzWU|164525",
  song: "song/emei-the-part",
  carriedBy: [
    {
      release: "release/emei-rabbithole-2",
      discNumber: 1,
      position: 5,
      externalId: "2RCZZqbvNR5pEORY3p8PY2",
      externalLink: "https://open.spotify.com/track/2RCZZqbvNR5pEORY3p8PY2",
    },
  ],
} as const satisfies Track
