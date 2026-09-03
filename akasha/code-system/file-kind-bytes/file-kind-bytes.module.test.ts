import { expect, test } from "bun:test"
import { carriesBytes } from "./file-kind-bytes.module.code.ts"

test("the kinds of file that are bytes are said to be", () => {
  for (const one of ["held.png", "held.jpg", "held.jpeg", "held.ico", "held.dds"]) {
    expect(carriesBytes(`some/where/${one}`)).toBe(true)
  }
})

test("the kinds of file that are text are not", () => {
  for (const one of ["held.ts", "held.md", "held.json", "held.jsonl", "held.sh", "held.bash"]) {
    expect(carriesBytes(`some/where/${one}`)).toBe(false)
  }
})

test("a name reaching no kind at all is text rather than bytes", () => {
  expect(carriesBytes("some/where/held.unheard-of")).toBe(false)
})

test("a bare name is read as the path ending in it is", () => {
  expect(carriesBytes("held.png")).toBe(carriesBytes("deep/down/held.png"))
})
