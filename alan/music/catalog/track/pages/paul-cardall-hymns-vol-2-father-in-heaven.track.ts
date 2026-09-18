import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2FatherInHeaven = {
  id: "01a0b4c8-5f9f-72ca-b830-f371d9702f4c",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-father-in-heaven",
  ownLength: 3.548,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pEspvJQyPRyAnnUwCMeM0",
      externalLink: "https://open.spotify.com/track/7pEspvJQyPRyAnnUwCMeM0",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Father in Heaven",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "fatherinheaven|7FQRbf8gbKw8KZQZAJWxH2|212880",
} as const satisfies Track
