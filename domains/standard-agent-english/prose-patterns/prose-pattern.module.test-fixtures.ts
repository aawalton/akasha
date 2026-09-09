import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"

export type Row = readonly [string, string, number, string]

export function sentenceOf(rows: readonly Row[]): DepSentence {
  let at = 0
  const tokens = rows.map(([form, upos, head, deprel], index) => {
    const start = at
    at += form.length + 1
    return { id: index + 1, form, upos, head, deprel, start, end: start + form.length }
  })
  return makeSentence({ text: rows.map((row) => row[0]).join(" "), start: 0, end: at, tokens })
}

export const HOLD = new Set(["hold", "holds", "holding"])

export const HELD = new Set(["held"])

export const A_PERSON_HOLDS: readonly Row[] = [
  ["how", "ADV", 3, "advmod"],
  ["I", "PRON", 3, "nsubj"],
  ["hold", "VERB", 0, "root"],
  ["it", "PRON", 3, "obj"],
]

export const AN_UNKNOWN_HOLDS: readonly Row[] = [
  ["what", "PRON", 2, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["it", "PRON", 2, "obj"],
]

export const NOTES_HOLD_QUEUE: readonly Row[] = [
  ["The", "DET", 2, "det"],
  ["notes", "NOUN", 3, "nsubj"],
  ["hold", "VERB", 0, "root"],
  ["no", "DET", 5, "det"],
  ["queue", "NOUN", 3, "obj"],
]

export const THE_SET_THAT_HOLDS: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["set", "NOUN", 4, "obl"],
  ["that", "PRON", 4, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
]

export const THE_SPEND_I_HOLD_UNDER: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["spend", "NOUN", 4, "obl"],
  ["I", "PRON", 4, "nsubj"],
  ["hold", "VERB", 2, "acl:relcl"],
  ["under", "ADV", 4, "advmod"],
]

export const THE_BOOK_HOLDS_THROUGH_A_STRING: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["notes", "NOUN", 0, "root"],
  ["the", "DET", 4, "det"],
  ["book", "NOUN", 5, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["through", "ADP", 8, "case"],
  ["a", "DET", 8, "det"],
  ["string", "NOUN", 5, "obl"],
]

export const THE_PAGES_HELD_LIVE: readonly Row[] = [
  ["pages", "NOUN", 0, "root"],
  ["listing", "NOUN", 3, "nsubj"],
  ["asks", "VERB", 1, "acl:relcl"],
  ["held", "VERB", 3, "advcl"],
  ["live", "ADJ", 4, "obj"],
]

export const THE_PAGES_IT_HELD_TAKEN: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["pages", "NOUN", 0, "root"],
  ["it", "PRON", 4, "nsubj"],
  ["held", "VERB", 2, "acl:relcl"],
  ["taken", "VERB", 2, "acl:relcl"],
]

export const THE_PROXY_HOLDS_TRAFFIC_OUT: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["proxy", "NOUN", 0, "root"],
  ["that", "PRON", 4, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["traffic", "NOUN", 4, "obj"],
  ["out", "ADP", 5, "advmod"],
]

export const LEDGER_HOLDS_EDITS: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["ledger", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["the", "DET", 5, "det"],
  ["edits", "NOUN", 3, "obj"],
]

export const THE_SEAT_HOLDS: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["page", "NOUN", 0, "root"],
  ["the", "DET", 4, "det"],
  ["seat", "NOUN", 5, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
]

export const EVERY_GROUP_HOLD: readonly Row[] = [
  ["Every", "DET", 2, "det"],
  ["group", "NOUN", 3, "nsubj"],
  ["hold", "VERB", 0, "root"],
]

export const THE_HOLD_SITS: readonly Row[] = [
  ["The", "DET", 2, "det"],
  ["hold", "NOUN", 3, "nsubj"],
  ["sits", "VERB", 0, "root"],
]

export const A_TIMER_HOLDS_THE_PROCESS_UP: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["timer", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["the", "DET", 5, "det"],
  ["process", "NOUN", 3, "obj"],
  ["up", "ADP", 3, "compound:prt"],
]

export const THE_CALLER_HOLDS_TO_A_CEILING: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["shape", "NOUN", 0, "root"],
  ["the", "DET", 4, "det"],
  ["caller", "NOUN", 5, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["to", "ADP", 8, "case"],
  ["a", "DET", 8, "det"],
  ["ceiling", "NOUN", 5, "obl"],
]

export const THE_FORWARDER_HOLDS_A_REQUEST_TO: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["forwarder", "NOUN", 0, "root"],
  ["that", "PRON", 4, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["a", "DET", 6, "det"],
  ["request", "NOUN", 4, "obj"],
  ["to", "ADP", 9, "case"],
  ["the", "DET", 9, "det"],
  ["workstation", "NOUN", 6, "nmod"],
]

