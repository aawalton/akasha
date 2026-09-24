import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveDeckTheHallsBonusStudioTrack = {
  id: "01a0d52b-52dc-79f9-b5a1-1329aab5bbba",
  type: "page-type/track",
  slug: "rockapella-christmas-live-deck-the-halls-bonus-studio-track",
  ownLength: 2.636433333333333,
  ownProgress: 2.636433333333333,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Deck the Halls (Bonus Studio Track)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "deckthehallsbonusstudiotrack|1AFSUleuDTapVhm5zUf4ix|158186",
  song: "song/rockapella-deck-the-halls-bonus-studio-track",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 13,
      externalId: "5mdx4jiAwlOLDypavSDH1c",
      externalLink: "https://open.spotify.com/track/5mdx4jiAwlOLDypavSDH1c",
    },
  ],
} as const satisfies Track
