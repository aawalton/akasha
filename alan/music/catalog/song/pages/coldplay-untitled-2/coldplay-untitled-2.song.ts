import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUntitled2 = {
  id: "01a0ba5d-3c49-7a26-9bac-0b5732320666",
  type: "page-type/song",
  slug: "coldplay-untitled-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3f3a5429-11ab-4759-938a-bb93b40fc1e3",
      externalLink: "https://musicbrainz.org/work/3f3a5429-11ab-4759-938a-bb93b40fc1e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "🪐",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
