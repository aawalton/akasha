import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasDreamingGreensleevesClassicalGuitar = {
  id: "01a0b4c8-6847-7aa7-a234-c69e34945d53",
  type: "page-type/track",
  slug: "paul-cardall-christmas-dreaming-greensleeves-classical-guitar",
  ownLength: 3.1160833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-dreaming"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48S0eiHKHZ9UghvRTnCCKB",
      externalLink: "https://open.spotify.com/track/48S0eiHKHZ9UghvRTnCCKB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Greensleeves - Classical Guitar",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2pzgrbowKM8SGmdK3YMcGq", artistName: "Mak Grgic" },
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
  ],
  trackKey: "greensleevesclassicalguitar|2pzgrbowKM8SGmdK3YMcGq,7FQRbf8gbKw8KZQZAJWxH2|186965",
} as const satisfies Track
