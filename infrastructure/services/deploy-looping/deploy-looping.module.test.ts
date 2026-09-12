import { expect, test } from "bun:test"
import type { Candidate } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import {
  deployArgv,
  deployingIn,
  SCOPE_END,
  SCOPE_LEAD,
  saidOfNothing,
  scopeFor,
  slugIn,
} from "akasha/infrastructure/services/deploy-looping/deploy-looping.module.code.ts"

function candidate(slug: string, wants: boolean): Candidate {
  return {
    slug,
    wants,
    deploying: false,
    deployedAt: null,
    deployEndedAt: null,
    cooldownSeconds: 60,
    dependsOn: [],
  }
}

test("a scope is named for the service it puts up", () => {
  expect(scopeFor("temper-web")).toBe(`${SCOPE_LEAD}temper-web${SCOPE_END}`)
})

test("a scope's name says which service it puts up", () => {
  expect(slugIn(scopeFor("temper-web"))).toBe("temper-web")
})

test("a unit that is no deploy scope names no service", () => {
  expect(slugIn("pages-service.service")).toBe(null)
  expect(slugIn(`${SCOPE_LEAD}${SCOPE_END}`)).toBe(null)
})

test("the running deploys are read off the listing", () => {
  const out = [
    `${SCOPE_LEAD}temper-web${SCOPE_END} loaded active running /usr/bin/bun`,
    `${SCOPE_LEAD}service-workstation${SCOPE_END} loaded active running /usr/bin/bun`,
    "session-2.scope loaded active running Session 2",
  ].join("\n")
  expect([...deployingIn(out)].sort()).toEqual(["service-workstation", "temper-web"])
})

test("a listing with nothing in it names no running deploy", () => {
  expect(deployingIn("").size).toBe(0)
})

test("a deploy is run from the tree, under a scope of its own", () => {
  const argv = deployArgv(process.cwd(), "/tree", "temper-web")
  expect(argv).not.toHaveProperty("refused")
  const words = argv as readonly string[]
  expect(words).toContain("--scope")
  expect(words).toContain(`--unit=${scopeFor("temper-web")}`)
  expect(words).toContain("deploy")
  expect(words).toContain("temper-web")
  expect(words.some((one) => one.startsWith("/tree/"))).toBe(true)
})

test("a tick putting nothing up says how many wanted one and how many were running", () => {
  const said = saidOfNothing(
    "web-app",
    [candidate("one", true), candidate("two", false)],
    new Set(["one"])
  )
  expect(said).toContain("web-app")
  expect(said).toContain("1 service")
  expect(said).toContain("of 2")
  expect(said).toContain("1 already")
})
