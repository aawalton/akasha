const BROKEN_OFF =
  /(?<![\p{L}\p{N}'’])([bcdfghjklmnpqrstvwxz]{1,4})(?=\s*(?:[—–]|-(?!\p{L})|…|\.{2,}))/giu
const SAID_WHOLE: ReadonlySet<string> = new Set([
  "br",
  "gr",
  "hm",
  "hmph",
  "hrm",
  "m",
  "mhm",
  "n",
  "ngh",
  "nh",
  "pft",
  "pst",
  "sh",
  "tch",
  "tsk",
  "z",
])
const LETTER_RUN = /(\p{L})\1+/gu

function brokenOff(fragment: string): string {
  const said = fragment.toLowerCase().replace(LETTER_RUN, "$1")
  return SAID_WHOLE.has(said) ? fragment : `${fragment}uh`
}

const STUTTER = /(?<![\p{L}\p{N}'’-])((?:[bcdfghjklmnpqrstvwxyz]{1,3}-)+)(\p{L}+)/giu
const PAIRED: Readonly<Record<string, string>> = {
  sh: "ʃ",
  ch: "ʧ",
  th: "θ",
  wh: "w",
  ph: "f",
  ck: "k",
  kn: "n",
  wr: "ɹ",
  gh: "ɡ",
}
const LONE: Readonly<Record<string, string>> = {
  b: "b",
  c: "k",
  d: "d",
  f: "f",
  g: "ɡ",
  h: "h",
  j: "ʤ",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  p: "p",
  q: "k",
  r: "ɹ",
  s: "s",
  t: "t",
  v: "v",
  w: "w",
  x: "z",
  y: "j",
  z: "z",
}
const SOFTENS = /^[eiy]/
const VOICED_TH =
  /^th(?:e|at|is|ese|ose|ey|em|eir|eirs|ere|en|an|ough|us|ee|y|ou|ine|emselves|erefore)(?!\p{L})/u

function consonantsOf(fragment: string, word: string): string {
  const lower = fragment.toLowerCase()
  const after = word.toLowerCase().slice(lower.length)
  let said = ""
  let at = 0
  while (at < lower.length) {
    const pair = PAIRED[lower.slice(at, at + 2)]
    if (pair !== undefined && at + 1 < lower.length) {
      said += pair === "θ" && VOICED_TH.test(word.toLowerCase()) ? "ð" : pair
      at += 2
      continue
    }
    const letter = lower.charAt(at)
    const softened = letter === "c" && at === lower.length - 1 && SOFTENS.test(after)
    said += softened ? "s" : (LONE[letter] ?? "")
    at += 1
  }
  return said
}

function stuttered(found: string, chain: string, word: string): string {
  const fragments = chain.split("-").slice(0, -1)
  const lower = word.toLowerCase()
  const repeats = fragments.every(
    (one) => one.length < word.length && lower.startsWith(one.toLowerCase())
  )
  if (!repeats) return found
  const said = fragments.map((one) => `[${one}](/${consonantsOf(one, word)}ə/)`)
  return `${said.join(" ")} ${word}`
}

export function soundedOf(line: string): string {
  return line.replace(STUTTER, stuttered).replace(BROKEN_OFF, brokenOff)
}
