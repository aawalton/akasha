import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoBeautyFindsHer = {
  id: "01a0b4c8-3287-7e1e-8ca5-f1eda47ffcef",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-beauty-finds-her",
  ownLength: 3.3868833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bx1wjFHMmNr7oR3LX7YzV",
      externalLink: "https://open.spotify.com/track/3bx1wjFHMmNr7oR3LX7YzV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Beauty Finds Her",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "beautyfindsher|7FQRbf8gbKw8KZQZAJWxH2|203213",
} as const satisfies Track
