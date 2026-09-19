import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCrushMeWithYourLove = {
  id: "019ea4c4-bf45-779e-95fa-ac530395cdaa",
  type: "page-type/song",
  slug: "sia-crush-me-with-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8bb4f4c5-cec2-4317-b373-b756408d8266",
      externalLink: "https://musicbrainz.org/work/8bb4f4c5-cec2-4317-b373-b756408d8266",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crush Me With Your Love",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
