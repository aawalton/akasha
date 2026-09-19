import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonCreep = {
  id: "019ea4b1-1d4f-745d-8062-6723f6c5774c",
  type: "page-type/song",
  slug: "kelly-clarkson-creep",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa80b137-ebd1-3177-8fa4-416eb3ee52a2",
      externalLink: "https://musicbrainz.org/work/fa80b137-ebd1-3177-8fa4-416eb3ee52a2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Creep",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
