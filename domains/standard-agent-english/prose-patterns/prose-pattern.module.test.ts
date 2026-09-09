import { expect, test } from "bun:test"
import { foundIn } from "./prose-pattern.module.code.ts"
import {
  A_BODY_IS_HOLDING_A_CONFLICT,
  A_CHECK_REFUSES_HOLDING_THE_FILE,
  A_DAY_HOLDING_ROWS_AND_DECLARING,
  A_FLAG_HOLDING,
  A_KEY_HOLDING_MANY_VALUES,
  A_MERGE_THAT_HELD_A_FIELD_BACK,
  A_NAME_ALREADY_HOLDING_TEXT,
  A_PERSON_HOLDS,
  A_READ_ASKS_RATHER_THAN_HOLDING,
  A_RECORD_HOLDS_BETWEEN_ROUNDS,
  A_RUN_HOLDING_ANYTHING_BACK,
  A_TERMINAL_HOLDING_KEYS,
  A_TIMER_HOLDS_THE_PROCESS_UP,
  A_TREE_IS_HELD_TO_RELEASE,
  A_WIDGET_HOLDS_HOW_MANY_TAPS,
  A_WORKSTATION_HOLDING_NO_EXPORT,
  A_WRITE_BACK_THAT_HELD,
  ALAN_HAS_HOLDS_THAT_READING,
  AN_UNKNOWN_HOLDS,
  CALL_HOLDS_JUDGED,
  DAY_HOLDS_DIFFER,
  EACH_FORMAT_IS_HELD,
  EVERY_GROUP_HOLD,
  FOLDER_HOLDING,
  HELD,
  HELD_IN_PLAN_RATHER_DROPPED,
  HOLD,
  HOLDING_A_MODULE_TO_RUNTIME_STATES,
  HOLDING_ITS_FILES_DOES_NOT_REVEAL,
  HOLDING_THE_INTENT_IS_LEFT,
  IT_HELD_OR_WOULD_HOLD,
  LEDGER_HOLDS_EDITS,
  NAMES_A_PATH_RATHER_THAN_HOLDING,
  NAMES_HOLDS_IN_OBJECTS,
  NO_PAGE_HOLDS_HAS_NO_FILE,
  NOTES_HOLD_QUEUE,
  PAST_WHAT_IT_HOLD,
  PROSE_HELD_IN_FILE,
  ROW_HELD_DROPS_THE_ID,
  RULE_HOLDS_REFUSES,
  sentenceOf,
  THE_ASK_HOLDS_ITSELF,
  THE_BOOK_HOLDS_THROUGH_A_STRING,
  THE_CALLER_HOLDS_TO_A_CEILING,
  THE_COST_OF_HOLDING_STRESS,
  THE_DAY_HOLDS_TURNED_INTO_POINTS,
  THE_FORWARDER_HOLDS_A_REQUEST_TO,
  THE_HOLD_SITS,
  THE_PAGES_HELD_LIVE,
  THE_PAGES_IT_HELD_TAKEN,
  THE_PROXY_HOLDS_TRAFFIC_OUT,
  THE_PUSH_HOLDS_THE_BRANCH_ON,
  THE_SEAT_HOLDS,
  THE_SET_THAT_HOLDS,
  THE_SPEND_I_HOLD_UNDER,
  THE_TIME_HOLDING_OBJECTS_TAKES,
  THE_WATCHER_HOLDS_WHAT_TO,
} from "./prose-pattern.module.test-fixtures.ts"

test("a word a person is the holder of is left alone", () => {
  expect(foundIn(sentenceOf(A_PERSON_HOLDS), HOLD)).toEqual([])
})

test("a word an unknown is the holder of is left alone", () => {
  expect(foundIn(sentenceOf(AN_UNKNOWN_HOLDS), HOLD)).toEqual([])
})

test("a word a thing is the holder of is found", () => {
  expect(foundIn(sentenceOf(NOTES_HOLD_QUEUE), HOLD).map((one) => one.frame)).toEqual(["object"])
})

test("a word whose only subject is the relativizer has no object anywhere", () => {
  expect(foundIn(sentenceOf(THE_SET_THAT_HOLDS), HOLD)).toEqual([])
})

test("a word whose object is the relativizer and that has no subject is left alone", () => {
  expect(foundIn(sentenceOf(A_WRITE_BACK_THAT_HELD), HELD)).toEqual([])
})

test("a word taking a bare adverb for a particle is left alone", () => {
  expect(foundIn(sentenceOf(THE_SPEND_I_HOLD_UNDER), HOLD)).toEqual([])
})

