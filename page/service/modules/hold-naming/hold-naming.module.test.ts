import { afterEach, expect, test } from "bun:test"
import {
  forgotten,
  heldSaid,
  landingMarked,
  landingsSaid,
  marked,
  phased,
  watching,
} from "akasha/page/service/modules/hold-naming/hold-naming.module.code.ts"

function busy(ms: number): undefined {
  const until = performance.now() + ms
  while (performance.now() < until) {}
  return undefined
}

afterEach(() => watching(false))

test("a mark kept while nothing watches keeps nothing and still answers", () => {
  watching(false)
  expect(marked("POST /write", () => 7)).toBe(7)
  expect(heldSaid(0, performance.now())).toBe("nothing named ran")
})

test("a hold names the mark that ended during it and the mark still running", async () => {
  watching()
  const from = performance.now()
  let finish: () => void = () => undefined
  const running = marked(
    "POST /write",
    () =>
      new Promise<undefined>((done) => {
        finish = () => done(undefined)
      })
  )
  marked("generator group-writing", () => busy(120))
  const said = heldSaid(from, performance.now())
  expect(said).toMatch(/^generator group-writing \d+ ms, POST \/write \d+ ms so far$/)
  finish()
  await running
})

test("a mark under a tenth of a second is not named", () => {
  watching()
  const from = performance.now()
  marked("follow push", () => undefined)
  expect(heldSaid(from, performance.now())).toBe("nothing named ran")
})

test("marks of one name are said once with how many", () => {
  watching()
  const from = performance.now()
  marked("POST /ask", () => busy(105))
  marked("POST /ask", () => busy(105))
  expect(heldSaid(from, performance.now())).toMatch(/^2x POST \/ask up to \d+ ms$/)
})

test("a mark ended before the tick is let go", () => {
  watching()
  marked("follow plan", () => busy(105))
  forgotten(performance.now())
  expect(heldSaid(0, performance.now())).toBe("nothing named ran")
})

test("a landing is said with its commit and each phase at or over its least time", async () => {
  watching()
  const from = performance.now()
  await landingMarked(
    "landing by Amy",
    async () => {
      phased("compose", () => busy(1))
      phased("generator quick", () => busy(1), 100)
      phased("generator slow", () => busy(105), 100)
      await phased("commit", async () => busy(1))
      return { commit: "0123456789abcdef" }
    },
    (done) => done.commit
  )
  const said = landingsSaid(from, performance.now())
  expect(said).toMatch(
    /^landing by Amy to 01234567 took \d+ ms \(compose \d+ ms, generator slow \d+ ms, commit \d+ ms\)$/
  )
})

test("a landing that ended before the request began is not said", async () => {
  watching()
  await landingMarked(
    "landing by Amy",
    async () => null,
    () => null
  )
  expect(landingsSaid(performance.now() + 1, performance.now() + 2)).toBe("")
})
