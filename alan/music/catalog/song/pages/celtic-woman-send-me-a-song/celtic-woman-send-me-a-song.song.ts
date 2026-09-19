import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSendMeASong = {
  id: "01a0b720-0846-7523-a348-490d48d9bd34",
  type: "page-type/song",
  slug: "celtic-woman-send-me-a-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "19293797-488b-3f5c-b876-5ed64eba7e3f",
      externalLink: "https://musicbrainz.org/work/19293797-488b-3f5c-b876-5ed64eba7e3f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Send Me a Song",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
