import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emei9LivesAllTheseKids = {
  id: "01a0c43e-790a-7de7-b71e-3dc2ad163ac4",
  type: "page-type/track",
  slug: "emei-9-lives-all-these-kids",
  ownLength: 1.9515166666666666,
  ownProgress: 1.9515166666666666,
  partOfCollections: [
    "release/emei-9-lives",
    "release/emei-all-these-kids",
    "release/emei-rabbithole-2",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "ALL THESE KIDS",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "allthesekids|7E2aQQjErJocovYFjYLzWU|117091",
  song: "song/emei-all-these-kids",
  carriedBy: [
    {
      release: "release/emei-9-lives",
      discNumber: 1,
      position: 2,
      externalId: "2lWgmCLkKt9KYjf60ZeZs9",
      externalLink: "https://open.spotify.com/track/2lWgmCLkKt9KYjf60ZeZs9",
    },
    {
      release: "release/emei-all-these-kids",
      discNumber: 1,
      position: 1,
      externalId: "4GCMUoBhLMELZ9yf1xHQbc",
      externalLink: "https://open.spotify.com/track/4GCMUoBhLMELZ9yf1xHQbc",
    },
    {
      release: "release/emei-rabbithole-2",
      discNumber: 1,
      position: 2,
      externalId: "4RgD26YY5ohlaMkkIqHh0J",
      externalLink: "https://open.spotify.com/track/4RgD26YY5ohlaMkkIqHh0J",
    },
  ],
} as const satisfies Track
