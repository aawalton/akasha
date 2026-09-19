import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxTheCautionaryTale = {
  id: "019ea4f6-6db4-76e9-8740-488eb312d860",
  type: "page-type/song",
  slug: "lilith-max-the-cautionary-tale",
  title: "The Cautionary Tale",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "657f8a0b-ff1b-4af7-96d7-60014f6bf7d6",
      externalLink: "https://musicbrainz.org/recording/657f8a0b-ff1b-4af7-96d7-60014f6bf7d6",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
