import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeRaindropsAnAngelCried = {
  id: "019ea4e8-3a36-703a-8000-2a21af297eba",
  type: "page-type/song",
  slug: "ariana-grande-raindrops-an-angel-cried",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee6d1ed0-059c-4bc8-88b9-0b733834375e",
      externalLink: "https://musicbrainz.org/work/ee6d1ed0-059c-4bc8-88b9-0b733834375e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "raindrops (an angel cried)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
