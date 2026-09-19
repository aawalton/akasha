import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiALovingFeeling = {
  id: "019f0ea4-6a5f-71fb-8c9c-ff2f286de2cb",
  type: "page-type/song",
  slug: "mitski-a-loving-feeling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a1873efe-3ecc-4100-945b-cbf9bc48979a",
      externalLink: "https://musicbrainz.org/work/a1873efe-3ecc-4100-945b-cbf9bc48979a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Loving Feeling",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
