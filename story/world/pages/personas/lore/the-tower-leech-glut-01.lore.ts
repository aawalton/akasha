import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerLeechGlut01 = {
  id: "01a0d44e-84e0-7161-9d25-fe29b1ef2daf",
  type: "page-type/lore",
  slug: "the-tower-leech-glut-01",
  title: "The Glut",
  world: "world/personas",
  about: "character-other/the-tower-leech-glut-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Glut is a swarm of leech-things moving as one pooled mass.",
    "The Glut is fast, and bound to the water.",
    "In the flood the Glut pools and re-forms, so a blow struck at it there cuts water.",
    "Stranded on dry stone, the Glut loses cohesion, turns sluggish and bites weakly.",
    "Out of the water the Glut takes a blow whole.",
    "The Glut recoils from fire, and salt or ash herds it.",
    "The Glut drags what it grips down into the deep to drown it.",
    "The Glut is dead, burned apart at the waterline, and the Cistern's water is empty of it.",
  ],
} as const satisfies Lore
