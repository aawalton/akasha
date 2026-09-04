import { expect, test } from "bun:test"
import {
  decideRelaunchName,
  RELAUNCH_NAME_OUTCOMES,
} from "./seat-relaunch-name-decide.module.code.ts"

test("a name already on the row is the name the seat comes back under", () => {
  expect(decideRelaunchName({ rowName: "scribe", providedName: null })).toEqual({
    kind: "use-row",
    name: "scribe",
  })
})

test("the row outranks a name stated by the caller, so a relaunch never renames a seat", () => {
  expect(decideRelaunchName({ rowName: "scribe", providedName: "other" })).toEqual({
    kind: "use-row",
    name: "scribe",
  })
})

test("a stated name binds where the row holds none", () => {
  expect(decideRelaunchName({ rowName: null, providedName: "other" })).toEqual({
    kind: "bind",
    name: "other",
  })
})

test("a seat named on neither the row nor the call needs a name", () => {
  expect(decideRelaunchName({ rowName: null, providedName: null })).toEqual({ kind: "need-name" })
})

test("every outcome the decision can reach is declared", () => {
  const reached = [
    decideRelaunchName({ rowName: "a", providedName: null }).kind,
    decideRelaunchName({ rowName: null, providedName: "a" }).kind,
    decideRelaunchName({ rowName: null, providedName: null }).kind,
  ]
  expect([...RELAUNCH_NAME_OUTCOMES].sort()).toEqual([...reached].sort())
})
