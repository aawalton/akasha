import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenAprilSkies = {
  id: "01a0b4c8-4bec-7c7d-9281-ca4387dc3161",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-april-skies",
  ownLength: 3.580216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 20,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xKPDPFctjCX7ATFNkuwa8",
      externalLink: "https://open.spotify.com/track/7xKPDPFctjCX7ATFNkuwa8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "April Skies",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "aprilskies|7FQRbf8gbKw8KZQZAJWxH2|214813",
  song: "song/paul-cardall-april-skies",
} as const satisfies Track
