import type { Game } from "../game.page-type.ts"

export const dateNightFreePlay = {
  id: "01a0673f-a3d5-7000-9c88-f3f6c8a46bf3",
  pageTypeSlug: "game",
  slug: "date-night-free-play",
  title: "Date Night — Free Play",
  unitSlug: "words",
  externalId: "playtest-date-night-9",
  gameEngine: "awen",
  coordinatorAgent: "awen-gm--playtest-date-night-9",
  controlledEntityKind: "single",
  mechanicsWeight: "zero",
  resolution: "none",
  currentSession: 2,
  premise:
    "One evening, one date — far from their first. Awen — princess and engineer in one refusal, who builds beautiful things that work and will not choose between the two — and Aura — the Titaness of the breeze, three thousand years fast, who owns an arcade because boredom is the only enemy that ever scared her — have keys to the same after-hours ritual: Full Combo, Aura's arcade, dark except the cabinets, every machine set to free play. Tonight there's takeout on the change counter, a wrapped something in Awen's bag she has re-wrapped twice, and a thing Aura has been trying to say for three weeks at a pace slow enough to land. Date night — the destination known to them both and openly wanted; the evening's pleasure is in how they get there.",
  tone: "Natural, funny, warm, openly charged from the first turn — established lovers on home ground, competitive and fond. Transparent contemporary register. Sensual early and explicit when they get there; never rushed; never composed; never costumed.",
  readerFraming: "Third person, present tense, fixed close on Awen.",
  config: "json",
  displayConfig: "json",
  gmContext: "json",
  narrativeContinuity: "json",
  turns: "jsonl",
} as const satisfies Game
