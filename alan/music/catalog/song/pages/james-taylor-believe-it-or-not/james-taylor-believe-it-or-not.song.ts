import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBelieveItOrNot = {
  id: "01a0b72f-2bfb-7b1c-9004-a86d831a3cb7",
  type: "page-type/song",
  slug: "james-taylor-believe-it-or-not",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b01f0c77-7cd2-417a-b2ae-b284e9371d25",
      externalLink: "https://musicbrainz.org/work/b01f0c77-7cd2-417a-b2ae-b284e9371d25",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Believe It or Not",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
