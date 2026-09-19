import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMonologueSongLaLaLa = {
  id: "019ea416-2eb2-7126-a42b-c7f59d731dd0",
  type: "page-type/song",
  slug: "taylor-swift-monologue-song-la-la-la",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0edc43ef-42e9-4cc8-945c-1cff6b19cfc7",
      externalLink: "https://musicbrainz.org/work/0edc43ef-42e9-4cc8-945c-1cff6b19cfc7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Monologue Song (La La La)",
  artist: "artist/taylor-swift",
  performed: true,
  written: "solo",
} as const satisfies Song
