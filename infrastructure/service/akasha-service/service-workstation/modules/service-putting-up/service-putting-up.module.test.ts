import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { kindPagesIn } from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import {
  PAGE_TYPE,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { readingEnded } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  TELLER_STEM,
  unitAt,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import {
  bundlingAmong,
  changedAmong,
  notPutUpAt,
  plannedEvery,
  restartedAmong,
  restartingAt,
  sharedUnitsIn,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-putting-up/service-putting-up.module.code.ts"
import { serviceTelling } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-telling/service-telling.module.ts"
import { TELLING_TEMPLATE } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { filedAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const HOME = "/home/one"

const BUNDLE = `${HOME}/.local/state/workstation-services/${TELLER_STEM}/${"a".repeat(40)}.js`

const WAS = "b".repeat(40)

const NOW = "c".repeat(40)

const STAGED = mkdtempSync("/var/tmp/service-putting-up-")

afterAll(() => rmSync(STAGED, { recursive: true, force: true }))

function unitNaming(slug: string, commit: string): undefined {
  const unit = unitAt(STAGED, slug)
  const at = `${STAGED}/.local/state/workstation-services/${slug}/${commit}.js`
  mkdirSync(dirname(unit), { recursive: true })
  writeFileSync(unit, `[Service]\nExecStart=/usr/bin/env bun ${at}\n`)
}

test("a service whose unit already names this commit is put up by nothing again", () => {
  unitNaming("up-to-date", NOW)
  unitNaming("behind", WAS)
  const found = notPutUpAt(new Set(["up-to-date", "behind"]), NOW, STAGED)
  expect([...found]).toEqual(["behind"])
})

test("a service whose unit names no bundle is one to put up", () => {
  expect([...notPutUpAt(new Set(["never-up"]), NOW, STAGED)]).toEqual(["never-up"])
})

test("a home nothing states leaves every service to be put up", () => {
  expect([...notPutUpAt(new Set(["behind"]), NOW, null)]).toEqual(["behind"])
})

function bundleHolding(slug: string, commit: string, text: string): string {
  const at = `${STAGED}/.local/state/workstation-services/${slug}/${commit}.js`
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
  return at
}

test("a service whose new bundle holds the bytes it runs now is restarted by nothing", () => {
  unitNaming("same", WAS)
  bundleHolding("same", WAS, "one\n")
  const fresh = bundleHolding("same", NOW, "one\n")
  expect([...changedAmong(new Set(["same"]), new Map([["same", fresh]]), STAGED)]).toEqual([])
})

test("a service whose new bundle holds other bytes is restarted", () => {
  unitNaming("moved", WAS)
  bundleHolding("moved", WAS, "one\n")
  const fresh = bundleHolding("moved", NOW, "two\n")
  expect([...changedAmong(new Set(["moved"]), new Map([["moved", fresh]]), STAGED)]).toEqual([
    "moved",
  ])
})

test("a service whose running bundle cannot be read is restarted", () => {
  unitNaming("lost", WAS)
  const fresh = bundleHolding("lost", NOW, "one\n")
  expect([...changedAmong(new Set(["lost"]), new Map([["lost", fresh]]), STAGED)]).toEqual(["lost"])
})

test("the teller every unit names on failing is among the units written", () => {
  const shared = sharedUnitsIn(ROOT)
  expect("refused" in shared).toBe(false)
  if ("refused" in shared) return
  expect(shared.get(TELLING_TEMPLATE)).toContain("ExecStart=/usr/bin/env bun ")
  expect(plannedEvery(ROOT).report).toContain(`write\t${TELLING_TEMPLATE}`)
})

test("the teller's unit names the bundle this call built, and the failed unit after it", () => {
  const shared = sharedUnitsIn(ROOT, "", new Map([[TELLER_STEM, BUNDLE]]))
  expect("refused" in shared).toBe(false)
  if ("refused" in shared) return
  expect(shared.get(TELLING_TEMPLATE)).toContain(`ExecStart=/usr/bin/env bun ${BUNDLE} %i`)
})

test("the teller is enabled by nothing, no service accounting for it", () => {
  const planned = plannedEvery(ROOT)
  expect("plan" in planned).toBe(true)
  if (!("plan" in planned)) return
  expect(planned.plan.enable).not.toContain(TELLING_TEMPLATE)
  expect(planned.plan.remove).not.toContain(TELLING_TEMPLATE)
})

test("a plan reaches every workstation service rather than one", () => {
  const planned = plannedEvery(ROOT)

  expect("plan" in planned).toBe(true)
  expect(planned.report[0]).toContain("service(s)")
})

test("a plan names a unit to write for more than one service", () => {
  const planned = plannedEvery(ROOT)

  expect(planned.report.filter((one) => one.startsWith("write\t")).length).toBeGreaterThan(1)
})

const CLOSURE: ReadonlySet<string> = new Set(["one/running.code.ts", "shared/used.ts"])

function changing(...paths: string[]): (was: string) => readonly string[] {
  return () => paths
}

test("a service no file of whose closure changed since its running bundle keeps that bundle", () => {
  unitNaming("still", WAS)
  const running = bundleHolding("still", WAS, "one\n")
  const sorted = bundlingAmong(new Map([["still", CLOSURE]]), STAGED, changing("other/one.ts"))
  expect([...sorted.again]).toEqual([])
  expect([...sorted.kept]).toEqual([["still", running]])
})

test("a service a file of whose closure changed since its running bundle is bundled again", () => {
  unitNaming("touched", WAS)
  bundleHolding("touched", WAS, "one\n")
  const sorted = bundlingAmong(new Map([["touched", CLOSURE]]), STAGED, changing("shared/used.ts"))
  expect([...sorted.again]).toEqual(["touched"])
  expect([...sorted.kept]).toEqual([])
})

test("what changed is asked since the commit the running bundle was built from", () => {
  unitNaming("asked", WAS)
  bundleHolding("asked", WAS, "one\n")
  const asked: string[] = []
  bundlingAmong(new Map([["asked", CLOSURE]]), STAGED, (was) => {
    asked.push(was)
    return []
  })
  expect(asked).toEqual([WAS])
})

test("a service with no running bundle is always bundled", () => {
  const sorted = bundlingAmong(new Map([["never-run", CLOSURE]]), STAGED, changing())
  expect([...sorted.again]).toEqual(["never-run"])
})

test("a service whose running bundle's file is missing is always bundled", () => {
  unitNaming("file-gone", WAS)
  const sorted = bundlingAmong(new Map([["file-gone", CLOSURE]]), STAGED, changing())
  expect([...sorted.again]).toEqual(["file-gone"])
})

test("a service whose running commit cannot be compared with the deploy commit is bundled", () => {
  unitNaming("unknown-commit", WAS)
  bundleHolding("unknown-commit", WAS, "one\n")
  const sorted = bundlingAmong(new Map([["unknown-commit", CLOSURE]]), STAGED, () => null)
  expect([...sorted.again]).toEqual(["unknown-commit"])
})

test("the teller keeps the bundle its template names where its closure did not change", () => {
  unitNaming(TELLER_STEM, WAS)
  const running = bundleHolding(TELLER_STEM, WAS, "one\n")
  const sorted = bundlingAmong(new Map([[TELLER_STEM, CLOSURE]]), STAGED, changing())
  expect([...sorted.kept]).toEqual([[TELLER_STEM, running]])
})

test("a service bundled again with other bytes is restarted though the deploy named it nowhere", () => {
  unitNaming("rebuilt-moved", WAS)
  bundleHolding("rebuilt-moved", WAS, "one\n")
  const fresh = bundleHolding("rebuilt-moved", NOW, "two\n")
  const bundles = new Map([["rebuilt-moved", fresh]])
  const found = restartedAmong(new Set(), new Set(["rebuilt-moved"]), bundles, STAGED)
  expect([...found]).toEqual(["rebuilt-moved"])
})

test("a service bundled again with the bytes it runs now is restarted by nothing", () => {
  unitNaming("rebuilt-same", WAS)
  bundleHolding("rebuilt-same", WAS, "one\n")
  const fresh = bundleHolding("rebuilt-same", NOW, "one\n")
  const bundles = new Map([["rebuilt-same", fresh]])
  expect([...restartedAmong(new Set(), new Set(["rebuilt-same"]), bundles, STAGED)]).toEqual([])
})

test("a service that may restart is one the deploy touched or one it will bundle again", () => {
  unitNaming("touched-behind", WAS)
  bundleHolding("touched-behind", WAS, "one\n")
  unitNaming("bundled-again", WAS)
  bundleHolding("bundled-again", WAS, "one\n")
  unitNaming("left-as-is", WAS)
  bundleHolding("left-as-is", WAS, "one\n")
  const closures = new Map([
    ["touched-behind", new Set(["touched/one.ts"])],
    ["bundled-again", new Set(["again/one.ts"])],
    ["left-as-is", new Set(["alone/one.ts"])],
  ])
  const touched = new Set(["touched-behind"])
  const found = restartingAt(touched, NOW, closures, changing("again/one.ts"), STAGED)
  expect([...found].sort()).toEqual(["bundled-again", "touched-behind"])
})

const scratch = scratchWorld()

afterAll(() => {
  readingEnded()
  scratch.sweep()
})

const HELD = "held"

const ARRIVED = "arrived"

const SLUG = "slug"

const ENDING = ".jsonl"

function listing(kind: string, slug: string, path: string, id: string): readonly [string, string] {
  const at = `${join(indexNamed(), filedAt(PAGE_TYPE, kind, SLUG, slug))}${ENDING}`
  return [at, `${JSON.stringify({ path, id })}\n`]
}

function serviceFiles(slug: string, id: string): ReadonlyMap<string, string> {
  const path = `services/${slug}/${slug}.${WORKSTATION_SERVICE}.ts`
  const body =
    `export const ${slug} = {\n` +
    `  id: "${id}",\n` +
    `  type: "${PAGE_TYPE}/${WORKSTATION_SERVICE}",\n` +
    `  slug: "${slug}",\n` +
    `  definition: "a service one commit holds",\n` +
    "  enabled: true,\n" +
    "} as const\n"
  return new Map([listing(WORKSTATION_SERVICE, slug, path, id), [path, body]])
}

function tellerFiles(): ReadonlyMap<string, string> {
  const path = `services/${serviceTelling.slug}/${serviceTelling.slug}.${module.slug}.ts`
  return new Map([listing(module.slug, serviceTelling.slug, path, serviceTelling.id)])
}

function written(root: string, files: ReadonlyMap<string, string>): undefined {
  for (const [path, body] of files) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
}

function pinnedBehind(root: string): string {
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  written(
    root,
    new Map([...serviceFiles(HELD, "01a0a000-0000-7000-8000-000000000001"), ...tellerFiles()])
  )
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", HELD])
  written(root, serviceFiles(ARRIVED, "01a0a000-0000-7000-8000-000000000002"))
  return git(root, ["rev-parse", "HEAD"]).trim()
}

function bundlesUnder(at: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const slug of [HELD, ARRIVED, TELLER_STEM]) {
    const bundle = join(at, slug, `${NOW}.js`)
    mkdirSync(dirname(bundle), { recursive: true })
    writeFileSync(bundle, slug)
    found.set(slug, bundle)
  }
  return found
}

test("a service page the checkout holds and the pinned commit does not is no service the plan puts up", () => {
  const root = scratch.rootFor("akasha-putting-up-pinned-")
  const commit = pinnedBehind(root)
  const bundles = bundlesUnder(scratch.rootFor("akasha-putting-up-bundles-"))
  const checkout = plannedEvery(root, new Set(), "", bundles)
  expect(checkout.report[0]).toBe(`${WORKSTATION_SERVICE}\t2 service(s)`)
  const planned = plannedEvery(pagesAt(root, commit), new Set(), "", bundles)
  expect(planned.report[0]).toBe(`${WORKSTATION_SERVICE}\t1 service(s)`)
  expect(planned.report.filter((one) => one.includes(ARRIVED))).toEqual([])
  expect(planned.report.some((one) => one.includes(HELD))).toBe(true)
})

test("a service page the checkout holds and the pinned commit does not is no service bundled", () => {
  const root = scratch.rootFor("akasha-putting-up-closures-")
  const commit = pinnedBehind(root)
  expect([...kindPagesIn(root, WORKSTATION_SERVICE).keys()]).toEqual([ARRIVED, HELD])
  expect([...kindPagesIn(pagesAt(root, commit), WORKSTATION_SERVICE).keys()]).toEqual([HELD])
})
