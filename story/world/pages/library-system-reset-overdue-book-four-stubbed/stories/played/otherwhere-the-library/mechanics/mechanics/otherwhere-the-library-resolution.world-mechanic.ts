import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereTheLibraryResolution = {
  id: "01a0e35e-db9c-7338-91a7-c236d4f25fef",
  type: "page-type/world-mechanic",
  slug: "otherwhere-the-library-resolution",
  title: "Resolution",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    'Every declared act whose outcome is in doubt and matters is settled by the otherwhere-action-check, and nothing else decides it: not the phrasing, not what the scene wants. An act that is sure, trivial or harmless to fail is simply told. The game master picks the band from the fiction before rolling: easy (8) for what a fit, calm person usually manages, standard (12) for real effort or risk, hard (16) for what an untrained person rarely pulls off, extreme (20) for the near-impossible. Bonuses name what earns them and run from minus four to four each, at most six either way in total: what she knows or learned from a book she understood, a fitting tool (salt against a bookworm, a broom as a reach), a plan that exploits a weakness, help from someone present, preparation; and against her, pain, exhaustion, hunger, darkness, haste, her body\'s unfamiliar reach and balance in its first days, and ignorance of what she faces. Her new body is not weaker by rule; it is unfamiliar, and that costs her until she has used it. Settle with `akasha story settle --story otherwhere --check otherwhere-action-check --dice 1d20 --reading \'{"band":"standard","bonuses":[{"from":"salt","by":2}]}\'` on the turn, before telling the outcome. Tell the outcome the roll answered: strong comes off well with something extra, success comes off, cost comes off with a real price the game master picks (hurt, lost time, noise, a broken tool, a drain on the Library\'s power), failure fails and the situation worsens. A natural twenty is strong and a natural one fails whatever the margin. Harm and health follow otherwhere-combat, and being taken down with danger present is a real loss, never softened to save the scene. Dice, bands and margins never appear in the prose.',
} as const satisfies WorldMechanic
