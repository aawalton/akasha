import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSkinnyDippingSkinnyDipping = {
  id: "01a0b111-2f1c-796c-96d5-e01458458168",
  type: "page-type/track",
  slug: "sabrina-carpenter-skinny-dipping-skinny-dipping",
  ownLength: 2.9625,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-skinny-dipping"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7u6HtmuMeuiVdwwFul5xHi",
      externalLink: "https://open.spotify.com/track/7u6HtmuMeuiVdwwFul5xHi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "skinny dipping",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "skinnydipping|74KM79TiuVKeVCqs8QtB0B|177750",
  song: "song/sabrina-carpenter-skinny-dipping",
} as const satisfies Track
