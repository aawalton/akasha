import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTheBoyIsMineTheBoyIsMineWithBrandyMonicaRemix = {
  id: "01a0a6c5-3307-72a3-b25e-12d4942094ab",
  type: "page-type/track",
  slug: "ariana-grande-the-boy-is-mine-the-boy-is-mine-with-brandy-monica-remix",
  ownLength: 3.5564,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-the-boy-is-mine"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3X2alXBeUmnYSVXEfURMkR",
      externalLink: "https://open.spotify.com/track/3X2alXBeUmnYSVXEfURMkR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the boy is mine (with Brandy, Monica) – Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "05oH07COxkXKIMt6mIPRee", artistName: "Brandy" },
    { externalId: "6nzxy2wXs6tLgzEtqOkEi2", artistName: "Monica" },
  ],
  trackKey:
    "theboyisminewithbrandymonicaremix|05oH07COxkXKIMt6mIPRee,66CXWjxzNUsdJxJ2JdwvnR,6nzxy2wXs6tLgzEtqOkEi2|213384",
  song: "song/ariana-grande-the-boy-is-mine",
} as const satisfies Track
