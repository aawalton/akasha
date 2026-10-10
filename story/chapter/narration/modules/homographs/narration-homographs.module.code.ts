type Reading = { readonly found: RegExp; readonly said: string }

const OWNED =
  "(?<!\\b(?:a|an|the|this|that|his|her|its|their|my|your|our|whose|any|each|every|no)\\s)(?<!['’]s\\s)"
const BENT =
  "deep|low|slight|polite|formal|respectful|stiff|courtly|curt|sweeping|graceful|shallow|profound|elaborate|mocking|ironic|perfunctory|exaggerated|courteous|theatrical|gracious|solemn|grave|hasty|awkward|clumsy|cursory|answering|elegant|proper|harried|guilty|dramatic|quick|grand|perfect|smooth|sardonic|delighted|apologetic|wary|tired|flashy|rueful|sarcastic|relieved|embarrassed|shamefaced|ostentatious|impassive|precise|covert|blushing|knightly|stylistic|flowery|pleased|courtier['’]s"
const BENDING =
  "swept|sweeps|sweeping|sketched|sketches|executed|executes|performed|performs|managed|did|does|doing"
const GIVING = "gave|gives|giving|offered|offers|offering"
const ANSWERING = "returned|returns|returning|copied|copying|accepted|repeated|mirrored|imitated"
const TO_WHOM =
  "(?:(?!(?:a|an|another|to|had|has|have|with|was|were|carrying|holding)\\b)[\\p{L}’'-]+\\s+){0,3}?"
const HULLS =
  "ship|ships|vessel|boat|galleon|frigate|warship|sloop|barge|airship|skyship|flagship|longboat|canoe|raft|schooner|carrack|caravel"
const ARMS =
  "swords?|spears?|wands?|spells?|daggers?|blades?|axes?|crossbows?|slings?|shields?|pikes?|javelins?|quivers?|arrows?"
const RIPPING = "at|through|into|open|apart|off|free|loose|away|across|out(?!\\s+of)"
const BOW_SAID = { bent: ["bˈW", "bˈWz"], strung: ["bˈO", "bˈOz"] } as const
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

function bowsOf(before: string, after: string, sense: keyof typeof BOW_SAID): readonly Reading[] {
  const [one, many] = BOW_SAID[sense]
  return [
    { found: new RegExp(`${before}\\b(bow)\\b${after}`, "giu"), said: one },
    { found: new RegExp(`${before}\\b(bows)\\b${after}`, "giu"), said: many },
  ]
}

