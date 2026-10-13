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

const SHOUTED =
  /(\[[^\]]*\]\([^)]*\))|(?<![\p{L}\p{N}'’])(\p{Lu}[\p{Lu}'’]*\p{Lu})(?![\p{L}\p{N}'’])/gu
const VOWEL = /[AEIOUY]/
const ROMAN = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
const APOSTROPHES = /['’]/g
const SPELLED_AS_NAMES: ReadonlySet<string> = new Set([
  "ach",
  "act",
  "add",
  "ah",
  "aid",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "cap",
  "coo",
  "dab",
  "dew",
  "dip",
  "doe",
  "elf",
  "for",
  "go",
  "had",
  "he",
  "her",
  "hi",
  "him",
  "his",
  "how",
  "if",
  "in",
  "is",
  "it",
  "its",
  "me",
  "mod",
  "my",
  "not",
  "of",
  "oft",
  "oh",
  "ok",
  "on",
  "or",
  "our",
  "pow",
  "put",
  "she",
  "sir",
  "so",
  "the",
  "thy",
  "to",
  "up",
  "us",
  "was",
  "we",
  "who",
  "why",
  "you",
])

function shouted(found: string, markup: string | undefined, word: string | undefined): string {
  if (markup !== undefined || word === undefined) return found
  const letters = word.replace(APOSTROPHES, "")
  if (!VOWEL.test(letters) || ROMAN.test(letters)) return found
  const lower = word.toLowerCase().replace(APOSTROPHES, "'")
  if (letters.length < 4 && !SPELLED_AS_NAMES.has(lower)) return found
  return `[${lower}](+2)`
}

export function shoutedOf(sentence: string): string {
  return sentence.replace(SHOUTED, shouted)
}

const WRITTEN =
  /(\[[^\]]*\]\([^)]*\))|(?<![\p{L}\p{N}'’])(\p{L}[\p{L}'’]*\p{L})(?![\p{L}\p{N}'’])/gu
const TURNED = /\p{Ll}[\p{L}'’]*\p{Lu}|^\p{Lu}{2,}\p{Ll}/u
const TAILED = /^\p{Lu}+(?:s|['’]s|uh|z|ing)$/u
const CAMEL = /^(?:\p{Ll}{2,}|\p{Lu}\p{Ll}{2,}|Mc|Mac|De|Di|La|Le|Du)(?:\p{Lu}\p{Ll}{2,})+$/u
const BRANDED = /^[ie]\p{Lu}\p{Ll}{2,}(?:['’]s)?$/u
const JOINED =
  /^(?:\p{Lu}\p{Ll}*|[dDlL])['’]\p{Lu}\p{Ll}+(?:['’]s)?$|^\p{Lu}\p{Ll}{4,}(?:\p{Lu}|TM)$/u
const POSSESSED = /['’]s$/u
const WRITTEN_SO: ReadonlySet<string> = new Set(["pH", "mL", "PhD", "LitRPG"])
const RAMBLING = 12

function meantSo(word: string): boolean {
  if (WRITTEN_SO.has(word) || TAILED.test(word)) return true
  if (word.replace(APOSTROPHES, "").length > RAMBLING) return true
  return CAMEL.test(word.replace(POSSESSED, "")) || BRANDED.test(word) || JOINED.test(word)
}

function unjumbled(found: string, markup: string | undefined, word: string | undefined): string {
  if (markup !== undefined || word === undefined || !TURNED.test(word) || meantSo(word)) {
    return found
  }
  return `${word.charAt(0)}${word.slice(1).toLowerCase()}`
}

export function unjumbledOf(line: string): string {
  return line.replace(WRITTEN, unjumbled)
}

const SMALL_CAPS: Readonly<Record<string, string>> = {
  ᴀ: "a",
  ʙ: "b",
  ᴄ: "c",
  ᴅ: "d",
  ᴇ: "e",
  ꜰ: "f",
  ғ: "f",
  ɢ: "g",
  ʜ: "h",
  ɪ: "i",
  ᴊ: "j",
  ᴋ: "k",
  ʟ: "l",
  ᴍ: "m",
  ɴ: "n",
  ᴏ: "o",
  ᴘ: "p",
  ǫ: "q",
  ʀ: "r",
  ꜱ: "s",
  ᴛ: "t",
  ᴜ: "u",
  ᴠ: "v",
  ᴡ: "w",
  ʏ: "y",
  ᴢ: "z",
}
const SMALL_CAP = /[ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡʏᴢ]/u
const LETTERED = /(?:\p{L}|̨)+/gu
const HOOKED_O = /ᴏ̨/gu
const OPENS_SENTENCE = /(?:^|[.!?…]["'”’)]*\s+)["'“‘(]*$/u

function smallCapped(found: string, at: number, line: string): string {
  if (!SMALL_CAP.test(found)) return found
  const plain = [...found.replace(HOOKED_O, "q")].map((one) => SMALL_CAPS[one] ?? one).join("")
  if (plain === "i") return "I"
  if (!OPENS_SENTENCE.test(line.slice(0, at))) return plain
  return `${plain.charAt(0).toUpperCase()}${plain.slice(1)}`
}

export function smallCapsOf(line: string): string {
  return line.replace(LETTERED, smallCapped)
}
