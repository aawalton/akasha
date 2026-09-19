import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraNatureBoy = {
  id: "019ea4a3-f286-7499-a73e-4262a60fcab4",
  type: "page-type/song",
  slug: "aurora-nature-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2e99ea26-6e86-3c23-879b-ecf44ab840fd",
      externalLink: "https://musicbrainz.org/work/2e99ea26-6e86-3c23-879b-ecf44ab840fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nature Boy",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
