import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDaddysBaby = {
  id: "01a0b72f-3101-7ef5-9847-a0d4a8db02e9",
  type: "page-type/song",
  slug: "james-taylor-daddys-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed61a42a-6bc5-491b-b4a1-53d33b34ec55",
      externalLink: "https://musicbrainz.org/work/ed61a42a-6bc5-491b-b4a1-53d33b34ec55",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daddy’s Baby",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
