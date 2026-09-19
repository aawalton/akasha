import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiStar = {
  id: "019f0ea3-ddcd-71f0-a191-5c385c271244",
  type: "page-type/song",
  slug: "mitski-star",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "926986af-dc22-432c-8cc6-2323f3d1a83f",
      externalLink: "https://musicbrainz.org/work/926986af-dc22-432c-8cc6-2323f3d1a83f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Star",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
