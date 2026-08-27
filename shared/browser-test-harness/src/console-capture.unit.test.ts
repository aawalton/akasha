import { describe, expect, test } from "bun:test"
import { type ConsoleEntry, createConsoleBuffer, formatConsoleDump } from "./console-capture"

describe("formatConsoleDump", () => {
  test("empty buffer → single 'nothing captured' line", () => {
    const lines = formatConsoleDump(undefined, [], 0)
    expect(lines).toHaveLength(1)
    expect(lines[0]).toContain("no browser console output or page errors captured")
  })

  test("empty buffer with a label prefixes the label", () => {
    const lines = formatConsoleDump("my failing test", [], 0)
    expect(lines[0]).toContain("my failing test:")
  })

  test("entries render one greppable line each under the header", () => {
    const entries: ConsoleEntry[] = [
      { kind: "console", type: "error", text: "504 (Outdated Optimize Dep)", atMs: 5637 },
      { kind: "pageerror", type: "exception", text: "boom", atMs: 6001 },
    ]
    const lines = formatConsoleDump(undefined, entries, 0)
    expect(lines).toHaveLength(3)
    expect(lines[0]).toContain("2 entries captured")
    expect(lines[1]).toContain("+5637ms error: 504 (Outdated Optimize Dep)")
    expect(lines[2]).toContain("+6001ms pageerror: boom")
    for (const l of lines) expect(l.startsWith("[browser console]")).toBe(true)
  })

  test("singular vs plural entry noun", () => {
    const one: ConsoleEntry[] = [{ kind: "console", type: "log", text: "x", atMs: 1 }]
    expect(formatConsoleDump(undefined, one, 0)[0]).toContain("1 entry captured")
    expect(formatConsoleDump(undefined, one, 0)[0]).not.toContain("1 entries")
  })

  test("dropped overflow is reported in the header", () => {
    const one: ConsoleEntry[] = [{ kind: "console", type: "log", text: "x", atMs: 1 }]
    expect(formatConsoleDump(undefined, one, 7)[0]).toContain("(+7 suppressed beyond cap)")
  })
})

describe("createConsoleBuffer", () => {
  const fakeClock = (): (() => number) => {
    let t = 0
    return () => (t += 100)
  }

  test("push records entries with atMs relative to start", () => {
    const { push, capture } = createConsoleBuffer({ now: fakeClock() })
    push("console", "log", "a")
    push("pageerror", "exception", "b")
    const entries = capture.entries()
    expect(entries).toHaveLength(2)
    expect(entries[0]).toEqual({ kind: "console", type: "log", text: "a", atMs: 100 })
    expect(entries[1]).toEqual({ kind: "pageerror", type: "exception", text: "b", atMs: 200 })
  })

  test("caps the buffer and counts overflow instead of evicting the earliest", () => {
    const { push, capture } = createConsoleBuffer({ cap: 2 })
    push("console", "log", "first")
    push("console", "log", "second")
    push("console", "log", "third")
    const entries = capture.entries()
    expect(entries).toHaveLength(2)
    expect(entries[0]?.text).toBe("first")
    expect(entries[1]?.text).toBe("second")
    expect(formatConsoleDump(undefined, entries, 1)[0]).toContain("(+1 suppressed beyond cap)")
  })

  test("clear empties the buffer and resets the dropped count", () => {
    const { push, capture } = createConsoleBuffer({ cap: 1 })
    push("console", "log", "a")
    push("console", "log", "b")
    capture.clear()
    expect(capture.entries()).toHaveLength(0)
    push("console", "log", "c")
    expect(capture.entries()).toHaveLength(1)
    expect(capture.entries()[0]?.text).toBe("c")
  })
})
