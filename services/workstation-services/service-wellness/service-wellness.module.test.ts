import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { uncommittedAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import type { Health } from "akasha/services/workstation-services/service-health/service-health.module.code.ts"
import {
  keepVerdicts,
  LOOKED_AT,
  looked,
  WELL,
} from "akasha/services/workstation-services/service-wellness/service-wellness.module.code.ts"

const PAGE = "pages/held-service.workstation-service.ts"

const WATCHER = "pages/held-watcher.workstation-service.ts"

const AT = "2026-09-10T00:00:00.000Z"

const LATER = "2026-09-10T00:01:00.000Z"

const BROKE: Health = {
  slug: "held-service",
  unit: "held-service.service",
  pagePath: PAGE,
  broken: "held-service.service failed, and systemd says `exit-code`",
}

const MENDED: Health = { ...BROKE, broken: null }

const WATCHING: Health = {
  slug: "held-watcher",
  unit: "held-watcher.service",
  pagePath: WATCHER,
  broken: null,
}

function pageAt(root: string, path: string): undefined {
  writeFileSync(join(root, path), 'export const held = { slug: "held" } as const\n')
}

function rooted(): string {
  const root = mkdtempSync("/var/tmp/service-wellness-")
  mkdirSync(join(root, "pages"), { recursive: true })
  pageAt(root, PAGE)
  pageAt(root, WATCHER)
  return root
}

function besideAt(root: string, path: string): string {
  return join(root, uncommittedAt(path) ?? path)
}

test("a service found well carries a verdict saying so, and no moment of its own", () => {
  const root = rooted()
  expect(keepVerdicts(root, [MENDED])).toEqual(["held-service"])
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true })
  rmSync(root, { recursive: true, force: true })
})

test("a service found broken carries a verdict saying it is not well", () => {
  const root = rooted()
  keepVerdicts(root, [BROKE])
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: false })
  rmSync(root, { recursive: true, force: true })
})

test("a service no look reached carries no verdict rather than one saying broken", () => {
  const root = rooted()
  keepVerdicts(root, [])
  expect(uncommittedIn(root, PAGE)).toBe(null)
  rmSync(root, { recursive: true, force: true })
})

test("a verdict that has not changed is not written again", () => {
  const root = rooted()
  keepVerdicts(root, [MENDED])
  const beat = statSync(besideAt(root, PAGE)).mtimeMs
  expect(keepVerdicts(root, [MENDED])).toEqual([])
  expect(keepVerdicts(root, [MENDED])).toEqual([])
  expect(statSync(besideAt(root, PAGE)).mtimeMs).toBe(beat)
  rmSync(root, { recursive: true, force: true })
})

test("a verdict that has changed replaces the verdict before it", () => {
  const root = rooted()
  keepVerdicts(root, [BROKE])
  expect(keepVerdicts(root, [MENDED])).toEqual(["held-service"])
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true })
  rmSync(root, { recursive: true, force: true })
})

test("a verdict cleared away is written again by the next look", () => {
  const root = rooted()
  keepVerdicts(root, [MENDED])
  rmSync(besideAt(root, PAGE))
  expect(keepVerdicts(root, [MENDED])).toEqual(["held-service"])
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true })
  rmSync(root, { recursive: true, force: true })
})

test("one look leaves one moment, on the page of the service that did the looking", () => {
  const root = rooted()
  looked(root, [MENDED, WATCHING], AT, "held-watcher")
  expect(uncommittedIn(root, WATCHER)).toEqual({ [WELL]: true, [LOOKED_AT]: AT })
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true })
  rmSync(root, { recursive: true, force: true })
})

test("the moment moves on every look, whether or not any verdict changed", () => {
  const root = rooted()
  looked(root, [MENDED, WATCHING], AT, "held-watcher")
  const beat = statSync(besideAt(root, PAGE)).mtimeMs
  expect(looked(root, [MENDED, WATCHING], LATER, "held-watcher")).toEqual([])
  expect(uncommittedIn(root, WATCHER)).toEqual({ [WELL]: true, [LOOKED_AT]: LATER })
  expect(statSync(besideAt(root, PAGE)).mtimeMs).toBe(beat)
  rmSync(root, { recursive: true, force: true })
})

test("a look finding its own page nowhere leaves no moment rather than leaving one", () => {
  const root = rooted()
  looked(root, [MENDED], AT, "held-watcher")
  expect(uncommittedIn(root, WATCHER)).toBe(null)
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true })
  rmSync(root, { recursive: true, force: true })
})
