import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherBonds = {
  id: "01a1063a-3029-7d46-8835-97e490c05112",
  type: "page-type/world-mechanic",
  slug: "fairweather-bonds",
  title: "Bonds",
  world: "world/fairweather",
  description:
    "A bond is how much one girl of the cast feels for Elsie, as the System counts it: the number is hers toward Elsie, never Elsie's toward her, for Elsie loves them all alike. Each is `relationshipPoints` on a world-relationship page `fairweather-elsie-<name>` in this folder's `relationships` folder, naming Elsie and the girl: a whole number from 0 up with no ceiling, never below 0, and never fading with days apart. A girl with a character page has a bond from the first beat in which she or Elsie speaks to the other, and the mechanics recorder makes it with `make` on that beat at 0, plus anything that beat earns. Townsfolk with no character page have none. What moves a bond is fairweather-bond-moments. The System opens no window when a bond moves. A window Elsie opens that shows bonds shows every bond she has, each as the girl's name and her number as it stands at that beat, as `Bonds: Tamsin 6, Tilly 6, Cora 3`, and nothing more: no band and no word for what a number means. No skill Elsie holds reads a bond or moves one: a skill used on a girl earns nothing of itself, and her leave for it is what earns. A skill that comes later and reads bonds says so on its own page. The closeness rung a relationship page computes is the personas' ladder, and nothing in Lanternmere reads it. When a girl joins the family or falls for Elsie stays the world builder's call from the prose, never from her number.",
} as const satisfies WorldMechanic
