import { expect, test } from "bun:test"
import { decideRevivePlacement } from "./seat-revive-placement-decide.module.code.ts"

test("a seat whose prior launch opened a live terminal restarts in place", () => {
  expect(decideRevivePlacement({ priorLaunchOpened: true, isLive: true })).toBe("restart-in-place")
})

test("a seat whose terminal is no longer live comes back headless", () => {
  expect(decideRevivePlacement({ priorLaunchOpened: true, isLive: false })).toBe("headless")
})

test("a seat whose prior launch opened nothing comes back headless", () => {
  expect(decideRevivePlacement({ priorLaunchOpened: false, isLive: true })).toBe("headless")
  expect(decideRevivePlacement({ priorLaunchOpened: false, isLive: false })).toBe("headless")
})
