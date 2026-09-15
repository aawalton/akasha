import { afterEach, expect, test } from "bun:test"
import { sayingWith } from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-saying/supervisor-saying.module.code.ts"

const CONSOLE_ERROR = console.error

const STDERR_WRITE = process.stderr.write

const MARK = "[a-mark]"

afterEach(() => {
  console.error = CONSOLE_ERROR
  process.stderr.write = STDERR_WRITE
})

test("a line the console takes goes to the console with the mark it was made with", () => {
  const said: string[] = []
  console.error = (...args: readonly unknown[]) => {
    said.push(args.map((one) => String(one)).join(" "))
  }

  sayingWith(MARK)("the wire is broken")

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("[a-mark] the wire is broken")
})

test("a line the console throws over is written to standard error instead", () => {
  const written: string[] = []
  console.error = () => {
    throw new Error("the sink refuses this line")
  }
  process.stderr.write = ((chunk: string) => {
    written.push(chunk)
    return true
  }) as typeof process.stderr.write

  sayingWith(MARK)("the wire is broken", new Error("beneath"))

  expect(written).toEqual(["[a-mark] the wire is broken\n"])
})

test("a line standard error throws over is dropped rather than thrown on", () => {
  console.error = () => {
    throw new Error("the sink refuses this line")
  }
  process.stderr.write = (() => {
    throw new Error("standard error refuses this line")
  }) as typeof process.stderr.write

  expect(() => sayingWith(MARK)("the wire is broken")).not.toThrow()
})
