import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveHymnMedleyLive = {
  id: "01a0b4c8-5817-7463-9d0b-3b994ffadde4",
  type: "page-type/track",
  slug: "paul-cardall-live-hymn-medley-live",
  ownLength: 6.893766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7elrfeozVMW4ykryUqqKUc",
      externalLink: "https://open.spotify.com/track/7elrfeozVMW4ykryUqqKUc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hymn Medley - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "hymnmedleylive|7FQRbf8gbKw8KZQZAJWxH2|413626",
} as const satisfies Track