test("a particle right after a word is a particle the parser called a preposition", () => {
  expect(foundIn(sentenceOf(THE_BOOK_HOLDS_THROUGH_A_STRING), HOLD)).toEqual([])
})

test("a particle the parser hung on a word's object is that word's particle", () => {
  expect(foundIn(sentenceOf(THE_PROXY_HOLDS_TRAFFIC_OUT), HOLD)).toEqual([])
})

test("a particle the parser hung on a word's object as a compound is that word's particle", () => {
  expect(foundIn(sentenceOf(A_MERGE_THAT_HELD_A_FIELD_BACK), HELD)).toEqual([])
})

test("a particle right after a word's object is that word's particle", () => {
  expect(foundIn(sentenceOf(A_RUN_HOLDING_ANYTHING_BACK), HOLD)).toEqual([])
})

test("a word with an object of its own is found", () => {
  expect(foundIn(sentenceOf(LEDGER_HOLDS_EDITS), HOLD).map((one) => one.frame)).toEqual(["object"])
})

test("a word whose object comes before it is found", () => {
  expect(foundIn(sentenceOf(THE_SEAT_HOLDS), HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a word with no object at all is left alone", () => {
  expect(foundIn(sentenceOf(EVERY_GROUP_HOLD), HOLD)).toEqual([])
})

test("a word read as a noun that has an object of its own is found", () => {
  expect(foundIn(sentenceOf(A_KEY_HOLDING_MANY_VALUES), HOLD).map((one) => one.frame)).toEqual([
    "participle",
  ])
})

test("a word read as a noun is left alone", () => {
  expect(foundIn(sentenceOf(THE_HOLD_SITS), HOLD)).toEqual([])
})

test("a word taking a particle is left alone", () => {
  expect(foundIn(sentenceOf(A_TIMER_HOLDS_THE_PROCESS_UP), HOLD)).toEqual([])
})

test("a word bound to something by `to` and with no object is left alone", () => {
  expect(foundIn(sentenceOf(THE_CALLER_HOLDS_TO_A_CEILING), HOLD)).toEqual([])
})

test("a word whose object the parser hung a `to` phrase on is left alone", () => {
  expect(foundIn(sentenceOf(THE_FORWARDER_HOLDS_A_REQUEST_TO), HOLD)).toEqual([])
})

test("a word in the passive that puts a thing somewhere is found", () => {
  expect(foundIn(sentenceOf(PROSE_HELD_IN_FILE), HELD).map((one) => one.frame)).toEqual(["placed"])
})

test("a word in the passive bound by `to` is left alone", () => {
  expect(foundIn(sentenceOf(A_TREE_IS_HELD_TO_RELEASE), HELD)).toEqual([])
})

test("a word in the passive that puts a thing nowhere is left alone", () => {
  expect(foundIn(sentenceOf(EACH_FORMAT_IS_HELD), HELD)).toEqual([])
})

test("a participle with an object is found as a participle", () => {
  expect(foundIn(sentenceOf(FOLDER_HOLDING), HOLD).map((one) => one.frame)).toEqual(["participle"])
})

test("a word after a preposition names an act rather than describing a thing", () => {
  expect(foundIn(sentenceOf(THE_COST_OF_HOLDING_STRESS), HOLD)).toEqual([])
})

test("a word a past participle comes right after is left alone", () => {
  expect(foundIn(sentenceOf(THE_DAY_HOLDS_TURNED_INTO_POINTS), HOLD)).toEqual([])
})

test("a word a past participle spelled with `en` comes right after is left alone", () => {
  expect(foundIn(sentenceOf(THE_PAGES_IT_HELD_TAKEN), HELD)).toEqual([])
})

test("a word another verb comes right after is found", () => {
  expect(foundIn(sentenceOf(DAY_HOLDS_DIFFER), HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a word whose object comes before it as a pronoun is left alone", () => {
  expect(foundIn(sentenceOf(PAST_WHAT_IT_HOLD), HOLD)).toEqual([])
})

test("a word a form of `have` comes right after is left alone", () => {
  expect(foundIn(sentenceOf(NO_PAGE_HOLDS_HAS_NO_FILE), HOLD)).toEqual([])
})

test("a word the parser gave a form of `have` for an auxiliary is left alone", () => {
  expect(foundIn(sentenceOf(ALAN_HAS_HOLDS_THAT_READING), HOLD)).toEqual([])
})

test("a word set against another word by `rather than` is left alone", () => {
  expect(foundIn(sentenceOf(HELD_IN_PLAN_RATHER_DROPPED), HELD)).toEqual([])
})

test("a preposition the parser hung on a word as an adverb strands that word", () => {
  expect(foundIn(sentenceOf(THE_PUSH_HOLDS_THE_BRANCH_ON), HOLD)).toEqual([])
})

test("a word whose object is a self is left alone", () => {
  expect(foundIn(sentenceOf(THE_ASK_HOLDS_ITSELF), HOLD)).toEqual([])
})

test("a word whose object a preposition hangs off sends that object on", () => {
  expect(foundIn(sentenceOf(THE_WATCHER_HOLDS_WHAT_TO), HOLD)).toEqual([])
})

test("a word a directed preposition follows the object of sends that object on", () => {
  expect(foundIn(sentenceOf(HOLDING_A_MODULE_TO_RUNTIME_STATES), HOLD)).toEqual([])
})

test("a participle an adverb comes before is left alone", () => {
  expect(foundIn(sentenceOf(A_NAME_ALREADY_HOLDING_TEXT), HOLD)).toEqual([])
})

test("a participle beside another clause on the same word is left alone", () => {
  expect(foundIn(sentenceOf(THE_TIME_HOLDING_OBJECTS_TAKES), HOLD)).toEqual([])
})

test("a participle another word is joined to is left alone", () => {
  expect(foundIn(sentenceOf(A_DAY_HOLDING_ROWS_AND_DECLARING), HOLD)).toEqual([])
})

test("a word with no object that places a thing somewhere is left alone", () => {
  expect(foundIn(sentenceOf(NAMES_HOLDS_IN_OBJECTS), HOLD)).toEqual([])
})

test("a word the parser read as a noun heading a relative clause is found", () => {
  expect(foundIn(sentenceOf(CALL_HOLDS_JUDGED), HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a thing right before a word with no subject of its own is that word's subject", () => {
  expect(foundIn(sentenceOf(RULE_HOLDS_REFUSES), HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a word whose object is a question is left alone", () => {
  expect(foundIn(sentenceOf(A_WIDGET_HOLDS_HOW_MANY_TAPS), HOLD)).toEqual([])
})

test("a fronted word joined to another word is left alone", () => {
  expect(foundIn(sentenceOf(IT_HELD_OR_WOULD_HOLD), HELD)).toEqual([])
})

test("a word whose object is read as neither a thing nor a pronoun is left alone", () => {
  expect(foundIn(sentenceOf(THE_PAGES_HELD_LIVE), HELD)).toEqual([])
})

test("a word the parser gave two objects is left alone", () => {
  expect(foundIn(sentenceOf(ROW_HELD_DROPS_THE_ID), HELD)).toEqual([])
})

test("a word whose second object no name could fill is found", () => {
  expect(
    foundIn(sentenceOf(A_WORKSTATION_HOLDING_NO_EXPORT), HOLD).map((one) => one.frame)
  ).toEqual(["participle"])
})

test("a participle read as a clause's own subject is left alone", () => {
  expect(foundIn(sentenceOf(HOLDING_ITS_FILES_DOES_NOT_REVEAL), HOLD)).toEqual([])
})

test("a participle with no word before it is left alone", () => {
  expect(foundIn(sentenceOf(HOLDING_THE_INTENT_IS_LEFT), HOLD)).toEqual([])
})

test("a gerund the parser hung elsewhere is found as a participle", () => {
  expect(foundIn(sentenceOf(A_FLAG_HOLDING), HOLD).map((one) => one.frame)).toEqual(["participle"])
})

test("a participle under a form of `be` is left alone", () => {
  expect(foundIn(sentenceOf(A_BODY_IS_HOLDING_A_CONFLICT), HOLD)).toEqual([])
})

test("a participle read as a clause of its own is left alone", () => {
  expect(foundIn(sentenceOf(A_CHECK_REFUSES_HOLDING_THE_FILE), HOLD)).toEqual([])
})

test("a participle read as a clause of its own after `rather than` is left alone", () => {
  expect(foundIn(sentenceOf(A_READ_ASKS_RATHER_THAN_HOLDING), HOLD)).toEqual([])
})

test("a participle joined after `rather than` is left alone", () => {
  expect(foundIn(sentenceOf(NAMES_A_PATH_RATHER_THAN_HOLDING), HOLD)).toEqual([])
})

test("a participle joined to a thing is left alone", () => {
  expect(foundIn(sentenceOf(A_TERMINAL_HOLDING_KEYS), HOLD)).toEqual([])
})

test("a word bound to something by a directed preposition is left alone", () => {
  expect(foundIn(sentenceOf(A_RECORD_HOLDS_BETWEEN_ROUNDS), HOLD)).toEqual([])
})
