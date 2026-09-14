import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftTheAlbatross = {
  id: "019ea416-3adc-7ef3-9f58-a037dd6e61f6",
  type: "song",
  slug: "taylor-swift-the-albatross",
  title: "The Albatross",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b16483fe-228c-4120-94bc-d724db159493",
      externalLink: "https://musicbrainz.org/work/b16483fe-228c-4120-94bc-d724db159493",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
