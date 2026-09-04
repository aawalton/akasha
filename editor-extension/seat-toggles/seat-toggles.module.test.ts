import { describe, expect, test } from "bun:test"
import { SEAT_TAB_KEY_NAMES } from "../seat-tab-context/seat-tab-context.module.code.ts"
import {
  attachCommandLine,
  planPlaceToggle,
  planReset,
  planRunToggle,
  seatContextValue,
  seatNameAccepted,
} from "./seat-toggles.module.code.ts"
import { shownFor, tabItems } from "./seat-toggles.module.test-fixtures.ts"

describe("the steps a toggle plans", () => {
  test("a running seat is stopped whatever its place", () => {
    expect(planRunToggle({ running: true, place: "interactive" })).toEqual([{ kind: "stop" }])
    expect(planRunToggle({ running: true, place: "headless" })).toEqual([{ kind: "stop" }])
  })

  test("a stopped seat is resumed into the place it holds", () => {
    expect(planRunToggle({ running: false, place: "interactive" })).toEqual([
      { kind: "resume-interactive" },
    ])
    expect(planRunToggle({ running: false, place: "headless" })).toEqual([{ kind: "revive" }])
  })

  test("a place toggle on a stopped seat states the place and does nothing else", () => {
    expect(planPlaceToggle({ running: false, place: "headless" })).toEqual([
      { kind: "state-place", place: "interactive" },
    ])
  })

  test("a place toggle on a running seat attaches or detaches after stating the place", () => {
    expect(planPlaceToggle({ running: true, place: "headless" })).toEqual([
      { kind: "state-place", place: "interactive" },
      { kind: "attach" },
    ])
    expect(planPlaceToggle({ running: true, place: "interactive" })).toEqual([
      { kind: "state-place", place: "headless" },
      { kind: "detach" },
    ])
  })

  test("a reset attaches only where the seat is interactive", () => {
    expect(planReset({ running: true, place: "interactive" })).toEqual([
      { kind: "reset" },
      { kind: "attach" },
    ])
    expect(planReset({ running: true, place: "headless" })).toEqual([{ kind: "reset" }])
  })
})

describe("the name a seat is attached by", () => {
  test("a seat name is lower-case letters, digits and hyphens", () => {
    expect(seatNameAccepted("ember-2")).toBe(true)
    expect(seatNameAccepted("-ember")).toBe(false)
    expect(seatNameAccepted("Ember")).toBe(false)
    expect(seatNameAccepted("ember; rm -rf /")).toBe(false)
  })

  test("a name that is no seat name is refused rather than run", () => {
    expect(() => attachCommandLine("ember; rm -rf /")).toThrow()
    expect(attachCommandLine("ember")).toBe('tmux attach-session -t "=ember"')
  })
})

describe("the menus the manifest hangs on a row", () => {
  test("a running interactive seat is offered stop, place-headless, reset, copy and open", () => {
    expect([...shownFor(true, "interactive")].sort()).toEqual([
      "opsAgentTree.copySeatName",
      "opsAgentTree.openPage",
      "opsAgentTree.placeHeadless",
      "opsAgentTree.runReset",
      "opsAgentTree.runStop",
    ])
  })

  test("a stopped headless seat is offered resume, place-interactive, reset, copy and open", () => {
    expect([...shownFor(false, "headless")].sort()).toEqual([
      "opsAgentTree.copySeatName",
      "opsAgentTree.openPage",
      "opsAgentTree.placeInteractive",
      "opsAgentTree.runReset",
      "opsAgentTree.runResume",
    ])
  })

  test("a context value names whether the seat runs and where it stands", () => {
    expect(seatContextValue(true, "interactive")).toBe("seat.running.interactive")
    expect(seatContextValue(false, "headless")).toBe("seat.stopped.headless")
  })

  test("every tab menu is keyed on a context the tab keys name", () => {
    for (const item of tabItems) {
      expect(SEAT_TAB_KEY_NAMES.some((key) => item.when.includes(key))).toBe(true)
    }
  })
})
