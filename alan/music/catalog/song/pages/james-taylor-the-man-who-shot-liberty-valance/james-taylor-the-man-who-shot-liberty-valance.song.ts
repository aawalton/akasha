import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheManWhoShotLibertyValance = {
  id: "01a0b72f-5929-7222-b0b3-db00a1f72a2e",
  type: "page-type/song",
  slug: "james-taylor-the-man-who-shot-liberty-valance",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f712aa56-aa3a-3a7b-90dc-f4a8c8cad369",
      externalLink: "https://musicbrainz.org/work/f712aa56-aa3a-3a7b-90dc-f4a8c8cad369",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Man Who Shot Liberty Valance",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
