import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const climbCast = {
  id: "01a0f953-d88d-7e3d-ad53-53ea542e7c58",
  type: "page-type/world-mechanic",
  slug: "climb-cast",
  title: "Cast",
  world: "world/climb",
  description:
    "The women of The Climb are other climbers: real people from the world outside, taken into the tower as Alan was, never personas and never parts of the tower, and every one an adult. Every one is gorgeous, feminine, slim and in her twenties, never heavy, large-chested or older. Each has a life of her own outside, her own reasons for climbing, the wish she would make, and her own wants and nature. The tower casts her in no role: she is herself, and meets the staging, the task and Alan as a real woman would. A woman is met on one floor only and never appears again, so every floor brings a new woman or new women, climbers who reached it first or arrive on it beside him, and the world builder decides who each is and how many the floor's task needs. Each woman has a character-other at `story/world/pages/climb/stories/written/climb/characters/climb-<her name>.character-other.ts`, with `story: \"story-written/climb\"` and `title` her name from the start, and a lore page at `story/world/pages/climb/lore/climb-<her name>.lore.ts` in `world/climb`. Her lore holds her look, her nature and her life outside as facts, and one fact for the floor she met Alan on, as `Floor <n>: <what she did there>`. The world builder lands a new woman's character and lore before the chapter she first appears in, with a portrait as her character's `cover`: render her alone, head to thigh, in the story design's visual style, as her lore's look describes her, as the picture recorder renders a turn but 832 wide and 1216 tall. The renderer draws women busty, so the prompt states her slim build and small chest, and the world builder renders again until it matches before setting `cover`; the memory story recorder tells Alan's character each fact the prose shows him, and adds the floor fact the chapter she meets Alan.",
} as const satisfies WorldMechanic
