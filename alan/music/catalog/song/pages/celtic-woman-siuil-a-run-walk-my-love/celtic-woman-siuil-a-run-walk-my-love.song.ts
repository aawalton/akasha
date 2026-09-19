import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSiuilARunWalkMyLove = {
  id: "01a0b720-0977-76a6-a777-609d113615a4",
  type: "page-type/song",
  slug: "celtic-woman-siuil-a-run-walk-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2abdc43d-6409-32dc-8121-95b344016f31",
      externalLink: "https://musicbrainz.org/work/2abdc43d-6409-32dc-8121-95b344016f31",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Siúil A Run (Walk My Love)",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
