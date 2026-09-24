import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeAndAlsoLiveTheBoyIsMineWithBrandyMonica = {
  id: "01a0a6c5-150e-7b57-9185-2c94a61fb8e8",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live-the-boy-is-mine-with-brandy-monica",
  ownLength: 3.5564,
  ownProgress: 3.5564,
  partOfCollections: [
    "release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live",
    "release/ariana-grande-the-boy-is-mine-remix",
    "release/ariana-grande-the-boy-is-mine",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "the boy is mine (with Brandy, Monica) - Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { artist: "artist/ariana-grande" },
    { artistName: "Brandy" },
    { artistName: "Monica" },
  ],
  trackKey:
    "theboyisminewithbrandymonicaremix|05oH07COxkXKIMt6mIPRee,66CXWjxzNUsdJxJ2JdwvnR,6nzxy2wXs6tLgzEtqOkEi2|213384",
  song: "song/ariana-grande-the-boy-is-mine",
  carriedBy: [
    {
      release: "release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live",
      discNumber: 1,
      position: 16,
      externalId: "4TkvdQwcxXxusi8JG6mMj7",
      externalLink: "https://open.spotify.com/track/4TkvdQwcxXxusi8JG6mMj7",
    },
    {
      release: "release/ariana-grande-the-boy-is-mine",
      discNumber: 1,
      position: 4,
      externalId: "3X2alXBeUmnYSVXEfURMkR",
      externalLink: "https://open.spotify.com/track/3X2alXBeUmnYSVXEfURMkR",
    },
    {
      release: "release/ariana-grande-the-boy-is-mine-remix",
      discNumber: 1,
      position: 1,
      externalId: "52anJ914oylWdT3CytSMYF",
      externalLink: "https://open.spotify.com/track/52anJ914oylWdT3CytSMYF",
    },
  ],
} as const satisfies Track
