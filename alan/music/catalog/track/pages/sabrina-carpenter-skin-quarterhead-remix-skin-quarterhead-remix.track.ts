import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSkinQuarterheadRemixSkinQuarterheadRemix = {
  id: "01a0b111-2f3a-7761-b6ef-bd35bfe44f85",
  type: "page-type/track",
  slug: "sabrina-carpenter-skin-quarterhead-remix-skin-quarterhead-remix",
  ownLength: 3.1166666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-skin-quarterhead-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3DNziCcqRd2v8uQWwec1GW",
      externalLink: "https://open.spotify.com/track/3DNziCcqRd2v8uQWwec1GW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Skin - Quarterhead Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "2h6hAChW74hB9HvrNoK1RY", artistName: "Quarterhead" },
  ],
  trackKey: "skinquarterheadremix|2h6hAChW74hB9HvrNoK1RY,74KM79TiuVKeVCqs8QtB0B|187000",
  song: "song/sabrina-carpenter-skin",
} as const satisfies Track
