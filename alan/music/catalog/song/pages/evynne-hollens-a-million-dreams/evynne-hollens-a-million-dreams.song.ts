import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensAMillionDreams = {
  id: "019ea4cf-1d64-71ff-a353-0be93833703c",
  type: "page-type/song",
  slug: "evynne-hollens-a-million-dreams",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "551e27c0-5042-40ff-9662-fb30f7eca66d",
      externalLink: "https://musicbrainz.org/work/551e27c0-5042-40ff-9662-fb30f7eca66d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Million Dreams",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
