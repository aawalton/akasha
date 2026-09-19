import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHerTownToo = {
  id: "01a0b72f-24e8-79d9-8e38-b1fd3751fe86",
  type: "page-type/song",
  slug: "james-taylor-her-town-too",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5284c09c-33e8-4796-b1e1-afd840c6c4db",
      externalLink: "https://musicbrainz.org/work/5284c09c-33e8-4796-b1e1-afd840c6c4db",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Her Town Too",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
