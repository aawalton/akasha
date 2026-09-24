import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraTrustIssues = {
  id: "01a0c43e-7cb1-7e77-b8ce-d6fd73bcff58",
  type: "page-type/track",
  slug: "emei-end-of-an-era-trust-issues",
  ownLength: 2.348,
  ownProgress: 2.348,
  partOfCollections: ["release/emei-end-of-an-era", "release/emei-trust-issues"],
  status: "completed",
  unit: "unit/minutes",
  title: "Trust Issues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "trustissues|7E2aQQjErJocovYFjYLzWU|140880",
  song: "song/emei-trust-issues",
  carriedBy: [
    {
      release: "release/emei-end-of-an-era",
      discNumber: 1,
      position: 3,
      externalId: "1w9C1Oza8HfR93yN43CSLG",
      externalLink: "https://open.spotify.com/track/1w9C1Oza8HfR93yN43CSLG",
    },
    {
      release: "release/emei-trust-issues",
      discNumber: 1,
      position: 1,
      externalId: "0SSu4wiFjCPcRE5Sx3ni0A",
      externalLink: "https://open.spotify.com/track/0SSu4wiFjCPcRE5Sx3ni0A",
    },
  ],
} as const satisfies Track
