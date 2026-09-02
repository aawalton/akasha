import { expect, test } from "bun:test"
import { parseWatcherLine } from "../watcher-log-line/watcher-log-line.module.code.ts"
import { logLine, MAX_LOG_FILES, rollRenames, shouldRoll } from "./watcher-logging.module.code.ts"

const AT = new Date("2026-09-02T13:45:07.123Z")

test("a line opens with the time in utc to the millisecond", () => {
  expect(logLine("INFO", "hello", AT)).toStartWith("2026-09-02T13:45:07.123Z ")
})

test("the level follows the time and the message follows the level", () => {
  expect(logLine("INFO", "hello", AT)).toBe("2026-09-02T13:45:07.123Z INFO hello\n")
  expect(logLine("ERROR", "bad", AT)).toBe("2026-09-02T13:45:07.123Z ERROR bad\n")
})

test("a line the worker writes is a line the log reader parses back whole", () => {
  for (const level of ["INFO", "ERROR"] as const) {
    const raw = logLine(level, "carried 3 files across", AT).trimEnd()
    const read = parseWatcherLine(raw, "watcher")
    expect(read).not.toBeNull()
    expect(read?.level).toBe(level)
    expect(read?.line).toBe("carried 3 files across")
    expect(read?.timestamp).toBe("2026-09-02T13:45:07.123Z")
    expect(read?.source).toBe("watcher")
  }
})

test("a message holding spaces survives the round trip whole", () => {
  const message = "Config error: ENOENT no such file"
  const raw = logLine("ERROR", message, AT).trimEnd()
  expect(parseWatcherLine(raw, "watcher")?.line).toBe(message)
})

test("a log below the largest size allowed is not rolled over", () => {
  expect(shouldRoll(0, 1000)).toBe(false)
  expect(shouldRoll(999, 1000)).toBe(false)
})

test("a log grown to the largest size allowed is rolled over", () => {
  expect(shouldRoll(1000, 1000)).toBe(true)
  expect(shouldRoll(1001, 1000)).toBe(true)
})

test("a roll is renamed from the highest number downward", () => {
  expect(rollRenames("/log/watcher.log", 3)).toEqual([
    { from: "/log/watcher.1.log", to: "/log/watcher.2.log" },
    { from: "/log/watcher.log", to: "/log/watcher.1.log" },
  ])
})

test("the roll that would exceed the count kept is never written to", () => {
  const targets = rollRenames("/log/watcher.log", MAX_LOG_FILES).map((r) => r.to)
  expect(targets).not.toContain(`/log/watcher.${MAX_LOG_FILES}.log`)
})

test("no roll is renamed onto a name another roll is renamed from later", () => {
  const renames = rollRenames("/log/watcher.log", 4)
  const seen = new Set<string>()
  for (const { from, to } of renames) {
    expect(seen.has(from)).toBe(false)
    seen.add(to)
  }
})
