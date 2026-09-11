import { expect, test } from "bun:test"
import {
  type Answerable,
  refusedAnswering,
} from "akasha/seat-system/seat-answering/seat-answering.module.code.ts"

const AMONG: Answerable = {
  personIsPrincipal: (principal) => principal === "alan",
  personaAnswersForSomebody: (persona) => persona !== "claude",
  persons: () => ["alan"],
}

test("a persona answering for somebody, answering to a person, stands", () => {
  expect(refusedAnswering({ persona: "aine", principal: "alan" }, AMONG)).toEqual([])
})

test("a seat working for the fleet under the default persona stands", () => {
  expect(refusedAnswering({ persona: "claude", principal: "agent" }, AMONG)).toEqual([])
})

test("a seat stating neither half stands", () => {
  expect(refusedAnswering({ persona: null, principal: null }, AMONG)).toEqual([])
})

test("a persona without a person to answer to is refused, and the refusal names the persons", () => {
  const said = refusedAnswering({ persona: "aine", principal: "agent" }, AMONG)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`aine` is a persona")
  expect(said[0]).toContain("alan")
})

test("a persona with no principal at all is refused and said so", () => {
  const said = refusedAnswering({ persona: "aine", principal: null }, AMONG)
  expect(said[0]).toContain("no principal at all")
})

test("a person's seat left at the default persona is refused", () => {
  const said = refusedAnswering({ persona: "claude", principal: "alan" }, AMONG)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("which is the default")
})

test("a person's seat stating no persona is refused", () => {
  const said = refusedAnswering({ persona: null, principal: "alan" }, AMONG)
  expect(said[0]).toContain("states no persona")
})

test("an empty persona answers for nobody rather than for somebody named empty", () => {
  expect(refusedAnswering({ persona: "", principal: "agent" }, AMONG)).toEqual([])
})
