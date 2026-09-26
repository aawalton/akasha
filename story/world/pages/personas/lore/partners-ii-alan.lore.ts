import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAlan = {
  id: "01a0de0a-3147-7558-b1a9-afc9a89cc457",
  type: "page-type/lore",
  slug: "partners-ii-alan",
  title: "Alan",
  world: "world/personas",
  about: "character-player/partners-ii-alan",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Alan crossed into Aravel mid-stride at dusk, a stranger.",
    "Alan carries a Talent Aravel has never seen.",
    "On Alan's crossing a warm, unreadable coin appeared in his pocket.",
    "On Alan's crossing Hearthholt's iron key-ring appeared in his pocket: five keys, a brass tag.",
    "The System pane registered Alan, and shows his Talent with no classification.",
    "The System has no precedent on record for Alan's Talent.",
    "Alan took the right fork and climbed the switchback to Hearthholt's gate.",
  ],
} as const satisfies Lore
