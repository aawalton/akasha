import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { noImportersFiled } from "@akasha/indexes/testing"
import { said as gitSaid } from "../../../git/running/git-running.module.code.ts"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import type { Running } from "../drafting/drafting.module.code.ts"
import { landing } from "../landing/landing.module.code.ts"
import {
  A,
  ADMITS,
  bytes,
  CARRIED,
  PAGE,
  pagesRepo,
  REFUSES,
  repoWith,
  rowsIn,
  scratch,
} from "../landing/landing.module.test-fixtures.ts"
import { readingIn } from "../reading/reading.module.code.ts"
import { applied, askedIn, type Carried, messageFor } from "./applying.module.code.ts"

const HELD = { was: null, body: null, readersOweReading: true }

const AGENT = "01a05f00-0000-7000-8000-000000000001"

const MORE = `${A}// drafted\n`

const OWES: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

function carrying(body: string, running: Running = OWES, owed?: boolean): Carried {
  return {
    held: new Map([
      [
        PAGE,
        {
          was: bytes(A),
          body: bytes(body),
          ...(owed === undefined ? {} : { readersOweReading: owed }),
        },
      ],
    ]),
    running,
  }
}

afterAll(() => {
  scratch.sweep()
})

async function indexed(): Promise<string> {
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, rowsIn(root, CARRIED), "held", ADMITS)
  noImportersFiled(root)
  await landing(root, rowsIn(root, [{ path: PAGE, body: bytes(A) }]), "held", ADMITS)
  return root
}

function headOid(root: string, path: string): string {
  return gitSaid(root, ["rev-parse", `HEAD:${path}`]).trim()
}

test("an apply takes a measure beside its message, and refuses any other key", () => {
  expect(askedIn({})).toEqual({ message: null, glass: null, measure: false })
  expect(askedIn({ measure: "true" })).toEqual({ message: null, glass: null, measure: true })
  expect(askedIn({ held: "1" })).toEqual({
    refusals: ["`held` is no argument an apply takes"],
  })
})

test("a measure saying anything but true is refused", () => {
  expect(askedIn({ measure: "yes" })).toEqual({
    refusals: ["`measure` takes `true`, and this one says something else"],
  })
})

test("an apply given no message says the act and the paths that apply lands", () => {
  const held = new Map([
    ["akasha/two.ts", HELD],
    ["akasha/one.ts", HELD],
  ])
  expect(messageFor(null, held)).toBe("apply akasha/one.ts, akasha/two.ts")
})

test("an apply carrying more than three paths says the act and how many landed", () => {
  const named = ["a.ts", "b.ts", "c.ts", "d.ts"]
  expect(messageFor(null, new Map(named.map((one) => [one, HELD])))).toBe("apply 4 files")
})

test("an apply given a message commits that message rather than a composed one", () => {
  expect(messageFor("held", new Map([["akasha/one.ts", HELD]]))).toBe("held")
})

test("an apply lands the bodies handed in, names and records them, and moves a path", async () => {
  const root = await indexed()
  writeFileSync(join(root, "held.uncommitted.ts"), "unsaid")
  const moves = [{ from: "held.uncommitted.ts", to: "deep/held.uncommitted.ts" }]
  const said = await applied(root, AGENT, "applied", ADMITS, null, moves, carrying(MORE))
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(MORE)
  expect(said.formatted).toEqual([])
  expect(said.landed).toEqual([PAGE])
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
  expect(readFileSync(join(root, "deep/held.uncommitted.ts"), "utf8")).toBe("unsaid")
  expect(existsSync(join(root, "held.uncommitted.ts"))).toBe(false)
})

test("an apply handed no bodies is nothing to apply", async () => {
  const said = await applied("/nowhere", AGENT, "applied", ADMITS, null, [], null)
  expect("refusals" in said).toBe(true)
})

test("an apply the gate refused leaves the body as it was and records the reading", async () => {
  const root = pagesRepo()
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
  const said = await applied(root, AGENT, "applied", REFUSES, null, [], carrying(MORE))
  expect("refusals" in said).toBe(true)
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(A)
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
})

test("a change carrying a conflict does not apply", async () => {
  const root = pagesRepo()
  const marked = `${A}${CLASH_MARK}\nheld\n`
  const said = await applied(root, AGENT, "applied", ADMITS, null, [], carrying(marked))
  expect(said).toEqual({
    refusals: [
      `${PAGE} — the change carries a conflict here`,
      "nothing was applied — a change carrying a conflict does not apply",
    ],
  })
})

test("a path the change moved under has no reading recorded", async () => {
  const root = pagesRepo()
  writeFileSync(join(root, PAGE), `// first\n${A}`)
  gitSaid(root, ["add", "--", PAGE])
  gitSaid(root, ["commit", "-q", "-m", "moved", "--", PAGE])
  await applied(root, AGENT, "applied", REFUSES, null, [], carrying(MORE))
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
})

const UNEXPORTABLE_AT = "akasha/2026-08-20.domain.ts"

const UNEXPORTABLE =
  "export const held = {\n" +
  '  id: "01a04e11-0000-7000-8000-000000000031",\n' +
  '  pageTypeSlug: "domain",\n' +
  '  slug: "2026-08-20",\n' +
  "}\n"

test("an apply refuses a page whose slug names no export", async () => {
  const root = pagesRepo()
  const held = new Map([[UNEXPORTABLE_AT, { was: null, body: bytes(UNEXPORTABLE) }]])
  const said = await applied(root, AGENT, "applied", ADMITS, null, [], { held, running: OWES })
  if (!("refusals" in said)) throw new Error("the apply landed a page naming no export")
  expect(said.refusals.join("\n")).toContain("which no `export const` may be declared under")
  expect(existsSync(join(root, UNEXPORTABLE_AT))).toBe(false)
})
