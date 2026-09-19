import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBattleCry = {
  id: "019ea496-e67c-7bfb-a9a2-d674030ab8b0",
  type: "page-type/song",
  slug: "imagine-dragons-battle-cry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "16cd9175-d2e6-420b-8eca-a017badb76f8",
      externalLink: "https://musicbrainz.org/work/16cd9175-d2e6-420b-8eca-a017badb76f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Battle Cry",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
