import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2NollaigAChristmasJourneySilentNight = {
  id: "01a0abea-5066-7f6a-b226-5e58fb832689",
  type: "page-type/track",
  slug: "celtic-woman-2-nollaig-a-christmas-journey-silent-night",
  ownLength: 4.335983333333333,
  ownProgress: 4.335983333333333,
  partOfCollections: ["release/celtic-woman-2-nollaig-a-christmas-journey"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gY5W6nz1l48livBTGRe34",
      externalLink: "https://open.spotify.com/track/1gY5W6nz1l48livBTGRe34",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Silent Night",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "silentnight|6NWtt9pNOL2Gx7kBykdE5x|260159",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/celtic-woman-2-nollaig-a-christmas-journey",
      discNumber: 1,
      position: 6,
      externalId: "1gY5W6nz1l48livBTGRe34",
      externalLink: "https://open.spotify.com/track/1gY5W6nz1l48livBTGRe34",
    },
  ],
} as const satisfies Track
