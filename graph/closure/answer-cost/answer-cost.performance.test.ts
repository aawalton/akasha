import { expect, test } from "bun:test"
import { codeIn, linesFor } from "akasha/graph/closure/answer-cost/answer-cost.performance.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

test("a line names the closure, how many files it reached and what it took", () => {
  expect(linesFor([{ name: "out landing", reached: 12, milliseconds: 34 }])).toEqual([
    "out landing\t12 files\t34ms",
  ])
})

test("a seed is the code beside the module page that slug names", () => {
  expect(codeIn(codeRoot(), "graph-asking")).toBe(
    "graph/modules/asking/graph-asking.module.code.ts"
  )
})

test("a slug no module page carries is refused rather than seeding nothing", () => {
  expect(() => codeIn(codeRoot(), "no-such-module-here")).toThrow(/no closure would be seeded/)
})
