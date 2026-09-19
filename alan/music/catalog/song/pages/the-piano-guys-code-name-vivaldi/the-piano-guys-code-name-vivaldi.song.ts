import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCodeNameVivaldi = {
  id: "01a0b71e-9c86-75e0-8df4-a0a6aa62dc22",
  type: "page-type/song",
  slug: "the-piano-guys-code-name-vivaldi",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9acbcd77-fb79-42e6-8ad4-6a826a0f439a",
      externalLink: "https://musicbrainz.org/work/9acbcd77-fb79-42e6-8ad4-6a826a0f439a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Code Name Vivaldi",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
