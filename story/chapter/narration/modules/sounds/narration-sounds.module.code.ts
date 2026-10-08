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

export function soundedOf(line: string): string {
  return line.replace(BROKEN_OFF, brokenOff)
}
