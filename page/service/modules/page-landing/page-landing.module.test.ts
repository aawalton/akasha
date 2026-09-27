import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { said as ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { stubFor } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import { landingsSaid } from "akasha/page/service/modules/hold-naming/hold-naming.module.code.ts"
import { landingThreadFor } from "akasha/page/service/modules/page-landing/page-landing.module.code.ts"
import {
  aFreshCrate,
  asking,
  CRATE_AT,
  cratesRoot,
  scratch,
  writing,
} from "akasha/page/service/modules/page-serving/page-serving.module.test-fixtures.ts"
import {
  apartFor,
  left,
} from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const RUNNING = join(ROOT, "page/service/page-service.service-workstation.running.code.ts")

async function bundled(): Promise<string> {
  const at = scratch.rootFor("akasha-page-landing-")
  const stub = join(at, "entry.ts")
  await Bun.write(stub, stubFor(RUNNING))
  const bundle = join(at, "bundle.js")
  ran(
    [
      process.execPath,
      "build",
      stub,
      "--target=bun",
      "--external=chromium-bidi",
      "--outfile",
      bundle,
    ],
    { cwd: ROOT }
  )
  return bundle
}

const root = cratesRoot()

const apart = apartFor(1)

const landing = landingThreadFor(root, apart, await bundled())

afterAll(async () => {
  await landing.stopped()
  scratch.sweep()
})

type Answered = { readonly status: number; readonly body: Record<string, unknown> }

async function answered(request: Request): Promise<Answered> {
  const sent = landing.answered(request)
  if (sent === null) throw new Error("a write was left to the thread that listens")
  const response = await sent
  return { status: response.status, body: (await response.json()) as Record<string, unknown> }
}

function crate(slug: string, title: string): Record<string, unknown> {
  return { ...aFreshCrate(title), slug }
}

test("a question, a read, a follow and a write by GET are left to the thread that listens", () => {
  expect(landing.answered(asking({}))).toBeNull()
  expect(landing.answered(asking({}, "/read"))).toBeNull()
  expect(landing.answered(asking({}, "/follow"))).toBeNull()
  expect(landing.answered(asking({}, "/write", "GET"))).toBeNull()
})

test("a page written through a landing thread started from the built bundle lands, minted by its generators", async () => {
  const said = await answered(writing({ pages: [aFreshCrate("first")] }))
  expect(said.status).toBe(200)
  expect(said.body.commit).toBe(gitIn(root, ["rev-parse", "HEAD"]).trim())
  expect(readFileSync(join(root, CRATE_AT), "utf8")).toMatch(/id: "01/)
  expect(landingsSaid(0, performance.now() + 1)).toContain("landing 1 write by Amy")
})

test("a write waits for a read in flight to change the checkout, and the writes arriving meanwhile land together unless one names a read", async () => {
  Atomics.store(apart, 1, 1)
  let done = false
  const first = answered(writing({ pages: [crate("two-crate", "two")] })).then((one) => {
    done = true
    return one
  })
  while (Atomics.load(apart, 0) === 0) await Bun.sleep(5)
  const head = gitIn(root, ["rev-parse", "HEAD"]).trim()
  const together = ["three", "four", "five"].map((one) =>
    answered(writing({ pages: [crate(`${one}-crate`, one)] }))
  )
  await Bun.sleep(500)
  const retitled = {
    pageTypeSlug: "crate",
    slug: "one-crate",
    values: { title: "again" },
    merge: true,
  }
  const alone = answered(writing({ pages: [retitled], read: head }))
  await Bun.sleep(500)
  expect(done).toBe(false)
  expect(existsSync(join(root, "akasha/crate/pages/two-crate.crate.ts"))).toBe(false)
  left(apart, 0)
  const said = await Promise.all([first, ...together, alone])
  expect(said.map((one) => one.status)).toEqual([200, 200, 200, 200, 200])
  const [two, three, four, five, read] = said.map((one) => one.body.commit)
  expect(four).toBe(three)
  expect(five).toBe(three)
  expect(three).not.toBe(two)
  expect(read).not.toBe(three)
  expect(Atomics.load(apart, 0)).toBe(0)
})
