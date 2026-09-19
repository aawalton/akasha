import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310BlessTheBrokenRoad = {
  id: "01a0afa2-0b9c-761a-adf6-6c1002a59cc6",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-bless-the-broken-road",
  ownLength: 3.924166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wnYESYaoBgROglhywVA13",
      externalLink: "https://open.spotify.com/track/7wnYESYaoBgROglhywVA13",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bless the Broken Road",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "2YQ4MY2VwOMv43C0GemUY5", artistName: "Jon Schmidt" },
  ],
  trackKey: "blessthebrokenroad|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5|235450",
  song: "song/the-piano-guys-bless-the-broken-road",
} as const satisfies Track
