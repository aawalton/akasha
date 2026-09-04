import { expect, test } from "bun:test"
import {
  decidePreCliffRestart,
  type PreCliffObservation,
} from "./supervisor-precliff-restart-decide.module.code.ts"

const OLD: PreCliffObservation = {
  childAgeMs: 10_000,
  alreadyArmed: false,
  deferredOrActionPending: false,
}

test("a child past the threshold with nothing in its way arms the restart", () => {
  expect(decidePreCliffRestart(OLD, 5_000)).toBe("arm")
})

test("a restart already armed is not armed again", () => {
  expect(decidePreCliffRestart({ ...OLD, alreadyArmed: true }, 5_000)).toBe("wait")
})

test("a child whose age went unread is left alone", () => {
  expect(decidePreCliffRestart({ ...OLD, childAgeMs: null }, 5_000)).toBe("wait")
})

test("a child younger than the threshold is left alone", () => {
  expect(decidePreCliffRestart(OLD, 20_000)).toBe("wait")
})

test("a restart already deferred holds this one back", () => {
  expect(decidePreCliffRestart({ ...OLD, deferredOrActionPending: true }, 5_000)).toBe("wait")
})
