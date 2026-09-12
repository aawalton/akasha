import { afterAll, expect, test } from "bun:test"
import {
  requestDone,
  requestPut,
  requestsAt,
  requestsIn,
} from "akasha/checks/modules/audit-request/audit-request.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function home(): string {
  return scratch.rootFor("akasha-audit-request-home-")
}

test("a folder that is not there holds no request", () => {
  expect(requestsIn(home())).toEqual([])
})

test("a check asked for is named until whoever ran it takes the request away", () => {
  const at = home()
  expect(requestPut(at, "typecheck")).toBeNull()
  expect(requestsIn(at)).toEqual(["typecheck"])
  requestDone(at, "typecheck")
  expect(requestsIn(at)).toEqual([])
})

test("a second asker naming that check leaves one request", () => {
  const at = home()
  requestPut(at, "typecheck")
  requestPut(at, "typecheck")
  expect(requestsIn(at)).toEqual(["typecheck"])
})

test("every check asked for is named, in one order", () => {
  const at = home()
  requestPut(at, "typecheck")
  requestPut(at, "lint-clean")
  expect(requestsIn(at)).toEqual(["lint-clean", "typecheck"])
})

test("a name that is no check slug is refused rather than written", () => {
  const at = home()
  expect(requestPut(at, "../elsewhere")).toContain("no check slug")
  expect(requestPut(at, "Typecheck")).toContain("no check slug")
  expect(requestPut(at, "")).toContain("no check slug")
  expect(requestsIn(at)).toEqual([])
})

test("a request taken away that was never there refuses nothing", () => {
  const at = home()
  requestDone(at, "typecheck")
  expect(requestsIn(at)).toEqual([])
})

test("the requests sit beside the verdicts", () => {
  expect(requestsAt("/h")).toBe("/h/.local/state/workstation-services/audit-asked")
})
