import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOverTheRainbow = {
  id: "01a0b720-162d-7f54-ac79-af81c12881f7",
  type: "page-type/song",
  slug: "celtic-woman-over-the-rainbow",
  partOfCollections: ["artist/ariana-grande"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8217125-b460-3902-8903-82979e3785ee",
      externalLink: "https://musicbrainz.org/work/f8217125-b460-3902-8903-82979e3785ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Over the Rainbow",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
