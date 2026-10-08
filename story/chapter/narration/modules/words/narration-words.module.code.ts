const NUMBERED =
  /(?<![\p{L}\p{N}])(\p{Lu}[\p{L}'’.]+)(\s+)(II|III|IV|VI|VII|VIII|IX|XI|XII)(?![\p{L}\p{N}])/gu
const ORDINALS: Readonly<Record<string, string>> = {
  II: "the Second",
  III: "the Third",
  IV: "the Fourth",
  VI: "the Sixth",
  VII: "the Seventh",
  VIII: "the Eighth",
  IX: "the Ninth",
  XI: "the Eleventh",
  XII: "the Twelfth",
}
const CARDINALS: Readonly<Record<string, string>> = {
  II: "Two",
  III: "Three",
  IV: "Four",
  VI: "Six",
  VII: "Seven",
  VIII: "Eight",
  IX: "Nine",
  XI: "Eleven",
  XII: "Twelve",
}
const COUNTING: ReadonlySet<string> = new Set([
  "act",
  "book",
  "chapter",
  "class",
  "diablo",
  "empires",
  "episode",
  "gen",
  "generation",
  "grade",
  "level",
  "mark",
  "mk",
  "model",
  "part",
  "phase",
  "round",
  "season",
  "series",
  "stage",
  "tier",
  "trek",
  "type",
  "volume",
  "voyager",
  "war",
])
const LOWER = /\p{Ll}/u

function numbered(found: string, head: string, space: string, numeral: string): string {
  if (!LOWER.test(head)) return found
  const counts = COUNTING.has(head.replace(/\.$/, "").toLowerCase())
  const said = counts ? CARDINALS[numeral] : ORDINALS[numeral]
  return said === undefined ? found : `${head}${space}${said}`
}

export function numberedOf(line: string): string {
  return line.replace(NUMBERED, numbered)
}
