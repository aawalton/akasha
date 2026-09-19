import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiOnceMoreToSeeYou = {
  id: "019f0e9e-f905-7510-9bb9-56095c493f66",
  type: "page-type/song",
  slug: "mitski-once-more-to-see-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c91ab92-85b4-4e21-9f2c-860be1234ce0",
      externalLink: "https://musicbrainz.org/work/3c91ab92-85b4-4e21-9f2c-860be1234ce0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Once More to See You",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
