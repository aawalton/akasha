type Reading = { readonly found: RegExp; readonly said: string }

const OWNED =
  "(?<!\\b(?:a|an|the|this|that|his|her|its|their|my|your|our|whose|any|each|every|no)\\s)(?<!['’]s\\s)"
const BENT =
  "deep|low|slight|polite|formal|respectful|stiff|courtly|curt|sweeping|graceful|shallow|profound|elaborate|mocking|ironic|perfunctory|exaggerated|courteous|theatrical|gracious|solemn|grave|hasty|awkward|clumsy|cursory|answering"
const BENDING = "swept|sketched|executed|performed|did"
const CALM =
  "was|were|is|are|am|be|been|being|seem|seems|seemed|seeming|look|looks|looked|feel|feels|felt|remain|remains|remained|stay|stays|stayed|quite|very|perfectly|so|not|too|fairly|rather|reasonably|entirely|wholly|utterly|merely|simply|almost|mostly|happily|sleepily|seemingly|apparently"
const KEEPING =
  "be|was|were|is|are|am|been|being|get|gets|got|gotten|getting|grow|grows|grew|grown|growing|become|becomes|became|becoming|wasn['’]t|weren['’]t|isn['’]t|aren['’]t|['’]m|['’]re|['’]s"
const DEGREE =
  "not|so|quite|very|all|already|pretty|really|just|never|more|less|well|somewhat|fully|completely|entirely|mostly|still|now|long|too|rather|kind of|sort of|a bit|a little"
const ACCUSTOMED_TO =
  "it|that|this|these|those|them|him|her|me|us|you|the|a|an|his|its|their|my|your|our|such|being|having|some|any|all|people|everything|anything|nothing|something|someone|anyone|everyone|no"
const RINGING =
  "bring|brings|spring|springs|string|strings|swing|swings|sting|stings|cling|fling|wring|sling|thing|things|king|kings|wing|wings|ring|rings|sing|sings"
const SELF = "yourself|yourselves|myself|himself|herself|themselves|ourselves|itself"
const HELD_IN =
  "molten|heavy as|filled with|lined with|made of|blocks? of|balls? of|pieces? of|bars? of|sheets? of|lumps? of|limbs of"
const OF_METAL =
  "pipes?|weights?|shot|balls?|sheets?|lined|seals?|box|coffin|paint|poisoning|ingots?|mines?|plates?|bars?|bullets?|slugs?|pellets?"

const READINGS: readonly Reading[] = [
  { found: /\b(bowed)\b/giu, said: "bˈWd" },
  { found: /\b(mended)\b/giu, said: "mˈɛndᵻd" },
  { found: /\b(bailed)\b/giu, said: "bˈAld" },
  { found: /\b(butted)\b/giu, said: "bˈʌɾᵻd" },
  { found: /\b(curing)\b/giu, said: "kjˈʊɹɪŋ" },
  { found: /\b(couched)\b/giu, said: "kˈWʧt" },
  { found: /\b(daubed)\b/giu, said: "dˈɔbd" },
  {
    found:
      /(?<!\b(?:a|the|this|that|white|grey|gray|my|his|her|its|their|like a)\s)\b(dove)\b(?!-)/gu,
    said: "dˈOv",
  },
  { found: new RegExp(`\\b(?:${BENT})\\s+(bow)\\b`, "giu"), said: "bˈW" },
  { found: new RegExp(`\\b(?:${BENT})\\s+(bows)\\b`, "giu"), said: "bˈWz" },
  {
    found: new RegExp(
      `\\b(?:${BENDING})\\s+(?:(?:him|her|them|us|me|you|everyone)\\s+)?(?:a|an)\\s+(?:[\\p{L}-]+\\s+)?(bow)\\b`,
      "giu"
    ),
    said: "bˈW",
  },
  {
    found: new RegExp(`${OWNED}\\b(content)\\b(?=\\s+(?:to|with|enough)\\b)`, "giu"),
    said: "kəntˈɛnt",
  },
  { found: new RegExp(`\\b(?:${CALM})\\s+(content)\\b`, "giu"), said: "kəntˈɛnt" },
  {
    found: new RegExp(
      `\\b(?:${KEEPING})\\s+(?:(?:${DEGREE})\\s+)*(used)\\s+to(?=\\s+(?:(?:${ACCUSTOMED_TO})\\b|(?!(?:${RINGING})\\b)\\p{L}{3,}ing\\b)|\\s*[,.;:!?…—”"’])`,
      "giu"
    ),
    said: "jˈust",
  },
  {
    found: new RegExp(
      `${OWNED}\\b(wound)\\s+(?=(?:around|round|up|tightly|tight|about)\\b)`,
      "giu"
    ),
    said: "wˈWnd",
  },
  { found: new RegExp(`\\b(present)\\s+(?=(?:${SELF})\\b)`, "giu"), said: "pɹizˈɛnt" },
  { found: /(?<=\b(?:I|we|We|[Mm]ay I)\s)(present)\b/gu, said: "pɹizˈɛnt" },
  { found: new RegExp(`\\b(?:${HELD_IN})\\s+(lead)\\b`, "giu"), said: "lˈɛd" },
  {
    found: new RegExp(
      `(?<!\\b(?:the|a|an|our|their|his|her|my|your)\\s)\\b(lead)\\s+(?=(?:${OF_METAL})\\b)`,
      "giu"
    ),
    said: "lˈɛd",
  },
]

const MARKUP = /\[[^\]]*\]\([^)]*\)/g
const HIDDEN = /(\d+)/g

function readOnce(line: string, reading: Reading): string {
  const kept: string[] = []
  const bare = line.replace(MARKUP, (one) => `${kept.push(one) - 1}`)
  const read = bare.replace(reading.found, (whole: string, word: string) => {
    const at = whole.lastIndexOf(word)
    return `${whole.slice(0, at)}[${word}](/${reading.said}/)${whole.slice(at + word.length)}`
  })
  return read.replace(HIDDEN, (_, at: string) => kept[Number(at)] ?? "")
}

export function homographsOf(line: string): string {
  return READINGS.reduce(readOnce, line)
}
