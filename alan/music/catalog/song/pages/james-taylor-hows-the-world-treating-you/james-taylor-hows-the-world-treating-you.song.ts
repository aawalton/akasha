import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHowsTheWorldTreatingYou = {
  id: "01a0b72f-3187-799d-b179-bc7f7bdad42e",
  type: "page-type/song",
  slug: "james-taylor-hows-the-world-treating-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f5d1ef2c-436b-3f9e-b852-43d808aea1df",
      externalLink: "https://musicbrainz.org/work/f5d1ef2c-436b-3f9e-b852-43d808aea1df",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How’s the World Treating You",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
