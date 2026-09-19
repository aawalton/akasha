import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftOurs = {
  id: "019ea416-4151-7706-9769-645240ccb5c7",
  type: "page-type/song",
  slug: "taylor-swift-ours",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f2465a1f-5386-4031-93cc-5023371b6b3f",
      externalLink: "https://musicbrainz.org/work/f2465a1f-5386-4031-93cc-5023371b6b3f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ours",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
