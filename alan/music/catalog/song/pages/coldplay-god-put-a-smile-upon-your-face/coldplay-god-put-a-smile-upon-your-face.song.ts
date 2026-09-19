import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGodPutASmileUponYourFace = {
  id: "01a0ba5d-403d-76c2-a99d-617e6f7e92fd",
  type: "page-type/song",
  slug: "coldplay-god-put-a-smile-upon-your-face",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "852f5686-4c30-36ec-9731-305e24060121",
      externalLink: "https://musicbrainz.org/work/852f5686-4c30-36ec-9731-305e24060121",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "God Put a Smile Upon Your Face",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
