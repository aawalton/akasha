import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonFakePlasticTrees = {
  id: "019ea4af-18d6-7494-af58-8ef556ffdbfa",
  type: "page-type/song",
  slug: "kelly-clarkson-fake-plastic-trees",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8144e4b1-c7fb-3020-9896-b0e54a402225",
      externalLink: "https://musicbrainz.org/work/8144e4b1-c7fb-3020-9896-b0e54a402225",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fake Plastic Trees",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
