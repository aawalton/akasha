import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const fairweatherNell = {
  id: "01a1070e-2cf7-74dd-8415-4299e5844cdd",
  type: "page-type/lore",
  slug: "fairweather-nell",
  title: "Nell",
  world: "world/fairweather",
  about: "character-other/fairweather-nell",
  facts: [
    {
      fact: "Nell Reyes is nineteen, slim and freckled, with green eyes and copper curls tied up in blue cloth.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-nell"],
    },
    {
      fact: "Nell wears a faded blue work shirt, a brown canvas waistcoat, canvas trousers and a red kerchief.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-nell"],
    },
    {
      fact: "A thin pale scar runs across the back of Nell's left hand.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-nell"],
    },
    {
      fact: "Nell is cheerful, quick and stubborn, and writes Tamsin letters she never sends.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-nell"],
    },
  ],
} as const satisfies Lore
