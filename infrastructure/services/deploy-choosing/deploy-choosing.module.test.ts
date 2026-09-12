import { expect, test } from "bun:test"
import {
  byName,
  type Candidate,
  COOLDOWN_SECONDS,
  chosenFrom,
  cooledBy,
  heldBackBy,
} from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"

const NOW = 1_000_000_000

function candidate(slug: string, some: Partial<Candidate> = {}): Candidate {
  return {
    slug,
    wants: true,
    deploying: false,
    deployedAt: NOW - 1000,
    deployEndedAt: null,
    cooldownSeconds: COOLDOWN_SECONDS,
    dependsOn: [],
    ...some,
  }
}

test("a service wanting a deploy is chosen", () => {
  expect(chosenFrom([candidate("one")], NOW)?.slug).toBe("one")
})

test("a service wanting no deploy is chosen by nothing", () => {
  expect(chosenFrom([candidate("one", { wants: false })], NOW)).toBe(null)
})

test("a service with a deploy running is passed over", () => {
  const every = [candidate("one", { deploying: true }), candidate("two")]
  expect(chosenFrom(every, NOW)?.slug).toBe("two")
})

test("a service inside its cooldown is passed over", () => {
  const one = candidate("one", { deployEndedAt: NOW - 30_000, cooldownSeconds: 60 })
  expect(chosenFrom([one], NOW)).toBe(null)
})

test("a service past its cooldown is chosen", () => {
  const one = candidate("one", { deployEndedAt: NOW - 61_000, cooldownSeconds: 60 })
  expect(chosenFrom([one], NOW)?.slug).toBe("one")
})

test("a service whose last deploy ended at no moment is past its cooldown", () => {
  expect(cooledBy(candidate("one", { deployEndedAt: null }), NOW)).toBe(true)
})

test("the cooldown a page states is the one waited out", () => {
  const one = candidate("one", { deployEndedAt: NOW - 600_000, cooldownSeconds: 3600 })
  expect(cooledBy(one, NOW)).toBe(false)
})

test("a service a service it depends on wants a deploy for is held back", () => {
  const one = candidate("one", { dependsOn: ["two"] })
  const two = candidate("two")
  expect(heldBackBy(one, byName([one, two]))).toEqual(["two"])
  expect(chosenFrom([one, two], NOW)?.slug).toBe("two")
})

test("a service whose dependency wants nothing is not held back", () => {
  const one = candidate("one", { dependsOn: ["two"] })
  const two = candidate("two", { wants: false })
  expect(chosenFrom([one, two], NOW)?.slug).toBe("one")
})

test("holding back carries down a chain", () => {
  const one = candidate("one", { dependsOn: ["two"] })
  const two = candidate("two", { dependsOn: ["three"] })
  const three = candidate("three")
  expect(chosenFrom([one, two, three], NOW)?.slug).toBe("three")
})

test("a service naming a service that is nowhere is held back by nothing", () => {
  const one = candidate("one", { dependsOn: ["gone"] })
  expect(chosenFrom([one], NOW)?.slug).toBe("one")
})

test("the service furthest behind is chosen", () => {
  const one = candidate("one", { deployedAt: NOW - 1000 })
  const two = candidate("two", { deployedAt: NOW - 50_000 })
  expect(chosenFrom([one, two], NOW)?.slug).toBe("two")
})

test("a service never deployed is furthest behind of all", () => {
  const one = candidate("one", { deployedAt: NOW - 900_000 })
  const two = candidate("two", { deployedAt: null })
  expect(chosenFrom([one, two], NOW)?.slug).toBe("two")
})

test("two services equally far behind are ordered by slug", () => {
  const one = candidate("beta", { deployedAt: NOW - 5000 })
  const two = candidate("alpha", { deployedAt: NOW - 5000 })
  expect(chosenFrom([one, two], NOW)?.slug).toBe("alpha")
  expect(chosenFrom([two, one], NOW)?.slug).toBe("alpha")
})

test("two services never deployed are ordered by slug", () => {
  const one = candidate("beta", { deployedAt: null })
  const two = candidate("alpha", { deployedAt: null })
  expect(chosenFrom([one, two], NOW)?.slug).toBe("alpha")
})

test("a tick with nothing able chooses nothing", () => {
  expect(chosenFrom([], NOW)).toBe(null)
})

test("the stated cooldown is a whole number of seconds above zero", () => {
  expect(Number.isInteger(COOLDOWN_SECONDS)).toBe(true)
  expect(COOLDOWN_SECONDS).toBeGreaterThan(0)
})
