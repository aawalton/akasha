import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDonTCallMeAngelCharlieSAngels = {
  id: "019ea4e2-d48d-790f-84a7-cde96e9afef9",
  type: "page-type/song",
  slug: "ariana-grande-don-t-call-me-angel-charlie-s-angels",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba184ac3-8279-4236-8146-965483c13732",
      externalLink: "https://musicbrainz.org/work/ba184ac3-8279-4236-8146-965483c13732",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't Call Me Angel (Charlie's Angels)",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
