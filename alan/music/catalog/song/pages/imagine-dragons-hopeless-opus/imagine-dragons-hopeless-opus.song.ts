import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsHopelessOpus = {
  id: "019ea498-d4b5-7f97-9666-aa6db66b634f",
  type: "page-type/song",
  slug: "imagine-dragons-hopeless-opus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6fc0d52e-df67-46bd-9454-71b585743c90",
      externalLink: "https://musicbrainz.org/work/6fc0d52e-df67-46bd-9454-71b585743c90",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hopeless Opus",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
