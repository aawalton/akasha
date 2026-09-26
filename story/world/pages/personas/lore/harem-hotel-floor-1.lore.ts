import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelFloor1 = {
  id: "01a0de01-b455-78f6-bae5-54228d095cec",
  type: "page-type/lore",
  slug: "harem-hotel-floor-1",
  title: "Floor 1",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Floor 1's challenge is one chamber past the far shut door, holding a single warden, the Doorward.",
    "Floor 1 is a construct floor, grown of the Hotel's dead-white plaster and lit flat by no lamp.",
    "Alan enters floor 1's fight bare, with no weapon and no armor.",
    "The Doorward strikes with heavy plaster blows and can grab and pin a fighter.",
    "Being pinned or flanked by the Doorward can kill a level-1 fighter.",
    "The Doorward can be beaten with no read of its seam, only more slowly.",
    "The Doorward's seam shows as a hairline for an instant when the flat light crosses it.",
    "A guarded seam on the Doorward reopens to an opening earned in the fight, never locking for good.",
    "The Doorward's guarding of its seam is its one reaction; it learns no other tactic.",
    "A niche the floor-1 challenge chamber presses out of its wall holds one Phial of Still Water.",
    "A Phial of Still Water restores a moderate share of health or stamina, once.",
    "The keystone knife is light and keen, made for placement rather than power.",
    "The keystone knife deals little base damage and scales with finesse, needing no might.",
    "The keystone knife opens a finesse-placed strike at a warden's keystone.",
    "Clearing floor 1 lifts Alan to level 2.",
  ],
} as const satisfies Lore
