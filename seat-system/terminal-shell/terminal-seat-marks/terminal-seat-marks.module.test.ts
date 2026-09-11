import { describe, expect, it } from "bun:test"
import { parses } from "akasha/seat-system/terminal-shell/terminal-bash/terminal-bash.module.test-fixtures.ts"
import {
  MARK_TAIL,
  markIn,
  REATTACH_VAR,
  SEAT_ATTACH_FN,
  SEAT_MARK_FN,
  type SeatMark,
  seatAttachFnLines,
  seatByShellPid,
  seatMarkFnLines,
  seatReviveMarkLines,
} from "akasha/seat-system/terminal-shell/terminal-seat-marks/terminal-seat-marks.module.code.ts"

const SEATS = new Set(["amy", "aranya"])

const ROOT_LOCAL = 'local _root="/repos/akasha"'

function startedIn(started: Readonly<Record<number, string>>): (pid: number) => string | null {
  return (pid) => started[pid] ?? null
}

function markOf(pid: number, startedAt: string, seat: string): SeatMark {
  return { pid, startedAt, seat }
}

describe("a mark a shell left", () => {
  it("names the seat that shell attached to", () => {
    const found = seatByShellPid([markOf(40, "9931", "amy")], SEATS, startedIn({ 40: "9931" }))
    expect(found.get(40)).toBe("amy")
  })

  it("names nothing where the pid started at another moment", () => {
    const found = seatByShellPid([markOf(40, "9931", "amy")], SEATS, startedIn({ 40: "20507" }))
    expect(found.size).toBe(0)
  })

  it("names nothing where the pid is gone", () => {
    const found = seatByShellPid([markOf(40, "9931", "amy")], SEATS, startedIn({}))
    expect(found.size).toBe(0)
  })

  it("names nothing where the seat is no seat", () => {
    const found = seatByShellPid([markOf(40, "9931", "nobody")], SEATS, startedIn({ 40: "9931" }))
    expect(found.size).toBe(0)
  })

  it("leaves the other marks where one is stale", () => {
    const marks = [markOf(40, "9931", "amy"), markOf(60, "9955", "aranya")]
    const found = seatByShellPid(marks, SEATS, startedIn({ 40: "1", 60: "9955" }))
    expect([...found]).toEqual([[60, "aranya"]])
  })
})

describe("the name a mark is written under", () => {
  it("is read back as the pid and the moment that pid started", () => {
    expect(markIn(`40-9931${MARK_TAIL}`, '{"seat":"amy"}\n')).toEqual(markOf(40, "9931", "amy"))
  })

  it("is no mark where the file is named some other way", () => {
    expect(markIn("40-9931.code-editor-terminal.ended.uncommitted.attachment.json", "{}")).toBe(
      null
    )
  })

  it("is no mark where the body names no seat", () => {
    expect(markIn(`40-9931${MARK_TAIL}`, "{}")).toBe(null)
    expect(markIn(`40-9931${MARK_TAIL}`, "not json")).toBe(null)
  })

  it("is no mark where the name carries no moment", () => {
    expect(markIn(`40${MARK_TAIL}`, '{"seat":"amy"}')).toBe(null)
  })
})

describe("the shell that states its seat", () => {
  it("hands back the path it wrote", () => {
    const said = seatMarkFnLines(ROOT_LOCAL).join("\n")
    expect(said).toContain(`${SEAT_MARK_FN}() {`)
    expect(said.indexOf(`>"$_at"`)).toBeLessThan(said.lastIndexOf(`printf '%s' "$_at"`))
  })

  it("hands back nothing where it could not write", () => {
    const said = seatMarkFnLines(ROOT_LOCAL).join("\n")
    expect(said).toContain('mkdir -p "$_dir" 2>/dev/null || return 1')
    expect(said).toContain('[ -n "$_start" ] || return 1')
  })

  it("parses", async () => {
    expect(await parses(seatMarkFnLines(ROOT_LOCAL).join("\n"))).toBe(0)
  })
})

describe("the shell that attaches", () => {
  it("states its seat before attaching and clears the mark after", () => {
    const said = seatAttachFnLines().join("\n")
    expect(said).toContain(`${SEAT_ATTACH_FN}() {`)
    expect(said.indexOf(SEAT_MARK_FN)).toBeLessThan(said.indexOf("tmux attach-session"))
    expect(said.indexOf("tmux attach-session")).toBeLessThan(said.indexOf('rm -f "$_at"'))
  })

  it("hands back what the attach handed it", () => {
    const said = seatAttachFnLines().join("\n")
    expect(said).toContain("local _rc=$?")
    expect(said).toContain("return $_rc")
  })

  it("parses", async () => {
    const said = [...seatMarkFnLines(ROOT_LOCAL), ...seatAttachFnLines()].join("\n")
    expect(await parses(said)).toBe(0)
  })
})

describe("the terminal the editor revived", () => {
  it("states the seat the editor recorded for it", () => {
    const said = seatReviveMarkLines().join("\n")
    expect(said).toContain(REATTACH_VAR)
    expect(said).toContain(`${SEAT_MARK_FN} "\${${REATTACH_VAR}}"`)
  })

  it("states nothing from inside tmux", () => {
    expect(seatReviveMarkLines().join("\n")).toContain('[ -z "${TMUX:-}" ]')
  })

  it("attaches nothing of its own", () => {
    expect(seatReviveMarkLines().join("\n")).not.toContain("tmux attach-session")
  })

  it("parses", async () => {
    const said = [...seatMarkFnLines(ROOT_LOCAL), ...seatReviveMarkLines()].join("\n")
    expect(await parses(said)).toBe(0)
  })
})
