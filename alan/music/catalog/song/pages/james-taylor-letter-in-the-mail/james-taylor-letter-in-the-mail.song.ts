import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLetterInTheMail = {
  id: "01a0b72f-415b-7775-b021-9781702ef469",
  type: "page-type/song",
  slug: "james-taylor-letter-in-the-mail",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cb80ee8c-5ef2-4e81-b84f-e7c6cc98946c",
      externalLink: "https://musicbrainz.org/work/cb80ee8c-5ef2-4e81-b84f-e7c6cc98946c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Letter in the Mail",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
