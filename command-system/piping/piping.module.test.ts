import { expect, test } from "bun:test"
import { ran } from "@akasha/utils-run/running"
import type { Piping } from "./piping.module.code.ts"
import { markedLine, markingIn, passagesIn, pipedIn } from "./piping.module.code.ts"

const INSTEAD = "`--old-file` and `--new-file`"

const SAYING = {
  bare: (path: string) => `nothing is piped in for ${path}`,
  opening: (path: string, why: string) => `${path} would not open — ${why}`,
}

const HELD_OPEN = 30

const READS =
  `import {inputIn} from ${JSON.stringify(new URL("./piping.module.code.ts", import.meta.url).pathname)};` +
  "const held=inputIn();" +
  'console.log("bytes" in held?`bytes ${held.bytes.byteLength}`' +
  ':"tty" in held?"tty":`unreadable ${held.unreadable}`)'

function heldOpen(carrying: string): { readonly said: string; readonly waited: number } {
  const held = `exec 3< <(${carrying}; sleep ${String(HELD_OPEN)})`
  const began = Date.now()
  const done = ran(["bash", "-c", `${held}; exec ${process.execPath} -e '${READS}' <&3`], {
    timeout: HELD_OPEN * 1000,
  })
  return { said: `${done.out}${done.err}`.trim(), waited: Date.now() - began }
}

const ONE = "<<<<<<< old\nalpha\n=======\ndelta\n>>>>>>> new\n"

function bytes(said: string): Uint8Array {
  return new TextEncoder().encode(said)
}

function pipes(said: string): Piping {
  return () => ({ bytes: bytes(said) })
}

function refusalIn(said: string): string {
  const held = passagesIn(said, INSTEAD)
  if (!("refusals" in held)) throw new Error("this payload was taken rather than refused")
  return held.refusals.join("\n")
}

function passagesOf(said: string): readonly (readonly [string, string])[] {
  const held = passagesIn(said, INSTEAD)
  if ("refusals" in held) throw new Error(held.refusals.join("\n"))
  return held.passages.map((one) => [one.old, one.put] as const)
}

test("a line beginning with a marker run is marked, and one carrying it is not", () => {
  expect(markedLine("<<<<<<< old")).toBe(true)
  expect(markedLine("=======")).toBe(true)
  expect(markedLine(">>>>>>> new")).toBe(true)
  expect(markedLine("========")).toBe(true)
  expect(markedLine("  =======")).toBe(false)
  expect(markingIn("alpha\nbeta\n")).toBe(false)
  expect(markingIn("alpha\n=======\nbeta\n")).toBe(true)
})

test("bytes piped in are handed to whoever wants a body", () => {
  const held = pipedIn(pipes("alpha\n"), "akasha/one.ts", SAYING)
  expect("bytes" in held && new TextDecoder().decode(held.bytes)).toBe("alpha\n")
})

test("a terminal and an input holding no byte are both nothing piped in", () => {
  const terminal: Piping = () => ({ tty: true })
  const empty: Piping = () => ({ bytes: new Uint8Array() })
  for (const one of [terminal, empty]) {
    const held = pipedIn(one, "akasha/one.ts", SAYING)
    expect("refusals" in held && held.refusals[0]).toBe("nothing is piped in for akasha/one.ts")
  }
})

test("an input that would not open says why rather than reading as nothing", () => {
  const held = pipedIn(() => ({ unreadable: "EAGAIN" }), "akasha/one.ts", SAYING)
  expect("refusals" in held && held.refusals[0]).toContain("EAGAIN")
})

test("an input no path wants is never reached", () => {
  const never: Piping = () => {
    throw new Error("the input was reached")
  }
  expect(pipedIn(never, null, SAYING)).toEqual({ none: true })
})

test("an input that never ends and carried nothing is nothing piped in", () => {
  const held = heldOpen("true")
  expect(held.said).toBe("bytes 0")
  expect(held.waited).toBeLessThan(HELD_OPEN * 500)
}, 60000)

test("an input that went quiet part way through a body is refused rather than taken", () => {
  const held = heldOpen("echo alpha")
  expect(held.said).toContain("went quiet")
  expect(held.waited).toBeLessThan(HELD_OPEN * 500)
}, 60000)

test("a passage is the lines between its markers, each with its own newline", () => {
  expect(passagesOf(ONE)).toEqual([["alpha\n", "delta\n"]])
  expect(passagesOf("<<<<<<< old\na\nb\n=======\nc\n>>>>>>> new\n")).toEqual([["a\nb\n", "c\n"]])
})

test("a last line carrying no newline is a passage line all the same", () => {
  expect(passagesOf("<<<<<<< old\na\n=======\nc\n>>>>>>> new")).toEqual([["a\n", "c\n"]])
})

test("the blocks are answered in the order they are written", () => {
  expect(passagesOf(`${ONE}<<<<<<< old\ndelta\n=======\ngamma\n>>>>>>> new\n`)).toEqual([
    ["alpha\n", "delta\n"],
    ["delta\n", "gamma\n"],
  ])
})

test("a block carrying no old passage is answered as the empty passage it is", () => {
  expect(passagesOf("<<<<<<< old\n=======\ndelta\n>>>>>>> new\n")).toEqual([["", "delta\n"]])
})

test("a block closed by no split is refused for the split", () => {
  expect(refusalIn("<<<<<<< old\nalpha\n>>>>>>> new\n")).toContain("closed by no `=======`")
})

test("a block closed by nothing at all is refused for the close", () => {
  expect(refusalIn("<<<<<<< old\nalpha\n=======\ndelta\n")).toContain("closed by no `>>>>>>> new`")
  expect(refusalIn("<<<<<<< old\nalpha\n")).toContain("closed by no `=======`")
})

test("a block opened inside another is refused for the close the first wants", () => {
  const said = "<<<<<<< old\na\n=======\nb\n<<<<<<< old\n"
  expect(refusalIn(said)).toContain("closed by no `>>>>>>> new`")
})

test("a marker following no opening is refused as following none", () => {
  expect(refusalIn(">>>>>>> new\n")).toContain("follows no `<<<<<<< old`")
  expect(refusalIn("=======\n")).toContain("follows no `<<<<<<< old`")
})

test("a line outside every block is refused, and so is a payload carrying no block", () => {
  expect(refusalIn("alpha\n")).toContain("sits outside every marker block")
  expect(refusalIn("")).toContain("names no `<<<<<<< old`")
})

test("a marker run inside a passage is refused, naming what to hand it in at", () => {
  const opened = "<<<<<<< old\n<<<<<<< held\n=======\ndelta\n>>>>>>> new\n"
  expect(refusalIn(opened)).toContain(INSTEAD)
  expect(refusalIn(opened)).toContain("line 2")
  const closed = "<<<<<<< old\nalpha\n=======\n======= held\n>>>>>>> new\n"
  expect(refusalIn(closed)).toContain("line 4")
})
