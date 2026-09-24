import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaWhatsThePoint = {
  id: "01a0c43e-7045-7828-88e3-11d23994ca9f",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-whats-the-point",
  grade: "B-",
  ownLength: 2.729233333333333,
  ownProgress: 2.729233333333333,
  partOfCollections: ["release/emei-night-at-the-opera", "release/emei-whats-the-point"],
  status: "completed",
  unit: "unit/minutes",
  title: "What's the Point!",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "whatsthepoint|7E2aQQjErJocovYFjYLzWU|163754",
  song: "song/emei-whats-the-point",
  carriedBy: [
    {
      release: "release/emei-night-at-the-opera",
      discNumber: 1,
      position: 2,
      externalId: "5ebdWVa02jyMYOo18PvW0V",
      externalLink: "https://open.spotify.com/track/5ebdWVa02jyMYOo18PvW0V",
    },
    {
      release: "release/emei-whats-the-point",
      discNumber: 1,
      position: 1,
      externalId: "5yYGr8R31sQLOMVIgNCnrN",
      externalLink: "https://open.spotify.com/track/5yYGr8R31sQLOMVIgNCnrN",
    },
  ],
} as const satisfies Track
