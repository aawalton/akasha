import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyYoullBeInMyHeart = {
  id: "01a0afa1-ddf0-722c-91b8-a8c83e22a42c",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-youll-be-in-my-heart",
  ownLength: 4.123483333333334,
  ownProgress: 4.123483333333334,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-3-wedding-season",
    "release/the-piano-guys-autumn-on-piano",
    "release/the-piano-guys-relaxing-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "You'll Be In My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "youllbeinmyheart|0jW6R8CVyVohuUJVcuweDI|247409",
  song: "song/the-piano-guys-youll-be-in-my-heart",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 6,
      externalId: "2tPPk70bDRfegwHFJXc0f0",
      externalLink: "https://open.spotify.com/track/2tPPk70bDRfegwHFJXc0f0",
    },
    {
      release: "release/the-piano-guys-3-wedding-season",
      discNumber: 1,
      position: 6,
      externalId: "3ta3IRrOxI3QJx7X2IdlMl",
      externalLink: "https://open.spotify.com/track/3ta3IRrOxI3QJx7X2IdlMl",
    },
    {
      release: "release/the-piano-guys-autumn-on-piano",
      discNumber: 1,
      position: 9,
      externalId: "3jk6mKKYESmxddccvJBKYl",
      externalLink: "https://open.spotify.com/track/3jk6mKKYESmxddccvJBKYl",
    },
    {
      release: "release/the-piano-guys-relaxing-piano",
      discNumber: 1,
      position: 17,
      externalId: "5147RgnFXB445XB1NKSqPO",
      externalLink: "https://open.spotify.com/track/5147RgnFXB445XB1NKSqPO",
    },
  ],
} as const satisfies Track
