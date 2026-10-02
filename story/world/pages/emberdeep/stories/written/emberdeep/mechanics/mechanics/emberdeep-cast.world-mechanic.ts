import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const emberdeepCast = {
  id: "01a0fdaf-81ba-7dcc-8d2b-ee03de6602f3",
  type: "page-type/world-mechanic",
  slug: "emberdeep-cast",
  title: "Cast",
  world: "world/emberdeep",
  description:
    "Nala is Alan, woken in a woman's body: about twenty, petite, pale and freckled, with long dark red hair, her face as her character's `coverDescription` says. The girls of Emberdeep are delvers and the young women of the trade around the Deep, adults in their twenties, never personas: every one gorgeous, feminine and slim, never heavy, large-chested or older, each with her own home, family, craft, wants and troubles. Other townsfolk are adults of any age, and no man is ever a love interest. The premise names the first girls; the world builder makes each her own, invents the rest, decides when each enters, and starts with the girls Nala meets on her first day. Each named character has a character-other at `story/world/pages/emberdeep/stories/written/emberdeep/characters/emberdeep-<name>.character-other.ts`, with `story: \"story-written/emberdeep\"` and `title` her name, and a lore page at `story/world/pages/emberdeep/lore/emberdeep-<name>.lore.ts` in `world/emberdeep` holding her look, her nature and her life as facts. Nala's own lore, `emberdeep-nala.lore.ts` there, holds what she remembers of being Alan, what her body is, and what she finds of the Nala whose life she woke into, and the world builder lands it before chapter 1. The world builder lands each other character's page and lore before the chapter she first appears in, with a portrait as her `cover`: render her alone, head to thigh, in the story design's visual style, as her lore's look describes her, as the picture recorder renders a turn but 832 wide and 1216 tall. The renderer draws women busty, so the prompt states her slim build and small chest, and the world builder renders again until it matches before setting `cover`. The memory story recorder tells each character each fact the prose shows her.",
} as const satisfies WorldMechanic
