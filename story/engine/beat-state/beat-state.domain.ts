import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const beatState = {
  id: "01a10235-fdaa-7b5b-968e-b88481cce87f",
  type: "page-type/domain",
  slug: "beat-state",
  definition: "the state of a story worked out by replaying its beats in order",
  parts: ["module/beat-replay", "module/beat-changes", "module/beat-memory"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's event is a line of the turn's beats, as it always was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each step's part of a beat is a list of its own on the turn, keyed by beat number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's beats are the only source of what is true in it now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lore the world builder writes is the world's setup, true before any beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact's knowers are a cache of the beats where each knower learned it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reader is shown a fact in a beat of its own, apart from who learns it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat is one event of at most 100 characters and what that event changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat states only what differs from the state the beat before left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's state is every beat of the story replayed in turn order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's or chapter's end state is the state after its last beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's state before its first turn is a beat of its own, its opening.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding a current value is a cache rebuilt from the beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the cache rebuild writes a current value onto a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master states each beat's event, time, place and who is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mechanics step states each beat's numbers, items, conditions and bonds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder states who learned what in a beat and the lore the beat settled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part of a beat is stated by one step alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rerun replaces its turn's beats whole, so nothing is applied twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats leaving an impossible state are refused as they are handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clock running back, or one character in two places, is an impossible state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spending what is not held, or holding less than none, is an impossible state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming a place, character or mechanic no page defines is an impossible state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer renders each beat with what it changed, and adds no number.",
    },
  ],
} as const satisfies Domain
