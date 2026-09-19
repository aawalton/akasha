import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSchliaDeineAugn = {
  id: "01a0b72f-4dfc-772a-805b-c9938b753f56",
  type: "page-type/song",
  slug: "james-taylor-schlia-deine-augn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "756a9405-e554-45fd-8fa0-5a2d621cceac",
      externalLink: "https://musicbrainz.org/work/756a9405-e554-45fd-8fa0-5a2d621cceac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Schliaß deine Augn",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: false,
  written: "solo",
} as const satisfies Song
