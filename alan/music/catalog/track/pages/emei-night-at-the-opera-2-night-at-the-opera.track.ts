import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOpera2NightAtTheOpera = {
  id: "01a0c43e-71f5-717e-9697-a93f93390d39",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-2-night-at-the-opera",
  ownLength: 3.0798,
  ownProgress: 3.0798,
  partOfCollections: [
    "release/emei-night-at-the-opera-2",
    "release/emei-night-at-the-opera",
    "release/emei-whats-the-point",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Night at the Opera",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "nightattheopera|7E2aQQjErJocovYFjYLzWU|184788",
  song: "song/emei-night-at-the-opera",
  carriedBy: [
    {
      release: "release/emei-night-at-the-opera",
      discNumber: 1,
      position: 1,
      externalId: "30AyoU0VBI4khIQVVEmqQH",
      externalLink: "https://open.spotify.com/track/30AyoU0VBI4khIQVVEmqQH",
    },
    {
      release: "release/emei-night-at-the-opera-2",
      discNumber: 1,
      position: 1,
      externalId: "4ikhbKiw9pKYkWitSR7M7u",
      externalLink: "https://open.spotify.com/track/4ikhbKiw9pKYkWitSR7M7u",
    },
    {
      release: "release/emei-whats-the-point",
      discNumber: 1,
      position: 2,
      externalId: "1ny1BHRWB54CD5MiBhaOTc",
      externalLink: "https://open.spotify.com/track/1ny1BHRWB54CD5MiBhaOTc",
    },
  ],
} as const satisfies Track
