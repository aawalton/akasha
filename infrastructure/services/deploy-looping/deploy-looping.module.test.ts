import { expect, test } from "bun:test"
import type { Candidate } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import {
  deployArgv,
  EVERY_KIND,
  kindIn,
  SCOPE_END,
  SCOPE_LEAD,
  saidOfNoKind,
  saidOfNothing,
  scopeFor,
} from "akasha/infrastructure/services/deploy-looping/deploy-looping.module.code.ts"
import { SERVING_MARKER } from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"

function candidate(slug: string): Candidate {
  return {
    slug,
    deploying: false,
    deployedAt: null,
    deployEndedAt: null,
    refusedAt: null,
    cooldownSeconds: 60,
    dependsOn: [],
  }
}

test("a scope is named for the service it puts up", () => {
  expect(scopeFor("temper-web")).toBe(`${SCOPE_LEAD}temper-web${SCOPE_END}`)
})

test("a deploy is run from the tree, under a scope of its own", () => {
  const argv = deployArgv(process.cwd(), "/tree", "temper-web")
  expect(argv).not.toHaveProperty("refused")
  const words = argv as readonly string[]
  expect(words).toContain(`--setenv=${SERVING_MARKER}=`)
  expect(words).toContain("--scope")
  expect(words).toContain(`--unit=${scopeFor("temper-web")}`)
  expect(words).toContain("deploy")
  expect(words).toContain("temper-web")
  expect(words.some((one) => one.startsWith("/tree/"))).toBe(true)
})

test("a tick putting nothing up says how many were weighed and how many were running", () => {
  const said = saidOfNothing("web-app", [candidate("one"), candidate("two")], new Set(["one"]))
  expect(said).toContain("web-app")
  expect(said).toContain("2 services")
  expect(said).toContain("1 with a deploy running")
})

test("a kind a deploy puts up is read off the call", () => {
  expect(kindIn("service-workstation")).toBe("service-workstation")
  expect(kindIn("web-app")).toBe("web-app")
})

test("a word that is no kind is read as none", () => {
  expect(kindIn("pages-service")).toBe(null)
  expect(kindIn(undefined)).toBe(null)
})

test("a call naming no kind is refused by naming every kind", () => {
  const said = saidOfNoKind("pages-service")
  expect(said).toContain("pages-service")
  for (const one of EVERY_KIND) expect(said).toContain(one)
})
