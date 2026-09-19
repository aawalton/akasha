import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBadThingBunnyHop = {
  id: "01a0b76f-e7c1-7363-8a5c-0cec08009faa",
  type: "page-type/song",
  slug: "ariana-grande-bad-thing-bunny-hop",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d79254fc-8f1c-488f-beb3-a49734adaf68",
      externalLink: "https://musicbrainz.org/work/d79254fc-8f1c-488f-beb3-a49734adaf68",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bad thing (bunny hop)",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
