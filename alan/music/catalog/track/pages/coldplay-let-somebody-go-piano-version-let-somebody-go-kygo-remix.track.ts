import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLetSomebodyGoPianoVersionLetSomebodyGoKygoRemix = {
  id: "01a0b9ee-ecb2-7d97-bda4-7c1227c6a6f7",
  type: "page-type/track",
  slug: "coldplay-let-somebody-go-piano-version-let-somebody-go-kygo-remix",
  ownLength: 3.2877833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-let-somebody-go-piano-version"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PLNTLPqbL2AzjVPuyggw5",
      externalLink: "https://open.spotify.com/track/2PLNTLPqbL2AzjVPuyggw5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Somebody Go - Kygo Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0C8ZW7ezQVs4URX5aX7Kqx", artistName: "Selena Gomez" },
    { externalId: "23fqKkggKUBHNkbKtXEls4", artistName: "Kygo" },
  ],
  trackKey:
    "letsomebodygokygoremix|0C8ZW7ezQVs4URX5aX7Kqx,23fqKkggKUBHNkbKtXEls4,4gzpq5DPGxSnKTe4SA8HAU|197267",
  song: "song/coldplay-let-somebody-go",
} as const satisfies Track
