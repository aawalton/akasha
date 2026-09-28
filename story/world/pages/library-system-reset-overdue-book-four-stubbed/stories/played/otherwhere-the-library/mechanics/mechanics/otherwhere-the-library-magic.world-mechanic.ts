import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereTheLibraryMagic = {
  id: "01a0e366-0af5-72df-a97a-c245e30e4198",
  type: "page-type/world-mechanic",
  slug: "otherwhere-the-library-magic",
  title: "Magic and Mana",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "Magic is knowledge made power: she can work only what she has learned from a book she understood (see otherwhere-progression), and each power she learns is filed as a world-skill page stating its mana cost as `manaCost`, how many minutes it holds as `durationMinutes` where it holds at all, and a description by the What It Is rule on world-mechanic, with an otherwhere-skill page naming her and that power, set by the world builder when she learns it: a small working 1 to 2, a real one 3 to 5, a great one 6 or more. Casting is an otherwhere-action-check with her knowledge of that power as a bonus of one to three; the mana is spent whether it works or not, and a failure also costs a point of health from backlash. She cannot spend mana she lacks; pushing past nought spends health instead, two for each point short, and knocks her down at nought health as a blow would. Her mana starts at 10 and its maximum grows by 2 with each synchronization. Mana comes back 1 a turn at rest and all of it after a night's sleep. While she is linked to the core and the Library is in Emergency Power Mode, the Library draws on her: each synchronization costs her all her mana and 3 health, and each night the Library takes 1 of her mana back before she wakes until its power passes 25. Links can feel what she casts inside the Library. Write every mana change onto her otherwhere-mana page and a line of its history before the turn advances. The interface names a power the first time she gains it; after that it is told in the prose.",
} as const satisfies WorldMechanic
