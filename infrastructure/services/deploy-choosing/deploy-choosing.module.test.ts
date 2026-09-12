import { expect, test } from "bun:test"
import {
  byName,
  type Candidate,
  COOLDOWN_SECONDS,
  chosenFrom,
  cooledBy,
  heldBackBy,
  REFUSAL_SECONDS,
  type Wanting,
  waitedBy,
} from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"

const NOW = 1_000_000_000

const EVERY: Wanting = () => true

const NONE: Wanting = () => false

function wanting(...slugs: readonly string[]): Wanting {
  const held = new Set(slugs)
  return (one) => held.has(one.slug)
}

function candidate(slug: string, some: Partial<Candidate> = {}): Candidate {
  return {
    slug,
    deploying: false,
    deployedAt: NOW - 1000,
    deployEndedAt: null,
    refusedAt: null,
    cooldownSeconds: COOLDOWN_SECONDS,
    dependsOn: [],
    ...some,
  }
}

test("a service wanting a deploy is chosen", () => {
  expect(chosenFrom([candidate("one")], NOW, EVERY)?.slug).toBe("one")
})

test("a service wanting no deploy is chosen by nothing", () => {
  expect(chosenFrom([candidate("one")], NOW, NONE)).toBe(null)
})

test("a service with a deploy running is passed over without being asked", () => {
  const asked: string[] = []
  const every = [candidate("one", { deploying: true }), candidate("two")]
  const wants: Wanting = (one) => {
    asked.push(one.slug)
    return true
  }
  expect(chosenFrom(every, NOW, wants)?.slug).toBe("two")
  expect(asked).toEqual(["two"])
})

test("a service inside its cooldown is passed over", () => {
  const one = candidate("one", { deployEndedAt: NOW - 30_000, cooldownSeconds: 60 })
  expect(chosenFrom([one], NOW, EVERY)).toBe(null)
})

test("a service past its cooldown is chosen", () => {
  const one = candidate("one", { deployEndedAt: NOW - 61_000, cooldownSeconds: 60 })
  expect(chosenFrom([one], NOW, EVERY)?.slug).toBe("one")
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
  expect(heldBackBy(one, byName([one, two]), EVERY)).toEqual(["two"])
  expect(chosenFrom([one, two], NOW, EVERY)?.slug).toBe("two")
})

test("a service whose dependency wants nothing is not held back", () => {
  const one = candidate("one", { dependsOn: ["two"] })
  const two = candidate("two")
  expect(chosenFrom([one, two], NOW, wanting("one"))?.slug).toBe("one")
})

test("holding back carries down a chain", () => {
  const one = candidate("one", { dependsOn: ["two"] })
  const two = candidate("two", { dependsOn: ["three"] })
  const three = candidate("three")
  expect(chosenFrom([one, two, three], NOW, EVERY)?.slug).toBe("three")
})

test("a service naming a service that is nowhere is held back by nothing", () => {
  const one = candidate("one", { dependsOn: ["gone"] })
  expect(chosenFrom([one], NOW, EVERY)?.slug).toBe("one")
})

test("the service furthest behind is chosen", () => {
  const one = candidate("one", { deployedAt: NOW - 1000 })
  const two = candidate("two", { deployedAt: NOW - 50_000 })
  expect(chosenFrom([one, two], NOW, EVERY)?.slug).toBe("two")
})

test("a service never deployed is furthest behind of all", () => {
  const one = candidate("one", { deployedAt: NOW - 900_000 })
  const two = candidate("two", { deployedAt: null })
  expect(chosenFrom([one, two], NOW, EVERY)?.slug).toBe("two")
})

test("two services equally far behind are ordered by slug", () => {
  const one = candidate("beta", { deployedAt: NOW - 5000 })
  const two = candidate("alpha", { deployedAt: NOW - 5000 })
  expect(chosenFrom([one, two], NOW, EVERY)?.slug).toBe("alpha")
  expect(chosenFrom([two, one], NOW, EVERY)?.slug).toBe("alpha")
})

test("two services never deployed are ordered by slug", () => {
  const one = candidate("beta", { deployedAt: null })
  const two = candidate("alpha", { deployedAt: null })
  expect(chosenFrom([one, two], NOW, EVERY)?.slug).toBe("alpha")
})

test("a tick with nothing able chooses nothing", () => {
  expect(chosenFrom([], NOW, EVERY)).toBe(null)
})

test("a service behind the one chosen is never asked whether it wants a deploy", () => {
  const asked: string[] = []
  const wants: Wanting = (each) => {
    asked.push(each.slug)
    return true
  }
  const one = candidate("one", { deployedAt: NOW - 1000 })
  const two = candidate("two", { deployedAt: NOW - 50_000 })
  expect(chosenFrom([one, two], NOW, wants)?.slug).toBe("two")
  expect(asked).toEqual(["two"])
})

test("a service whose last deploy refused waits longer than its own cooldown", () => {
  const at = NOW - 120_000
  const one = candidate("one", { deployEndedAt: at, refusedAt: at, cooldownSeconds: 60 })
  expect(waitedBy(one)).toBe(REFUSAL_SECONDS)
  expect(cooledBy(one, NOW)).toBe(false)
  expect(cooledBy(one, NOW + REFUSAL_SECONDS * 1000)).toBe(true)
})

test("a service that refused before its last deploy waits out its own cooldown", () => {
  const one = candidate("one", {
    deployEndedAt: NOW - 61_000,
    refusedAt: NOW - 900_000,
    cooldownSeconds: 60,
  })
  expect(waitedBy(one)).toBe(60)
  expect(cooledBy(one, NOW)).toBe(true)
})

test("a service whose stated cooldown is longer than the wait after a refusal keeps its own", () => {
  const at = NOW - 1000
  const one = candidate("one", { deployEndedAt: at, refusedAt: at, cooldownSeconds: 86_400 })
  expect(waitedBy(one)).toBe(86_400)
})

test("the stated cooldown is a whole number of seconds above zero", () => {
  expect(Number.isInteger(COOLDOWN_SECONDS)).toBe(true)
  expect(COOLDOWN_SECONDS).toBeGreaterThan(0)
})
