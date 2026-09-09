import { describe, expect, it } from "bun:test"
import {
  MARK_TAIL,
  markIn,
  SEAT_ATTACH_FN,
  type SeatMark,
  seatAttachFnLines,
  seatByShellPid,
} from "./terminal-seat-marks.module.code.ts"

const SEATS = new Set(["amy", "aranya"])

function startedIn(started: Readonly<Record<number, string>>): (pid: number) => string | null {
  return (pid) => started[pid] ?? null
}

function markOf(pid: number, startedAt: string, seat: string): SeatMark {
  return { pid, startedAt, seat }
}

async function parses(text: string): Promise<number> {
  const ran = Bun.spawn({ cmd: ["bash", "-n"], stdin: new TextEncoder().encode(text) })
  return await ran.exited
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

describe("the shell that attaches", () => {
  it("writes its mark before attaching and clears it after", () => {
    const said = seatAttachFnLines().join("\n")
    expect(said).toContain(`${SEAT_ATTACH_FN}() {`)
    expect(said.indexOf(MARK_TAIL)).toBeLessThan(said.indexOf("tmux attach-session"))
    expect(said.indexOf("tmux attach-session")).toBeLessThan(said.indexOf('rm -f "$_at"'))
  })

  it("hands back what the attach handed it", () => {
    const said = seatAttachFnLines().join("\n")
    expect(said).toContain("local _rc=$?")
    expect(said).toContain("return $_rc")
  })

  it("parses", async () => {
    expect(await parses(seatAttachFnLines().join("\n"))).toBe(0)
  })
})
