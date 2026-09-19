import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTheBoyIsMineTheBoyIsMineWithBrandyMonicaRemixACappella = {
  id: "01a0a6c5-332c-79fb-9c5d-a4fca449f66b",
  type: "page-type/track",
  slug: "ariana-grande-the-boy-is-mine-the-boy-is-mine-with-brandy-monica-remix-a-cappella",
  ownLength: 3.5346,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-the-boy-is-mine"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fhgyMV93wxidvHTGFTuIN",
      externalLink: "https://open.spotify.com/track/4fhgyMV93wxidvHTGFTuIN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the boy is mine (with Brandy, Monica) – Remix a cappella",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "05oH07COxkXKIMt6mIPRee", artistName: "Brandy" },
    { externalId: "6nzxy2wXs6tLgzEtqOkEi2", artistName: "Monica" },
  ],
  trackKey:
    "theboyisminewithbrandymonicaremixacappella|05oH07COxkXKIMt6mIPRee,66CXWjxzNUsdJxJ2JdwvnR,6nzxy2wXs6tLgzEtqOkEi2|212076",
  song: "song/ariana-grande-the-boy-is-mine",
} as const satisfies Track
