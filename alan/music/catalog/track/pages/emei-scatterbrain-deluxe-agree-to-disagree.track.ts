import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeAgreeToDisagree = {
  id: "01a0c43e-747f-7899-bda1-68b2e7932343",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-agree-to-disagree",
  ownLength: 2.371783333333333,
  ownProgress: 2.371783333333333,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Agree to Disagree",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "agreetodisagree|7E2aQQjErJocovYFjYLzWU|142307",
  song: "song/emei-agree-to-disagree",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "4oD9gB11wTctdCMMzmuZWH",
      externalLink: "https://open.spotify.com/track/4oD9gB11wTctdCMMzmuZWH",
    },
  ],
} as const satisfies Track
