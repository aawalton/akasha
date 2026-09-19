import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWePray = {
  id: "01a0ba60-fbfe-7619-a848-b058e8afca73",
  type: "page-type/song",
  slug: "coldplay-we-pray",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dd8a91fd-88c2-494b-9e97-e8ba7a30750e",
      externalLink: "https://musicbrainz.org/work/dd8a91fd-88c2-494b-9e97-e8ba7a30750e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WE PRAY",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
