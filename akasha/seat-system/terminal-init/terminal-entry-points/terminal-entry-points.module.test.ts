import { describe, expect, test } from "bun:test"
import { PTY_PROXY_REL, SUPERVISOR_REL } from "../../seat-launching/seat-launching.module.code.ts"
import {
  AKASHA,
  OPS,
  PROXY,
  ROOT,
  ROOT_LOCAL,
  SEAT_START_DIR,
  SUPERVISOR,
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
  test("is spelled from the supervisor path seat-launching holds", () => {
    expect(SUPERVISOR).toBe(`"$_root/${SUPERVISOR_REL}"`)
  })

  test("is spelled from the pty proxy path seat-launching holds", () => {
    expect(PROXY).toBe(`"$_root/${PTY_PROXY_REL}"`)
  })

  test("begins in the folder holding the checkouts rather than in the checkout", () => {
    expect(SEAT_START_DIR).toBe("$HOME/repos")
  })
})

describe("the commands a terminal reaches", () => {
  test("name akasha through the one file on the path", () => {
    expect(AKASHA).toBe('"${AKASHA_ROOT:-$HOME/repos/akasha}/dotfiles/bin/akasha"')
  })

  test("name the old ops entry point while its acts are still carried there", () => {
    expect(OPS).toBe("~/repos/akasha/tools/ops/cli.ts")
  })
})