export const PROSE_HELD_IN_FILE: readonly Row[] = [
  ["Prose", "NOUN", 3, "nsubj:pass"],
  ["is", "AUX", 3, "aux:pass"],
  ["held", "VERB", 0, "root"],
  ["in", "ADP", 5, "case"],
  ["file", "NOUN", 3, "obl"],
]

export const A_TREE_IS_HELD_TO_RELEASE: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["tree", "NOUN", 4, "nsubj:pass"],
  ["is", "AUX", 4, "aux:pass"],
  ["held", "VERB", 0, "root"],
  ["to", "ADP", 6, "case"],
  ["release", "NOUN", 4, "obl"],
]

export const EACH_FORMAT_IS_HELD: readonly Row[] = [
  ["Each", "DET", 2, "det"],
  ["format", "NOUN", 4, "nsubj:pass"],
  ["is", "AUX", 4, "aux:pass"],
  ["held", "VERB", 0, "root"],
]

export const FOLDER_HOLDING: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["folder", "NOUN", 0, "root"],
  ["holding", "VERB", 2, "acl"],
  ["no", "DET", 5, "det"],
  ["file", "NOUN", 3, "obj"],
]

export const THE_COST_OF_HOLDING_STRESS: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["cost", "NOUN", 0, "root"],
  ["of", "SCONJ", 4, "mark"],
  ["holding", "VERB", 2, "acl"],
  ["stress", "NOUN", 4, "obj"],
]

export const THE_DAY_HOLDS_TURNED_INTO_POINTS: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["pounds", "NOUN", 0, "root"],
  ["the", "DET", 4, "det"],
  ["day", "NOUN", 5, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["turned", "VERB", 2, "acl"],
  ["into", "ADP", 8, "case"],
  ["points", "NOUN", 6, "obl"],
]

export const DAY_HOLDS_DIFFER: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["pounds", "NOUN", 6, "nsubj"],
  ["the", "DET", 4, "det"],
  ["day", "NOUN", 5, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["differ", "VERB", 0, "root"],
]

export const PAST_WHAT_IT_HOLD: readonly Row[] = [
  ["past", "ADP", 2, "case"],
  ["what", "PRON", 0, "root"],
  ["it", "PRON", 4, "nsubj"],
  ["hold", "VERB", 2, "acl:relcl"],
]

export const NO_PAGE_HOLDS_HAS_NO_FILE: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["value", "NOUN", 6, "nsubj"],
  ["no", "DET", 4, "det"],
  ["page", "NOUN", 5, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["has", "VERB", 0, "root"],
  ["no", "DET", 8, "det"],
  ["file", "NOUN", 6, "obj"],
]

export const ALAN_HAS_HOLDS_THAT_READING: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["edition", "NOUN", 5, "nsubj"],
  ["Alan", "PROPN", 5, "nsubj"],
  ["has", "AUX", 5, "aux"],
  ["holds", "VERB", 0, "root"],
  ["that", "DET", 7, "det"],
  ["reading", "NOUN", 5, "obj"],
]

export const HELD_IN_PLAN_RATHER_DROPPED: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["refusal", "NOUN", 4, "nsubj:pass"],
  ["is", "AUX", 4, "aux:pass"],
  ["held", "VERB", 0, "root"],
  ["in", "ADP", 6, "case"],
  ["plan", "NOUN", 4, "obl"],
  ["rather", "ADV", 8, "cc"],
  ["dropped", "VERB", 4, "conj"],
]

export const THE_PUSH_HOLDS_THE_BRANCH_ON: readonly Row[] = [
  ["The", "DET", 2, "det"],
  ["push", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["the", "DET", 5, "det"],
  ["branch", "NOUN", 3, "obj"],
  ["each", "DET", 7, "det"],
  ["repository", "NOUN", 3, "nsubj"],
  ["is", "AUX", 9, "cop"],
  ["on", "ADP", 3, "advmod"],
]

export const THE_ASK_HOLDS_ITSELF: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["ask", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["itself", "PRON", 3, "obj"],
]

export const THE_WATCHER_HOLDS_WHAT_TO: readonly Row[] = [
  ["the", "DET", 2, "det"],
  ["watcher", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["what", "PRON", 3, "obj"],
  ["to", "ADP", 4, "case"],
]

export const HOLDING_A_MODULE_TO_RUNTIME_STATES: readonly Row[] = [
  ["The", "DET", 2, "det"],
  ["code", "NOUN", 0, "root"],
  ["holding", "VERB", 2, "acl"],
  ["a", "DET", 5, "det"],
  ["module", "NOUN", 3, "obj"],
  ["to", "ADP", 7, "case"],
  ["runtime", "NOUN", 8, "compound"],
  ["states", "NOUN", 2, "nmod"],
]

export const A_KEY_HOLDING_MANY_VALUES: readonly Row[] = [
  ["A", "DET", 3, "det"],
  ["key", "ADJ", 3, "compound"],
  ["holding", "NOUN", 7, "nsubj:pass"],
  ["many", "ADJ", 5, "amod"],
  ["values", "NOUN", 3, "obj"],
  ["is", "AUX", 7, "aux:pass"],
  ["refused", "VERB", 0, "root"],
]

export const A_MERGE_THAT_HELD_A_FIELD_BACK: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["merge", "NOUN", 0, "root"],
  ["that", "PRON", 4, "nsubj"],
  ["held", "VERB", 2, "acl:relcl"],
  ["field", "NOUN", 7, "compound"],
  ["back", "NOUN", 7, "compound"],
  ["names", "NOUN", 4, "obj"],
]

export const A_NAME_ALREADY_HOLDING_TEXT: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["name", "NOUN", 7, "nsubj:pass"],
  ["already", "ADV", 4, "advmod"],
  ["holding", "VERB", 2, "acl"],
  ["text", "NOUN", 4, "obj"],
  ["is", "AUX", 7, "aux:pass"],
  ["left", "VERB", 0, "root"],
]

