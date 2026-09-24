import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraThatGirl = {
  id: "01a0c43e-7d2a-7205-a4d7-606d43556b58",
  type: "page-type/track",
  slug: "emei-end-of-an-era-that-girl",
  ownLength: 2.3404333333333334,
  ownProgress: 2.3404333333333334,
  partOfCollections: ["release/emei-end-of-an-era", "release/emei-that-girl"],
  status: "completed",
  unit: "unit/minutes",
  title: "That Girl",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "thatgirl|7E2aQQjErJocovYFjYLzWU|140426",
  song: "song/emei-that-girl",
  carriedBy: [
    {
      release: "release/emei-end-of-an-era",
      discNumber: 1,
      position: 5,
      externalId: "1PYPduG8hZWr0gk32K1Hdo",
      externalLink: "https://open.spotify.com/track/1PYPduG8hZWr0gk32K1Hdo",
    },
    {
      release: "release/emei-that-girl",
      discNumber: 1,
      position: 1,
      externalId: "5UebR77vjap8LVd6eqITiY",
      externalLink: "https://open.spotify.com/track/5UebR77vjap8LVd6eqITiY",
    },
  ],
} as const satisfies Track
