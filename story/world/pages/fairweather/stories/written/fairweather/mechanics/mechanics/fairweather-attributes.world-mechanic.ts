import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherAttributes = {
  id: "01a106e8-5849-7f66-bcf1-2e4ad50a9070",
  type: "page-type/world-mechanic",
  slug: "fairweather-attributes",
  title: "Attributes",
  world: "world/fairweather",
  description:
    "Every person the System has Named has five attributes, each a whole number from 0 up, always told in this order: Strength, for lifting, swinging and holding on; Toughness, for taking a blow, a bite or a long road; Grace, for quick feet and sure hands; Wits, for learning, brewing and noticing; Heart, for nerve, will and the power behind a skill. Before her Naming a person has none the System counts, and each stands at 0. At her Naming each takes her class's start, and at each level after the first her class's gains, as fairweather-class-attributes states. Her base in an attribute is that start and those gains and nothing else. What she holds is her base plus whatever a skill of Elsie's adds to it, as that skill's page works it out, so any two readers of the same pages reach the same number. No food, rest, item, wound or training moves an attribute. Each is a metric-character-stat page `fairweather-<name>-<attribute>` in this folder's `metrics/stats` folder, titled with the attribute's name, naming its character, with `minValue` 0; Elsie's state `history: \"jsonl\"`. Every girl of the cast has her five from before her first beat, valued for her class and level, and the reader's panels show them once she has appeared. The mechanics recorder moves an attribute on the beat its cause lands, whether a Naming, a level, a bond, a passive or a Tether, one change to each attribute that moved, its note naming the attribute, the old and new numbers and the cause, as `Strength 1 → 6 (Devotion: Tamsin 25%)`; on a chapter's last beat it appends a history line to each of Elsie's that moved in the chapter.",
} as const satisfies WorldMechanic
