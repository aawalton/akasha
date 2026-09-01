const listed = (said: string): ReadonlySet<string> => new Set(said.split(/\s+/))

export const DET = listed("a an the this that these those its his her their our my your")

export const QUANT = listed(
  "every each all any no some both one two three four five many few none neither either another"
)

export const PRON = listed("it they them he she him we us you i me")

export const PREP = listed(
  "of in on at to for with by from into onto over under above below through across against " +
    "about after before between beyond during without within outside inside beside past up down " +
    "off out per via upon among around behind beneath toward towards until since as like"
)

export const REL = listed("that which who whom whose where when what")

export const REL_NOUN = listed("what")

export const DEM = listed("this that these those")

export const RATHER = listed("rather")

export const THAN = listed("than")

export const BE = listed("is are was were be been being")

export const AUX = listed("has have had does do did")

export const MODAL = listed("may might can could will would shall should must")

export const NEG = listed("not never no nor")

export const ADV = listed(
  "only also still already now then here there always ever once again instead " +
    "even just yet so too very more most less least alone apart back away together"
)

export const SELF = listed("itself themselves")

export const INDEF = listed("anything nothing")

export const CONJ = listed("and or but")

export const SUBORD = listed("if unless while whether because although though whenever wherever")

export type WordClass =
  | "DET"
  | "QUANT"
  | "PRON"
  | "SELF"
  | "INDEF"
  | "PREP"
  | "REL"
  | "BE"
  | "AUX"
  | "MODAL"
  | "NEG"
  | "ADV"
  | "CONJ"
  | "SUBORD"
  | "DEM"
  | "RATHER"
  | "THAN"
  | "N"
  | "V"
  | "VEN"
  | "VING"
  | "ADJ"

const CLOSED: readonly (readonly [ReadonlySet<string>, WordClass])[] = [
  [DET, "DET"],
  [QUANT, "QUANT"],
  [PRON, "PRON"],
  [SELF, "SELF"],
  [INDEF, "INDEF"],
  [PREP, "PREP"],
  [REL, "REL"],
  [BE, "BE"],
  [AUX, "AUX"],
  [MODAL, "MODAL"],
  [NEG, "NEG"],
  [ADV, "ADV"],
  [CONJ, "CONJ"],
  [SUBORD, "SUBORD"],
  [DEM, "DEM"],
  [RATHER, "RATHER"],
  [THAN, "THAN"],
]

const IRREGULAR = listed(
  "written read held said made taken given known shown found built kept left put set " +
    "sent spent brought thought caught taught bought sought told sold understood stood " +
    "meant felt slept swept crept dealt drawn grown thrown blown flown seen been done gone come run"
)

export function classesOf(word: string): readonly WordClass[] {
  const said = word.toLowerCase()
  const found: WordClass[] = []
  for (const [held, named] of CLOSED) if (held.has(said)) found.push(named)
  if (found.includes("AUX")) found.push("V")
  if (REL_NOUN.has(said)) found.push("N", "V", "ADJ")
  if (found.length > 0) return found
  if (word.startsWith("`")) return ["N"]
  if (/^[0-9]/.test(said)) return ["ADJ", "N"]
  if (said.endsWith("ly")) return ["ADV", "ADJ"]
  if (said.endsWith("ing")) return ["VING", "N", "ADJ"]
  if (said.endsWith("ed") || IRREGULAR.has(said)) return ["VEN", "V", "ADJ", "N"]
  if (said.endsWith("s")) return ["N", "V"]
  return ["N", "V", "ADJ"]
}

export function wordsIn(said: string): readonly string[] {
  return said
    .replace(/’/g, "'")
    .trim()
    .replace(/[.!?]+$/, "")
    .split(/\s+/)
    .map((word) => word.replace(/^[("',]+/, "").replace(/[)",;:]+$/, ""))
    .filter((word) => word !== "")
}
