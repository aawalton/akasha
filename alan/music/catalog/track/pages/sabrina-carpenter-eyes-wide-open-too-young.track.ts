import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenTooYoung = {
  id: "01a0b111-2910-7280-be00-8e5824a2759b",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-too-young",
  ownLength: 4.2391,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "694MyEbGgAtoEVYqdtfvp2",
      externalLink: "https://open.spotify.com/track/694MyEbGgAtoEVYqdtfvp2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Too Young",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "tooyoung|74KM79TiuVKeVCqs8QtB0B|254346",
  song: "song/sabrina-carpenter-too-young",
} as const satisfies Track