export const THE_TIME_HOLDING_OBJECTS_TAKES: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["push", "NOUN", 4, "nsubj:pass"],
  ["is", "AUX", 4, "aux:pass"],
  ["given", "VERB", 0, "root"],
  ["the", "DET", 6, "det"],
  ["time", "NOUN", 4, "obj"],
  ["holding", "VERB", 6, "acl"],
  ["objects", "NOUN", 7, "obj"],
  ["takes", "VERB", 6, "acl"],
]

export const A_DAY_HOLDING_ROWS_AND_DECLARING: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["day", "NOUN", 0, "root"],
  ["holding", "VERB", 2, "acl"],
  ["rows", "NOUN", 3, "obj"],
  ["and", "CCONJ", 6, "cc"],
  ["declaring", "VERB", 3, "conj"],
  ["no", "DET", 8, "det"],
  ["stretches", "NOUN", 6, "obj"],
]

export const NAMES_HOLDS_IN_OBJECTS: readonly Row[] = [
  ["An", "DET", 2, "det"],
  ["object", "NOUN", 0, "root"],
  ["the", "DET", 5, "det"],
  ["list", "NOUN", 5, "compound"],
  ["names", "NOUN", 6, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["in", "ADP", 8, "case"],
  ["objects", "NOUN", 6, "obl"],
]

export const CALL_HOLDS_JUDGED: readonly Row[] = [
  ["The", "DET", 2, "det"],
  ["flags", "NOUN", 7, "nsubj:pass"],
  ["a", "DET", 5, "det"],
  ["call", "NOUN", 5, "compound"],
  ["holds", "NOUN", 2, "acl:relcl"],
  ["are", "AUX", 7, "aux:pass"],
  ["judged", "VERB", 0, "root"],
]

export const RULE_HOLDS_REFUSES: readonly Row[] = [
  ["An", "DET", 2, "det"],
  ["id", "NOUN", 7, "nsubj"],
  ["no", "DET", 5, "det"],
  ["buy", "NOUN", 5, "compound"],
  ["rule", "NOUN", 2, "appos"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["refuses", "VERB", 0, "root"],
]

export const A_WIDGET_HOLDS_HOW_MANY_TAPS: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["widget", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["how", "ADV", 5, "advmod"],
  ["many", "ADJ", 6, "amod"],
  ["taps", "NOUN", 3, "obj"],
]

export const A_WORKSTATION_HOLDING_NO_EXPORT: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["workstation", "NOUN", 3, "nsubj"],
  ["holding", "VERB", 0, "root"],
  ["no", "DET", 5, "det"],
  ["export", "NOUN", 3, "obj"],
  ["falls", "VERB", 3, "obj"],
  ["through", "ADP", 6, "obl"],
]

export const A_WRITE_BACK_THAT_HELD: readonly Row[] = [
  ["a", "DET", 3, "det"],
  ["write", "NOUN", 3, "compound"],
  ["back", "NOUN", 0, "root"],
  ["that", "PRON", 5, "obj"],
  ["held", "VERB", 3, "acl:relcl"],
]

export const IT_HELD_OR_WOULD_HOLD: readonly Row[] = [
  ["a", "DET", 2, "det"],
  ["message", "NOUN", 0, "root"],
  ["it", "PRON", 4, "nsubj"],
  ["held", "VERB", 2, "acl:relcl"],
  ["or", "CCONJ", 7, "cc"],
  ["would", "AUX", 7, "aux"],
  ["hold", "VERB", 4, "conj"],
]

export const ROW_HELD_DROPS_THE_ID: readonly Row[] = [
  ["An", "DET", 3, "det"],
  ["effect", "NOUN", 3, "compound"],
  ["row", "NOUN", 4, "nsubj"],
  ["held", "VERB", 0, "root"],
  ["whole", "ADJ", 6, "amod"],
  ["drops", "NOUN", 4, "obj"],
  ["the", "DET", 8, "det"],
  ["id", "NOUN", 4, "obj"],
]

export const A_FLAG_HOLDING: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["flag", "NOUN", 3, "nsubj"],
  ["holding", "VERB", 9, "parataxis"],
  ["no", "DET", 6, "det"],
  ["value", "NOUN", 6, "compound"],
  ["names", "NOUN", 3, "obj"],
  ["no", "DET", 9, "det"],
  ["value", "NOUN", 9, "compound"],
  ["label", "NOUN", 0, "root"],
]

