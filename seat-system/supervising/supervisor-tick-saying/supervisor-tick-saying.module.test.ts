import { expect, test } from "bun:test"
import { tickSaying } from "./supervisor-tick-saying.module.code.ts"

function logged(): { lines: string[]; log: (line: string) => void } {
  const lines: string[] = []
  return { lines, log: (line: string) => void lines.push(line) }
}

test("a kind that is not the kind said last says its line", () => {
  const said = logged()
  const saying = tickSaying<string>("none", said.log)

  saying.note("hold", "held once")

  expect(said.lines).toEqual(["held once"])
})

test("the same kind twice running says its line once", () => {
  const said = logged()
  const saying = tickSaying<string>("none", said.log)

  saying.note("hold", "held once")
  saying.note("hold", "held twice")

  expect(said.lines).toEqual(["held once"])
})

test("a kind that turns back says its line again", () => {
  const said = logged()
  const saying = tickSaying<string>("none", said.log)

  saying.note("hold", "holding")
  saying.note("wait", "waiting")
  saying.note("hold", "holding again")

  expect(said.lines).toEqual(["holding", "waiting", "holding again"])
})

test("the kind it starts at is the kind said last, so its line is passed over", () => {
  const said = logged()
  const saying = tickSaying<string>("none", said.log)

  saying.note("none", "nothing happened")

  expect(said.lines).toEqual([])
})

test("a kind marked says nothing and holds the line that kind would have said", () => {
  const said = logged()
  const saying = tickSaying<string>("none", said.log)

  saying.marked("hold")
  saying.note("hold", "held")

  expect(said.lines).toEqual([])
})

test("a monitor handed no log says nothing and still remembers the kind", () => {
  const saying = tickSaying<string>("none")

  expect(() => saying.note("hold", "held")).not.toThrow()
})
