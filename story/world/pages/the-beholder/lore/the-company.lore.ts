import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theCompany = {
  id: "01a0ddf8-63fd-7677-aa87-33227c2be418",
  type: "page-type/lore",
  slug: "the-company",
  title: "The Company",
  world: "world/the-beholder",
  loreDisclosure: "lore-disclosure/wiki",
  facts: [
    "The Company is a ballet and theatre company.",
    "The Company runs a funded performing season supported by patrons.",
    "Mr. Aldous is a patron who funds half the Company's season.",
    "The Company performed a multi-act show with a featured solo for its prima, Colette Vane.",
    "The prompt-side wing is the backstage area where Pearl watches the show with her dress kit.",
    "After the show the big stage rig clunks down to the work-lights.",
    "The work-lights are low amber lights that make everything look like it's remembering itself.",
    "The house empties within about twenty minutes of the final bow.",
    "The Company has a green room, and a mirror studio off it.",
    "The mirror studio is walled entirely in mirror, and its light is kind.",
    "Colette liked to break down her heavy costumes in the mirror studio after shows, with Pearl's help.",
    "Pearl killed Colette in the mirror studio.",
    "The mirrors around Pearl and Colette reflected a hundred of each of them.",
    "Pearl is a wardrobe assistant at the Company.",
    "Colette Vane was the Company's prima.",
    "Tamsin is a new corps dancer at the Company.",
    "Mr. Aldous is a patron of the Company.",
  ],
} as const satisfies Lore
