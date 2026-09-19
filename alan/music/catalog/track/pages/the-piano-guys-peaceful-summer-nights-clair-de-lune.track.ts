import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsClairDeLune = {
  id: "01a0afa1-c642-7f38-9b19-ffff29d71b47",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-clair-de-lune",
  ownLength: 3.2080166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1SKnbLdtfMo9Al355kGvCE",
      externalLink: "https://open.spotify.com/track/1SKnbLdtfMo9Al355kGvCE",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Clair de Lune",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "clairdelune|0jW6R8CVyVohuUJVcuweDI|192481",
  song: "song/the-piano-guys-clair-de-lune",
} as const satisfies Track
