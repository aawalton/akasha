import { expect, test } from "bun:test"
import { everyService } from "../service-reading/service-reading.module.code.ts"
import { commandOf } from "./run-composing.module.code.ts"
import { NOWHERE, OUTSIDE, STARTS } from "./run-composing.module.test-fixtures.ts"

const ROOT = process.cwd()

function runsBySlug(): ReadonlyMap<string, readonly string[]> {
  const read = everyService(ROOT)
  if ("refused" in read) throw new Error(read.refused)
  const found = new Map<string, readonly string[]>()
  for (const one of read.services) found.set(one.service.slug, one.service.runs)
  return found
}

test("every service page here is either composed or named as one this shape does not reach", () => {
  const runs = runsBySlug()
  for (const slug of runs.keys()) {
    expect([slug, slug in STARTS || slug in OUTSIDE]).toEqual([slug, true])
  }
  for (const slug of Object.keys(STARTS)) expect([slug, runs.has(slug)]).toEqual([slug, true])
  for (const slug of Object.keys(OUTSIDE)) expect([slug, runs.has(slug)]).toEqual([slug, true])
})

test("a command composed from pages is the command its page states today, byte for byte", () => {
  const runs = runsBySlug()
  for (const [slug, starts] of Object.entries(STARTS)) {
    const stated = runs.get(slug) ?? []
    expect([slug, starts.length]).toEqual([slug, stated.length])
    for (let at = 0; at < starts.length; at += 1) {
      const one = starts[at]
      if (one === undefined) continue
      expect([slug, at, commandOf(ROOT, one)]).toEqual([
        slug,
        at,
        { command: stated[at] as string },
      ])
    }
  }
})

test("a name reaching no page refuses rather than composing a path", () => {
  expect("refused" in commandOf(ROOT, { module: NOWHERE })).toBe(true)
})
