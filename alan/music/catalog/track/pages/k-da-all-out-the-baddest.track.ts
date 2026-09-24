import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kDaAllOutTheBaddest = {
  id: "01a0c957-ff86-7c39-81fe-6de530092081",
  type: "page-type/track",
  slug: "k-da-all-out-the-baddest",
  ownLength: 2.71,
  ownProgress: 2.71,
  partOfCollections: ["release/k-da-all-out", "release/k-da-the-baddest"],
  status: "completed",
  unit: "unit/minutes",
  title: "THE BADDEST",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/k-da" },
    { artistName: "i-dle" },
    { artistName: "Wolftyla" },
    { artistName: "Bea Miller" },
    { artistName: "League of Legends" },
  ],
  trackKey:
    "thebaddest|1o2NpYGqHiCq7FoiYdyd1x,2AfmfGFbe0A0WsTYm0SDTx,47mIJdHORyRerp4os813jD,4gOc8TsQed9eqnqJct2c5v,7qd6KGoABHifvXKeFNe2Yb|162600",
  song: "song/k-da-the-baddest",
  carriedBy: [
    {
      release: "release/k-da-all-out",
      discNumber: 1,
      position: 1,
      externalId: "4z0QfhqociMIgLf9NYUliN",
      externalLink: "https://open.spotify.com/track/4z0QfhqociMIgLf9NYUliN",
    },
    {
      release: "release/k-da-the-baddest",
      discNumber: 1,
      position: 1,
      externalId: "6y3EPT8iw6HmuMpX05gyvt",
      externalLink: "https://open.spotify.com/track/6y3EPT8iw6HmuMpX05gyvt",
    },
  ],
} as const satisfies Track
