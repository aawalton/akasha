import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenSundayDrive = {
  id: "01a0b4c8-4a43-7ea2-902b-fca6157e7c32",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-sunday-drive",
  ownLength: 3.203333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63Lm9VcUOCrU379mMNIdLo",
      externalLink: "https://open.spotify.com/track/63Lm9VcUOCrU379mMNIdLo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sunday Drive",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sundaydrive|7FQRbf8gbKw8KZQZAJWxH2|192200",
  song: "song/paul-cardall-sunday-drive",
} as const satisfies Track
