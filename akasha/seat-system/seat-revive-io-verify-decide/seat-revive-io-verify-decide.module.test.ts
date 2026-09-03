import { expect, test } from "bun:test"
import {
  decideReviveIoVerify,
  lastAdvancementMs,
} from "./seat-revive-io-verify-decide.module.code.ts"

const REVIVED_AT = 1_000

test("the last advancement is the newest signal that said anything", () => {
  expect(lastAdvancementMs(100, null, 300)).toBe(300)
})

test("signals that all said nothing leave no last advancement", () => {
  expect(lastAdvancementMs(null, null)).toBeNull()
  expect(lastAdvancementMs()).toBeNull()
})

test("a seat whose transcript moved after the revive is advancing", () => {
  const said = decideReviveIoVerify({
    transcriptMtimeMs: REVIVED_AT + 1,
    ownedRowUpdatedAtMs: null,
    reviveAtMs: REVIVED_AT,
  })
  expect(said).toBe("advancing")
})

test("a seat whose owned row moved after the revive is advancing", () => {
  const said = decideReviveIoVerify({
    transcriptMtimeMs: null,
    ownedRowUpdatedAtMs: REVIVED_AT + 1,
    reviveAtMs: REVIVED_AT,
  })
  expect(said).toBe("advancing")
})

test("movement at the revive itself is not movement since it", () => {
  const said = decideReviveIoVerify({
    transcriptMtimeMs: REVIVED_AT,
    ownedRowUpdatedAtMs: REVIVED_AT,
    reviveAtMs: REVIVED_AT,
  })
  expect(said).toBe("wedged")
})

test("a seat that moved only before the revive is wedged", () => {
  const said = decideReviveIoVerify({
    transcriptMtimeMs: REVIVED_AT - 500,
    ownedRowUpdatedAtMs: null,
    reviveAtMs: REVIVED_AT,
  })
  expect(said).toBe("wedged")
})

test("a seat whose every signal is silent is wedged rather than unread", () => {
  const said = decideReviveIoVerify({
    transcriptMtimeMs: null,
    ownedRowUpdatedAtMs: null,
    reviveAtMs: REVIVED_AT,
  })
  expect(said).toBe("wedged")
})
