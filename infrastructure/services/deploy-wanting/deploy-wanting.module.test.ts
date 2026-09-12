import { expect, test } from "bun:test"
import { readingAt } from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"
import { COOLDOWN_SECONDS } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import type { Subject } from "akasha/infrastructure/services/deploy-subject-listing/deploy-subject-listing.module.code.ts"
import {
  changingIn,
  committedAt,
  readAs,
  wantsIn,
} from "akasha/infrastructure/services/deploy-wanting/deploy-wanting.module.code.ts"

const ROOT = process.cwd()

const NOWHERE = "0000000000000000000000000000000000000000"

function subject(kind: Subject["kind"], slug: string): Subject {
  return {
    kind,
    slug,
    pagePath: `${slug}.${kind}.ts`,
    cooldownSeconds: COOLDOWN_SECONDS,
    deploysAfter: [],
  }
}

test("the workstation kind is read as the whole kind", () => {
  expect(readAs(subject("service-workstation", "service-workstation")).every).toBe(true)
})

test("every other kind is read as the one page", () => {
  expect(readAs(subject("web-app", "temper-web")).every).toBe(undefined)
})

test("a commit git names no moment for has no moment", () => {
  expect(committedAt(ROOT, NOWHERE)).toBe(null)
})

test("a commit git resolves has the moment it was made", () => {
  const at = committedAt(ROOT, "HEAD")
  expect(at).not.toBe(null)
  expect(at as number).toBeGreaterThan(0)
})

test("a service nothing has put up wants a deploy", () => {
  const one = subject("web-app", "temper-web")
  expect(wantsIn(ROOT, one, null, readingAt(ROOT, "HEAD"), changingIn(ROOT, "HEAD"))).toBe(true)
})

test("a service put up at the same commit wants nothing", () => {
  const one = subject("web-app", "temper-web")
  expect(wantsIn(ROOT, one, "HEAD", readingAt(ROOT, "HEAD"), changingIn(ROOT, "HEAD"))).toBe(false)
})

test("one commit's diff is asked of git once however many services were put up at it", () => {
  const changing = changingIn(ROOT, "HEAD")
  expect(changing("HEAD")).toBe(changing("HEAD"))
})
