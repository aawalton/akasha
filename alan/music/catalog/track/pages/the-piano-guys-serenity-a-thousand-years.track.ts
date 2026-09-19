import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityAThousandYears = {
  id: "01a0afa2-09c3-7161-91ac-88a65a25d83f",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-a-thousand-years",
  ownLength: 4.59955,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LqIdsI9UU5YJOJQCAqztR",
      externalLink: "https://open.spotify.com/track/4LqIdsI9UU5YJOJQCAqztR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Thousand Years",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|275973",
  song: "song/evynne-hollens-a-thousand-years",
} as const satisfies Track