export const A_BODY_IS_HOLDING_A_CONFLICT: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["body", "NOUN", 4, "nsubj"],
  ["is", "AUX", 4, "aux"],
  ["holding", "VERB", 0, "root"],
  ["a", "DET", 6, "det"],
  ["conflict", "NOUN", 4, "obj"],
]

export const A_CHECK_REFUSES_HOLDING_THE_FILE: readonly Row[] = [
  ["The", "DET", 2, "det"],
  ["check", "NOUN", 3, "nsubj"],
  ["refuses", "VERB", 0, "root"],
  ["holding", "VERB", 3, "advcl"],
  ["the", "DET", 6, "det"],
  ["file", "NOUN", 4, "obj"],
  ["open", "ADV", 4, "xcomp"],
]

export const A_READ_ASKS_RATHER_THAN_HOLDING: readonly Row[] = [
  ["a", "DET", 2, "det"],
  ["read", "NOUN", 3, "nsubj"],
  ["asks", "VERB", 0, "root"],
  ["the", "DET", 5, "det"],
  ["source", "NOUN", 3, "obj"],
  ["rather", "ADV", 8, "cc"],
  ["than", "SCONJ", 6, "fixed"],
  ["holding", "VERB", 3, "advcl"],
  ["a", "DET", 10, "det"],
  ["token", "NOUN", 8, "obj"],
]

export const NAMES_A_PATH_RATHER_THAN_HOLDING: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["target", "NOUN", 3, "nsubj"],
  ["names", "VERB", 0, "root"],
  ["a", "DET", 5, "det"],
  ["path", "NOUN", 3, "obj"],
  ["rather", "ADV", 8, "cc"],
  ["than", "SCONJ", 6, "fixed"],
  ["holding", "VERB", 3, "conj"],
  ["a", "DET", 10, "det"],
  ["key", "NOUN", 8, "obj"],
]

export const A_RUN_HOLDING_ANYTHING_BACK: readonly Row[] = [
  ["A", "DET", 2, "det"],
  ["run", "NOUN", 3, "nsubj"],
  ["holding", "VERB", 0, "root"],
  ["anything", "PRON", 3, "obj"],
  ["back", "NOUN", 6, "compound"],
  ["ends", "NOUN", 3, "xcomp"],
]

export const A_TERMINAL_HOLDING_KEYS: readonly Row[] = [
  ["a", "DET", 2, "det"],
  ["terminal", "NOUN", 0, "root"],
  ["around", "ADP", 4, "case"],
  ["supervisor", "NOUN", 2, "nmod"],
  ["holding", "VERB", 4, "conj"],
  ["keys", "NOUN", 5, "obj"],
]

export const HOLDING_ITS_FILES_DOES_NOT_REVEAL: readonly Row[] = [
  ["values", "NOUN", 2, "nsubj"],
  ["carries", "VERB", 0, "root"],
  ["that", "SCONJ", 7, "mark"],
  ["holding", "VERB", 7, "csubj"],
  ["files", "NOUN", 4, "obj"],
  ["does", "AUX", 7, "aux"],
  ["reveal", "VERB", 2, "ccomp"],
]

export const HOLDING_THE_INTENT_IS_LEFT: readonly Row[] = [
  ["Holding", "VERB", 5, "advcl"],
  ["the", "DET", 3, "det"],
  ["intent", "NOUN", 1, "obj"],
  ["is", "AUX", 5, "aux:pass"],
  ["left", "VERB", 0, "root"],
]

export const A_RECORD_HOLDS_BETWEEN_ROUNDS: readonly Row[] = [
  ["a", "DET", 2, "det"],
  ["record", "NOUN", 0, "root"],
  ["that", "PRON", 4, "nsubj"],
  ["holds", "VERB", 2, "acl:relcl"],
  ["between", "ADP", 6, "case"],
  ["rounds", "NOUN", 4, "obl"],
]
