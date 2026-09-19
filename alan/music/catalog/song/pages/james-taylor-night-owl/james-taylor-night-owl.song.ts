import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNightOwl = {
  id: "01a0b72f-3666-7ce6-a24a-5a2343354395",
  type: "page-type/song",
  slug: "james-taylor-night-owl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4fbb6a4c-4c6b-381c-9fff-71b062e97b46",
      externalLink: "https://musicbrainz.org/work/4fbb6a4c-4c6b-381c-9fff-71b062e97b46",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Night Owl",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
