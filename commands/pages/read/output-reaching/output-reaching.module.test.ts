import { expect, test } from "bun:test"
import {
  discardedBy,
  inheritedOut,
  type Opening,
} from "akasha/commands/pages/read/output-reaching/output-reaching.module.code.ts"

function opening(said: Partial<Opening>): Opening {
  return {
    dev: 0,
    ino: 0,
    isFIFO: () => false,
    isFile: () => true,
    ...said,
  }
}

const NOWHERE = opening({ dev: 1, ino: 1, isFile: () => false })

const ELSEWHERE = opening({ dev: 9, ino: 9 })

test("output at /dev/null is thrown away", () => {
  expect(discardedBy(opening({ dev: 1, ino: 1 }), ELSEWHERE, NOWHERE)).toBe("/dev/null")
})

test("output down a pipe is thrown away", () => {
  const out = opening({
    dev: 2,
    ino: 2,
    isFIFO: () => true,
    isFile: () => false,
  })
  expect(discardedBy(out, ELSEWHERE, NOWHERE)).toBe("a pipe")
})

test("output in the file the shell it was called from already had is no redirect", () => {
  const out = opening({ dev: 3, ino: 3 })
  expect(discardedBy(out, opening({ dev: 3, ino: 3 }), NOWHERE)).toBeNull()
})

test("output in a file that shell did not have is a redirect, errors going there or not", () => {
  const out = opening({ dev: 3, ino: 3 })
  expect(discardedBy(out, opening({ dev: 4, ino: 4 }), NOWHERE)).toBe(
    "a file only this redirect opened"
  )
})

test("a file redirect goes unjudged where the shell's own output cannot be read", () => {
  const out = opening({ dev: 8, ino: 8 })
  expect(discardedBy(out, null, NOWHERE)).toBeNull()
})

test("a pipe is thrown away though the shell's own output cannot be read", () => {
  const out = opening({ dev: 9, ino: 9, isFIFO: () => true, isFile: () => false })
  expect(discardedBy(out, null, NOWHERE)).toBe("a pipe")
})

test("the output a living process holds is answered, and a pid holding none answers nothing", () => {
  const own = inheritedOut(process.pid)
  expect(own === null ? null : typeof own.ino).toBe("number")
  expect(inheritedOut(-1)).toBeNull()
})

test("output at a terminal reaches whoever asked", () => {
  const out = opening({ dev: 5, ino: 5, isFile: () => false })
  expect(discardedBy(out, ELSEWHERE, NOWHERE)).toBeNull()
})
