import type { Game } from "../game.page-type.ts"

export const dragonsAndDungeons = {
  id: "01a0673f-a3d6-7000-abe5-40f31e53a44d",
  pageTypeSlug: "game",
  slug: "dragons-and-dungeons",
  title: "Dragons & Dungeons",
  unitSlug: "words",
  externalId: "dragons-and-dungeons",
  gameEngine: "awen",
  coordinatorAgent: "awen-gm--dragons-and-dungeons",
  controlledEntityKind: "single",
  mechanicsWeight: "zero",
  resolution: "none",
  currentSession: 2,
  premise:
    "Three dragon cousins — Aria (silver, devoted), Ceri (amethyst, aloof), and Mari (black, all appetite) — run a very mature tabletop game for one mortal. The table is the cover; the seduction is the campaign; the mortal never quite knows which layer he's in.",
  tone: "Warm, mischievous, sensual.",
  readerFraming: "First person, from the mortal's perspective.",
  genre: ["narrative", "ttrpg"],
  displayConfig: "json",
  gmContext: "json",
  narrativeContinuity: "json",
  turns: "jsonl",
  towerSessions: "jsonl",
} as const satisfies Game
