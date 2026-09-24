import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2DearEmily = {
  id: "01a0c43e-75b5-7919-902e-ed3e3a23bc12",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-dear-emily",
  ownLength: 2.7156166666666666,
  ownProgress: 2.7156166666666666,
  partOfCollections: ["release/emei-scatterbrain-2", "release/emei-scatterbrain-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dear Emily",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "dearemily|7E2aQQjErJocovYFjYLzWU|162937",
  song: "song/emei-dear-emily",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 4,
      externalId: "2Gu0k0HrtR7rYdfkA48D0J",
      externalLink: "https://open.spotify.com/track/2Gu0k0HrtR7rYdfkA48D0J",
    },
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "6JKdddBaYpm92OVGtlddkE",
      externalLink: "https://open.spotify.com/track/6JKdddBaYpm92OVGtlddkE",
    },
  ],
} as const satisfies Track
