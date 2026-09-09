import { describe, expect, test } from "bun:test"
import { SEAT_MODE_INTERACTIVE } from "../../seat-launching/seat-launching.module.code.ts"
import {
  INTERACTIVE_PRINCIPAL,
  payloadEscapeLines,
  resolveTokensLines,
  SEAT_COMMAND_REL,
  spelledSeatNameLines,
  stateSeatFromRowLines,
} from "./terminal-seat-stating.module.code.ts"

async function parses(text: string): Promise<number> {
  const ran = Bun.spawn({
    cmd: ["bash", "-n"],
    stdin: new TextEncoder().encode(`f() {\n${text}\n}\n`),
  })
  return await ran.exited
}

const escaping = payloadEscapeLines("sn").join("\n")

const stating = stateSeatFromRowLines("sn").join("\n")

const spelling = spelledSeatNameLines("sn").join("\n")

describe("a value written into a payload", () => {
  test("is escaped through a function the launcher carries", () => {
    expect(escaping).toContain("_sn_json_escape() {")
  })

  test("has its backslashes doubled before its quotes are escaped", () => {
    expect(escaping.indexOf("//\\\\/")).toBeLessThan(escaping.indexOf('//\\"/'))
  })

  test("is escaped before every payload the launcher composes", () => {
    expect(stating).toContain('_sn_json_escape "$full_aid"')
    expect(spelling).toContain('_sn_json_escape "$name"')
  })
})

describe("what a seat states", () => {
  test("is read back under the key the seat call answers a read under", () => {
    expect(stating).toContain('\\"whoami\\":true')
  })

  test("leaves out an attribute nobody stated rather than sending it empty", () => {
    expect(stating).toContain('case "$_sn_slug" in ""|null) continue ;; esac')
  })

  test("names no principal for a seat a person handles", () => {
    expect(stating).toContain(
      `persona) [ "$_sn_handler" = 1 ] || _sn_answering=",\\"principal\\":\\"${INTERACTIVE_PRINCIPAL}\\"" ;;`
    )
  })

  test("is written in a call apart from the default and the mode", () => {
    expect(stating).toContain(`\\"default\\":true,\\"mode\\":\\"${SEAT_MODE_INTERACTIVE}\\"`)
  })

  test("says on the error stream that the gate is unarmed rather than stopping", () => {
    expect(stating).toContain("The gate is unarmed for this seat.")
    expect(stating).toContain("it returns decisions it would otherwise put to you.")
    expect(stating).not.toContain("return 1")
  })

  test("parses", async () => {
    expect(await parses(`${escaping}\n  local full_aid=x\n${stating}`)).toBe(0)
  })
})

describe("the words a caller typed", () => {
  test("are sorted into slots by the seat call rather than by the shell", () => {
    expect(resolveTokensLines("sn").join("\n")).toContain('\\"resolve\\":true')
  })

  test("reach the seat call as one list of tokens", () => {
    expect(resolveTokensLines("sn").join("\n")).toContain('for _sn_token in "${@:2}"; do')
  })
})

describe("a seat's name", () => {
  test("is spelled by the seat call rather than by the shell", () => {
    expect(spelling).toContain('\\"name\\":true')
    expect(spelling).toContain(`bun "$_root/${SEAT_COMMAND_REL}"`)
  })

  test("falls back to the persona's own name where nothing was spelled", () => {
    expect(spelling).toContain('local _sn_seat="$name"')
    expect(spelling).toContain("is not in the seat name — seating $name.")
  })

  test("is not spelled at all for a seat a person handles", () => {
    expect(spelling).toContain('if [ "$_sn_handler" != 1 ]; then')
  })

  test("parses", async () => {
    expect(await parses(`${escaping}\n  local name=x\n${spelling}`)).toBe(0)
  })
})
