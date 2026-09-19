import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorThatsWhyImHere = {
  id: "01a0b72f-48dc-7377-818f-a76783bb3dc1",
  type: "page-type/song",
  slug: "james-taylor-thats-why-im-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "29b110e7-fdb0-4931-90eb-221ac6dd44ea",
      externalLink: "https://musicbrainz.org/work/29b110e7-fdb0-4931-90eb-221ac6dd44ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "That’s Why I’m Here",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