const READINGS: readonly Reading[] = [
  { found: /\beye[\s-]+(contact)\b/giu, said: "kˌɑntækt" },
  { found: /\b(refuse)\s+(?=to\b)/giu, said: "ɹəfjˈuz" },
  { found: /(?:^|[.!?…—“"]\s*)(Refuse)(?=\s*[,!.])/gu, said: "ɹəfjˈuz" },
  { found: /(?<!\p{L})[‘’'`](em)\b/giu, said: "əm" },
  {
    found:
      /\b(tears)(?=\s+(?:still\s+)?(?:in|on|streaming|running|rolling|from|out\s+of|alone|again)\b)(?!\s+in\s+(?:half|two)\b)/giu,
    said: "tˈɪɹz",
  },
  {
    found:
      /\b(tear)\s+(?=up(?:\s*[,.!?;—…”]|\s+(?:a\s+bit|a\s+little|again|especially|every|at|when|as|over)\b))/giu,
    said: "tˈɪɹ",
  },
  { found: /\bwear\s+and\s+(tear)\b/giu, said: "tˈɛɹ" },
  { found: /\bon\s+a\s+(tear)\b/giu, said: "tˈɛɹ" },
  {
    found: new RegExp(`(?<!\\b(?:a|an)\\s)\\b(tear)(?=\\s+(?:${RIPPING})\\b)`, "giu"),
    said: "tˈɛɹ",
  },
  {
    found:
      /\b(tear)(?=\s+in\b)(?!\s+in\s+(?:(?:her|his|their|my|your|its|the|one)\s+)?(?:\p{L}+\s+)?eyes?\b)/giu,
    said: "tˈɛɹ",
  },
  {
    found:
      /\b(?:to|will|would|could|can|might|must|should|shall|did|didn['’]t|don['’]t|doesn['’]t|won['’]t|can['’]t|cannot|and|or)\s+(tear)\b(?!\s+(?:up|down|ducts?|tracks?|marks?|stained|drops?)\b)/giu,
    said: "tˈɛɹ",
  },
  {
    found:
      /\b(?:sinews?|muscles?|flesh|skin|arms?|metal|veil|cloth|fabric|parchment|paper|ligaments?|tendons?)\s+(tear)\b(?!\s+(?:ducts?|tracks?))/giu,
    said: "tˈɛɹ",
  },
  {
    found:
      /\b(?:felt|feel|feels|feeling|saw|see|sees|watched|heard)\s+(?!(?:a|an|the|every|one|no|like)\b)(?:(?!(?:a|an|shed\p{L}*)\b)[\p{L}’'-]+\s+){1,3}?(tear)\b/giu,
    said: "tˈɛɹ",
  },
  { found: /\b(legged)\s+(?=it\b)/giu, said: "lˈɛɡd" },
  {
    found:
      /(?<!\b(?:a|the|this|that|white|grey|gray|my|his|her|its|their|like a)\s)\b(dove)\b(?!-)/gu,
    said: "dˈOv",
  },
  ...bowsOf(`\\b(?:${BENT})\\s+`, "", "bent"),
  { found: /\b(?:a|an)\s+small\s+(bow)\b(?!\s+and\s+arrows?)/giu, said: "bˈW" },
  ...bowsOf(
    `\\b(?:${BENDING})\\s+${TO_WHOM}(?:a|an|another)\\s+(?:[\\p{L}-]+\\s+){0,2}?`,
    "(?!\\s+(?:up|down|around|aside|away|at)\\b)",
    "bent"
  ),
  ...bowsOf(`\\b(?:${GIVING})\\s+${TO_WHOM}(?:a|an)\\s+(?:[\\p{L}-]+\\s+){0,3}?`, "", "bent"),
  ...bowsOf(`\\btook\\s+(?:a|another)\\s+(?:[\\p{L}-]+\\s+){0,2}?`, "", "bent"),
  ...bowsOf(`\\b(?:${ANSWERING})\\s+(?:[\\p{L}’'-]+\\s+){0,2}?`, "", "bent"),
  {
    found:
      /\bto\s+(bow)\b(?=\s*[.,!?;—…”]|\s+(?:to|before|low|deeply|down|his|her|their|my|your|its|our|and)\b)/giu,
    said: "bˈW",
  },
  ...bowsOf(
    "",
    `(?=\\s+of\\s+(?:(?:the|her|his|their|a|an|our|my|this|that|its)\\s+)?(?:[\\p{L}-]+\\s+)?(?:${HULLS})\\b)`,
    "bent"
  ),
  ...bowsOf("\\b(?:port|portside|starboard)\\s+", "", "bent"),
  ...bowsOf("", "(?=\\s+(?:to|and)\\s+stern\\b)", "bent"),
  ...bowsOf("\\bthe\\s+", "(?=\\s+side\\b)", "bent"),
  ...bowsOf(
    "",
    "(?=\\s+(?:drawn|raised|lowered|nocked|strung|slung|half-drawn)\\b|\\s+at\\s+the\\s+ready\\b|\\s+in\\s+(?:hand|hands|paw|paws|claw|claws)\\b)",
    "strung"
  ),
  ...bowsOf(
    "\\b(?:his|their|my|your|its|our|her|a|an)\\s+(?:[\\p{L}-]+\\s+)?",
    "(?=\\s+(?:up|down|around|aside|away)\\b)",
    "strung"
  ),
  ...bowsOf("", "(?=\\s+and\\s+(?:an\\s+)?arrows?\\b)", "strung"),
  ...bowsOf(`\\b(?:${ARMS})\\s+(?:and|or)\\s+`, "", "strung"),
  {
    found: new RegExp(`${OWNED}\\b(content)\\b(?=\\s+(?:to|with|enough)\\b)`, "giu"),
    said: "kəntˈɛnt",
  },
  { found: new RegExp(`\\b(?:${CALM})\\s+(content)\\b`, "giu"), said: "kəntˈɛnt" },
  {
    found: new RegExp(`${OWNED}\\b(?!only\\b)\\p{L}+ly\\s+(content)\\b`, "giu"),
    said: "kəntˈɛnt",
  },
  {
    found: new RegExp(
      `\\b(?:${KEEPING})\\s+(?:(?:${DEGREE})\\s+)*(used)\\s+to(?=\\s+(?:(?:${ACCUSTOMED_TO})\\b|(?!(?:${RINGING})\\b)\\p{L}{2,}ing\\b)|\\s*[,.;:!?…—”"’])`,
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
