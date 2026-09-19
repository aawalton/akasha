import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoSilverleafWinds = {
  id: "01a0b4c8-3268-716d-98ab-2bf963135cd1",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-silverleaf-winds",
  ownLength: 2.8846666666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6w1c1Wg6Phl6wpE9eHRzAB",
      externalLink: "https://open.spotify.com/track/6w1c1Wg6Phl6wpE9eHRzAB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Silverleaf Winds",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "silverleafwinds|7FQRbf8gbKw8KZQZAJWxH2|173080",
  song: "song/paul-cardall-silverleaf-winds",
} as const satisfies Track
