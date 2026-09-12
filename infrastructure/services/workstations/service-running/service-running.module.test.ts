import { expect, test } from "bun:test"
import { runService } from "akasha/infrastructure/services/workstations/pages/sweep-log-days.service-workstation.running.code.ts"
import {
  noService,
  provingFor,
  reachedFor,
  runNamedService,
} from "akasha/infrastructure/services/workstations/service-running/service-running.module.code.ts"
import { checkoutHere } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const ROOT = process.cwd()

const SLUG = "sweep-log-days"

const NO_SLUG = "a-service-no-page-carries"

const NOWHERE = "/var/empty/no-checkout-sits-here"

const REFUSED_EXIT = 2

test("the checkout this module sits in is one the running code sits under, so a pinned copy runs its own", async () => {
  const reached = await reachedFor(ROOT, SLUG, checkoutHere())
  expect("running" in reached).toBe(true)
})

test("a slug no workstation service carries is unnamed rather than refused", async () => {
  expect(await reachedFor(ROOT, NO_SLUG)).toEqual({ unnamed: noService(NO_SLUG) })
})

test("a service is reached through its slug alone, with no path said anywhere", async () => {
  const reached = await reachedFor(ROOT, SLUG)
  expect("running" in reached).toBe(true)
})

test("the run reached is the one the file beside that service's page exports", async () => {
  const reached = await reachedFor(ROOT, SLUG)
  expect("running" in reached ? reached.running : null).toBe(runService)
})

test("the code is taken from the checkout named rather than the one the pages are read under", async () => {
  const reached = await reachedFor(ROOT, SLUG, NOWHERE)
  expect("refused" in reached ? reached.refused : "").toContain(NOWHERE)
})

test("the test proving a service runs is the one beside that service's page", () => {
  const found = provingFor(ROOT, [SLUG])[0] ?? ""
  expect(found).toContain(`${SLUG}.service-workstation.running.test.ts`)
})

test("a slug no workstation service carries is answered for by no test", () => {
  expect(provingFor(ROOT, [NO_SLUG])).toEqual([])
})

test("a run naming no service is refused rather than running something", async () => {
  expect(await runNamedService([])).toBe(REFUSED_EXIT)
})

test("a run naming a slug no service carries is refused", async () => {
  expect(await runNamedService([NO_SLUG])).toBe(REFUSED_EXIT)
})
