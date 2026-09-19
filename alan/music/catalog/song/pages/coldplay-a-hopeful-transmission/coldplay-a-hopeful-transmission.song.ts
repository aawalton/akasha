import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAHopefulTransmission = {
  id: "01a0ba5d-435c-7233-9543-361c3cb84abe",
  type: "page-type/song",
  slug: "coldplay-a-hopeful-transmission",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a2453e71-e435-4e23-9ae9-8a7f92fc69df",
      externalLink: "https://musicbrainz.org/work/a2453e71-e435-4e23-9ae9-8a7f92fc69df",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Hopeful Transmission",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
