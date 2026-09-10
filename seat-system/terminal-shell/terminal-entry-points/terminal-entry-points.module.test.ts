import { describe, expect, test } from "bun:test"
import {
  ptyProxyRel,
  seatResumeRel,
  supervisorRel,
} from "../../seat-entry-paths/seat-entry-paths.module.code.ts"
import {
  akashaCommand,
  proxy,
  ROOT,
  ROOT_LOCAL,
  SEAT_START_DIR,
  seatResume,
  supervisor,
} from "./terminal-entry-points.module.code.ts"

describe("the checkout", () => {
  test("is whatever the environment names, falling back to the one at home", () => {
    expect(ROOT).toBe("${AKASHA_ROOT:-$HOME/repos/akasha}")
  })

  test("is expanded once into a local a function spells the rest from", () => {
    expect(ROOT_LOCAL).toBe('local _root="${AKASHA_ROOT:-$HOME/repos/akasha}"')
  })
})

describe("what a seat comes up under", () => {
  test("is spelled from the supervisor path seat-entry-paths answers", () => {
    expect(supervisor()).toBe(`"$_root/${supervisorRel()}"`)
  })

  test("is spelled from the pty proxy path seat-entry-paths answers", () => {
    expect(proxy()).toBe(`"$_root/${ptyProxyRel()}"`)
  })

  test("begins in the folder holding the checkouts rather than in the checkout", () => {
    expect(SEAT_START_DIR).toBe("$HOME/repos")
  })
})

describe("the commands a terminal reaches", () => {
  test("name akasha through the one file on the path", () => {
    expect(akashaCommand()).toBe(
      '"${AKASHA_ROOT:-$HOME/repos/akasha}/machines/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.shell.sh"'
    )
  })

  test("name the resume module a terminal runs to put a seat back on its session", () => {
    expect(seatResume()).toBe(`"$_root/${seatResumeRel()}"`)
  })
})
