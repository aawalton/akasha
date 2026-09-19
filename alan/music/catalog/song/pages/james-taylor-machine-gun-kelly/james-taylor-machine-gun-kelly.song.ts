import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMachineGunKelly = {
  id: "01a0b72f-37f2-798a-b3b6-d4a97933a720",
  type: "page-type/song",
  slug: "james-taylor-machine-gun-kelly",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62f64522-b97d-497a-8a43-e43dc29956a7",
      externalLink: "https://musicbrainz.org/work/62f64522-b97d-497a-8a43-e43dc29956a7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Machine Gun Kelly",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
