import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTheBoyIsMineTheBoyIsMineWithBrandyMonicaRemixACappella = {
  id: "01a0a6c5-332c-79fb-9c5d-a4fca449f66b",
  type: "page-type/track",
  slug: "ariana-grande-the-boy-is-mine-the-boy-is-mine-with-brandy-monica-remix-a-cappella",
  ownLength: 3.5346,
  ownProgress: 3.5346,
  partOfCollections: ["release/ariana-grande-the-boy-is-mine"],
  status: "completed",
  unit: "unit/minutes",
  title: "the boy is mine (with Brandy, Monica) – Remix a cappella",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { artist: "artist/ariana-grande" },
    { artistName: "Brandy" },
    { artistName: "Monica" },
  ],
  trackKey:
    "theboyisminewithbrandymonicaremixacappella|05oH07COxkXKIMt6mIPRee,66CXWjxzNUsdJxJ2JdwvnR,6nzxy2wXs6tLgzEtqOkEi2|212076",
  song: "song/ariana-grande-the-boy-is-mine",
  carriedBy: [
    {
      release: "release/ariana-grande-the-boy-is-mine",
      discNumber: 1,
      position: 5,
      externalId: "4fhgyMV93wxidvHTGFTuIN",
      externalLink: "https://open.spotify.com/track/4fhgyMV93wxidvHTGFTuIN",
    },
  ],
} as const satisfies Track
