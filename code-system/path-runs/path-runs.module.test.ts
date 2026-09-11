import { expect, test } from "bun:test"
import { runsIn } from "akasha/code-system/path-runs/path-runs.module.code.ts"

test("a run of path characters is answered with the line that run sits on", () => {
  expect(runsIn("one\nsay a/b here\n")).toEqual([{ line: 2, said: ["a/b", "b"], rooted: false }])
})

test("a bare shell variable opens the run after it", () => {
  expect(runsIn("cp $ROOT/a/b .")[0]?.rooted).toBe(true)
})

test("a braced shell variable opens the run after it", () => {
  expect(runsIn("cp ${ROOT}/a/b .")[0]?.rooted).toBe(true)
})

test("a shell variable after a colon opens the run after it", () => {
  expect(runsIn('rsync -a x "$HOST:$ROOT/a/b"')[0]?.rooted).toBe(true)
})

test("a `$` a path character sits before opens nothing", () => {
  expect(runsIn("cp x$ROOT/a/b .")[0]?.rooted).toBe(false)
})

test("a variable filling a segment inside a path opens nothing", () => {
  expect(runsIn("cp a/$KIND/b .").map((one) => one.rooted)).toEqual([false, false])
})

test("a `$` before no name is no shell variable", () => {
  expect(runsIn("cp $/a/b .")[0]?.rooted).toBe(false)
})

test("a shell variable elsewhere on the line opens no other run", () => {
  expect(runsIn("cp a/b $DEST")[0]?.rooted).toBe(false)
})

test("a run is read again from each separator in that run", () => {
  expect(runsIn("$AKASHA_ROOT/code-system/pages")[0]?.said).toEqual([
    "AKASHA_ROOT/code-system/pages",
    "code-system/pages",
    "pages",
  ])
})

test("a run with no separator is no path", () => {
  expect(runsIn("one two three")).toEqual([])
})

test("a line with no separator holds no run", () => {
  expect(runsIn("nothing here\nbut a/b there").map((one) => one.line)).toEqual([2])
})

test("two runs on one line are answered apart", () => {
  expect(runsIn("a/b, c/d").map((one) => one.said[0])).toEqual(["a/b", "c/d"])
})

test("a separator closing a run leaves the reading past that separator empty", () => {
  expect(runsIn("a/b/")[0]?.said).toEqual(["a/b/", "b/", ""])
})

test("a run reaches over no line break", () => {
  expect(runsIn("a/\nb").map((one) => one.said)).toEqual([["a/", ""]])
})

test("a line is numbered from one", () => {
  expect(runsIn("a/b")[0]?.line).toBe(1)
})
