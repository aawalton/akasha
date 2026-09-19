import { expect, test } from "bun:test"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import type { Piping } from "akasha/command/modules/piping/piping.module.code.ts"
import { markedLine, markingIn, pipedIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { terminal } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SAYING = {
  bare: (path: string) => `nothing is piped in for ${path}`,
  opening: (path: string, why: string) => `${path} would not open — ${why}`,
}

const HELD_OPEN = 30

const ROOT = process.cwd()

const MODULE = "module"

const PIPES = "piping"

function pipingAt(): string {
  const page = listedAt(ROOT, MODULE, PIPES)[0]
  const at = page === undefined ? null : besideAt(page.path, "code", "ts")
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${PIPES}\`, so nothing says where its code sits`)
  }
  return join(ROOT, at)
}

const READS =
  `import {inputIn} from ${JSON.stringify(pipingAt())};` +
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

function bytes(said: string): Uint8Array {
  return new TextEncoder().encode(said)
}

function pipes(said: string): Piping {
  return () => ({ bytes: bytes(said) })
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
