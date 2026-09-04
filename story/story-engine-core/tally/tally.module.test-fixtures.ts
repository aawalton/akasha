import type { BoundaryLens, TallyCatalog } from "../tally-catalog/tally-catalog.module.code.ts"
import type { computeTally } from "./tally.module.code.ts"

export const CATALOG: TallyCatalog = {
  catalogVersion: 19,
  patterns: [
    {
      id: "closing-dialect:stay",
      family: "template",
      regex: "\\bstay\\b",
      flags: "gi",
      provenance: "THE CLOSING DIALECT — 'stay' one-word plea (coarse screen)",
    },
    {
      id: "closing-dialect:ive-got-you",
      family: "template",
      regex: "\\bi(?:['’])?ve got you\\b",
      flags: "gi",
      provenance: "THE CLOSING DIALECT — 'I've got you'",
    },
    {
      id: "closing-dialect:im-not-going-anywhere",
      family: "template",
      regex: "\\bi(?:['’])?m not going anywhere\\b",
      flags: "gi",
      provenance: "THE CLOSING DIALECT — 'I'm not going anywhere'",
    },
    {
      id: "closing-dialect:there-bare",
      family: "template",
      regex: "(?<=^|[\"'“\\s])There\\.(?=\\s|[\"'”]|$)",
      flags: "",
      provenance: "THE CLOSING DIALECT — bare 'There.'",
    },
    {
      id: "way-x-does",
      family: "template",
      regex: "\\bthe way (?:s?he|they|\\w+) (?:does|did|do) \\w+",
      flags: "gi",
      provenance: "the way-[X-does-habitual-Y] shape",
    },
    {
      id: "unhurried",
      family: "template",
      regex: "\\bunhurried\\b",
      flags: "gi",
      provenance: "THE CLOSING DIALECT — 'unhurried'",
    },
    {
      id: "lyric-engine:let",
      family: "let-verb",
      regex: "\\blets?\\s+(?:her|him|them|it|the|herself|himself|themselves|his|its)\\s+\\w+",
      flags: "gi",
      provenance: "THE LYRIC ENGINE — 'let'-verb loosening",
    },
    {
      id: "named-feeling:ribs",
      family: "telling",
      regex:
        "\\b(?:somewhere\\s+)?(?:under|below|behind|beneath)\\s+(?:her|his|their|the)\\s+ribs\\b",
      flags: "gi",
      provenance: "THE NAMED FEELING — located-abstraction ribs template",
    },
  ],
}

export const TURN_1 =
  '"Stay," she said, unhurried. "I\'ve got you. I\'m not going anywhere."\nShe lets her shoulders drop. "There." Something settles below her ribs.'

export const TURN_2 =
  "He loved the way she does everything. Stay meant stay, and she would stay.\nA warmth behind his ribs, and something somewhere under the ribs too."

export const TURNS = [
  { externalId: "turn-1", turnNumber: 1, title: "One", text: TURN_1 },
  { externalId: "turn-2", turnNumber: 2, title: "Two", text: TURN_2 },
]

export function turn(result: ReturnType<typeof computeTally>, turnIdx: number) {
  const t = result.perTurn[turnIdx]
  if (t === undefined) throw new Error(`no turn at index ${turnIdx}`)
  return t
}

export function hit(result: ReturnType<typeof computeTally>, turnIdx: number, id: string) {
  const h = turn(result, turnIdx).hits.find((x) => x.id === id)
  if (h === undefined) throw new Error(`no hit ${id}`)
  return h
}

export function total(result: ReturnType<typeof computeTally>, id: string) {
  const t = result.cumulative.patternTotals.find((x) => x.id === id)
  if (t === undefined) throw new Error(`no total ${id}`)
  return t
}

export const BOUNDARY_LENS: BoundaryLens = {
  runThreshold: 3,
  head: {
    fallback: "ambient-reestablish",
    screens: [
      {
        category: "dialogue",
        regex: "^\\s*(?:\\[[^\\]]*\\]|[\"'“‘])",
        provenance: "spoken head",
      },
      {
        category: "perception",
        regex:
          "\\byou\\s+(?:see|saw|hear|heard|feel|felt|know|knew|notice|decide|decided|realize)\\b",
        flags: "i",
        provenance: "you + perception/cognition verb (coarse)",
      },
      {
        category: "in-motion",
        regex: "^\\s*(?:and|but|so|then|still|now|again|by the time|before|after)\\b",
        flags: "i",
        provenance: "opens mid-stream on a continuation connective (coarse)",
      },
      {
        category: "action",
        regex:
          "\\byou\\s+(?:go|climb|take|turn|step|raise|set|crouch|stand|strike|lift|pull|give|travel|sit|reach|walk|run|make)\\b",
        flags: "i",
        provenance: "you + physical-action verb (coarse)",
      },
    ],
  },
  close: {
    fallback: "resolved",
    screens: [
      {
        category: "dialogue",
        regex: "(?:\\[[^\\]]*\\]|[\"'“”‘’])",
        provenance: "close is a spoken line (speaker tag / quote present)",
      },
      {
        category: "poised",
        regex:
          "\\b(?:not yet|whenever you|waiting|about to|on the threshold|take your time|not going anywhere|whatever you (?:decide|choose))\\b[^.]*[.!?]?\\s*$",
        flags: "i",
        provenance: "held/expectant wait-state close (coarse — the poised tell)",
      },
      {
        category: "noticed",
        regex: "\\byou\\s+(?:know|see|feel|notice|realize|hear)\\b[^.]*[.!?]?\\s*$",
        flags: "i",
        provenance: "closes on a noticed detail (coarse)",
      },
    ],
  },
  youInitial: {
    regex: "^\\s*You\\b",
    provenance: "same-word 2nd-person opening; ~68% base rate — read RUNS not rate",
  },
}

export const BOUNDARY_CATALOG: TallyCatalog = {
  catalogVersion: 20,
  patterns: CATALOG.patterns,
  boundaryLens: BOUNDARY_LENS,
}

export function bTurn(text: string, turnNumber: number) {
  return { externalId: `bt-${turnNumber}`, turnNumber, text }
}
