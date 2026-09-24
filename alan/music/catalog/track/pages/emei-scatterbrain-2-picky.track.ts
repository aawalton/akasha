import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Picky = {
  id: "01a0c43e-75da-777f-b992-21452758f141",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-picky",
  ownLength: 2.34895,
  ownProgress: 2.34895,
  partOfCollections: ["release/emei-scatterbrain-2", "release/emei-scatterbrain-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Picky",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "picky|7E2aQQjErJocovYFjYLzWU|140937",
  song: "song/emei-picky",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 5,
      externalId: "1qTHWIDjnghhPe294079cZ",
      externalLink: "https://open.spotify.com/track/1qTHWIDjnghhPe294079cZ",
    },
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "6zyUs70APSlE1TtlPpEJvy",
      externalLink: "https://open.spotify.com/track/6zyUs70APSlE1TtlPpEJvy",
    },
  ],
} as const satisfies Track
