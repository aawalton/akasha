import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Judged, Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { module as modulePage } from "akasha/code/module/module.page-type.ts"
import {
  type Landed,
  landing,
  type Refused,
} from "akasha/command/modules/landing/landing.module.code.ts"
import {
  ADMITS,
  bytes,
  type Held,
  repoWith,
  rowsIn,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import {
  baseOf,
  changeOf,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import {
  AGAIN_JUDGED,
  judgedOnly,
} from "akasha/command/modules/landing-entangling/landing-entangling.module.code.ts"
import { reworked } from "akasha/command/modules/landing-reworking/landing-reworking.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

afterAll(scratch.sweep)

const TYPE_AT = "akasha/module.page-type.ts"

const SERVED_AT = "akasha/served.module.ts"

const USAGE_AT = "akasha/usage.module.ts"

const APART_AT = "akasha/apart.module.ts"

const EXPORTED =
  "export function groupServedBy(): number {\n  return 1\n}\n\nexport function kept(): number {\n  return 2\n}\n"

const UNEXPORTED =
  "function groupServedBy(): number {\n  return 1\n}\n\nexport function kept(): number {\n  return groupServedBy()\n}\n"

const IMPORTING =
  'import { groupServedBy } from "./served.module.ts"\n\nexport const usage = groupServedBy()\n'

const IMPORTING_KEPT = 'import { kept } from "./served.module.ts"\n\nexport const usage = kept()\n'

const APART = "export const apart = 1\n"

const IMPORTED = /import \{ (\w+) \} from "\.\/served\.module\.ts"/g

function unmet(change: Change): readonly Judged[] {
  const usage = textOf(change.after(USAGE_AT))
  if (usage === null) return []
  const exported = textOf(change.after(SERVED_AT)) ?? ""
  const named = [...usage.matchAll(IMPORTED)].map((one) => one[1] ?? "")
  return named
    .filter((one) => !exported.includes(`export function ${one}(`))
    .map((one) => ({ path: USAGE_AT, reason: `\`${one}\` is not exported from ${SERVED_AT}` }))
}

type Meanwhile = { readonly judging: Judging; readonly seen: () => number }

function meanwhile(root: string, held: readonly Held[]): Meanwhile {
  let seen = 0
  const over = async (change: Change): Promise<readonly Judged[]> => {
    seen += 1
    if (seen === 1) {
      const said = await landing(root, rowsIn(root, held), "landed meanwhile", ADMITS)
      if ("refusals" in said) throw new Error(said.refusals.join("; "))
    }
    return unmet(change)
  }
  return {
    judging: { named: ["meanwhile"], checksFor: () => ["meanwhile"], over },
    seen: () => seen,
  }
}

async function served(): Promise<string> {
  const typed = `export const held = ${JSON.stringify(modulePage, null, 2)}\n`
  const root = repoWith({ "seed.txt": "held", [TYPE_AT]: typed })
  listedFiled(root, slugOf(modulePage.type), modulePage.slug, [
    { path: TYPE_AT, id: modulePage.id },
  ])
  const said = await landing(
    root,
    rowsIn(root, [
      { path: SERVED_AT, body: bytes(EXPORTED) },
      { path: APART_AT, body: bytes(APART) },
    ]),
    "served",
    ADMITS
  )
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  return root
}

const saidIn = (said: Landed | Refused): string =>
  "refusals" in said ? said.refusals.join("\n") : ""

const lastSaid = (said: Landed | Refused): string | null =>
  "refusals" in said ? (said.refusals.at(-1) ?? null) : null

const unmetAtHead = (root: string): readonly Judged[] => unmet(changeOf(root, baseOf(root), []))

const servedOn = (root: string): string => readFileSync(join(root, SERVED_AT), "utf8")

const usageOn = (root: string): string | null => {
  const at = join(root, USAGE_AT)
  return existsSync(at) ? readFileSync(at, "utf8") : null
}

test("an export taken away is refused where an import of it landed after the check", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: USAGE_AT, body: bytes(IMPORTING) }])
  const rows = rowsIn(root, [{ path: SERVED_AT, body: bytes(UNEXPORTED) }])
  const said = await landing(root, rows, "unexported", held.judging)
  expect(lastSaid(said)).toBe(AGAIN_JUDGED)
  expect(saidIn(said)).toContain(USAGE_AT)
  expect("refusals" in said && said.moved).toBe(true)
  expect(servedOn(root)).toBe(EXPORTED)
  expect(unmetAtHead(root)).toEqual([])
})

test("an import checked before its export was taken away is refused", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: SERVED_AT, body: bytes(UNEXPORTED) }])
  const rows = rowsIn(root, [{ path: USAGE_AT, body: bytes(IMPORTING) }])
  const said = await landing(root, rows, "imported", held.judging)
  expect(lastSaid(said)).toBe(AGAIN_JUDGED)
  expect(saidIn(said)).toContain(USAGE_AT)
  expect(usageOn(root)).toBeNull()
  expect(unmetAtHead(root)).toEqual([])
})

test("an import checked before the file it names was taken away is refused", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: SERVED_AT, body: null }])
  const rows = rowsIn(root, [{ path: USAGE_AT, body: bytes(IMPORTING) }])
  const said = await landing(root, rows, "imported", held.judging)
  expect(lastSaid(said)).toBe(AGAIN_JUDGED)
  expect(usageOn(root)).toBeNull()
})

test("a file taken away is refused where an import of it landed after the check", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: USAGE_AT, body: bytes(IMPORTING) }])
  const rows = rowsIn(root, [{ path: SERVED_AT, body: null }])
  const said = await landing(root, rows, "gone", held.judging)
  expect(saidIn(said)).toContain(USAGE_AT)
  expect(servedOn(root)).toBe(EXPORTED)
})

test("a landing meanwhile that no file of this change reaches is not judged again", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: APART_AT, body: bytes("export const apart = 2\n") }])
  const rows = rowsIn(root, [{ path: USAGE_AT, body: bytes(IMPORTING) }])
  const said = await landing(root, rows, "imported", held.judging)
  expect(saidIn(said)).toBe("")
  expect(held.seen()).toBe(1)
  expect(usageOn(root)).toBe(IMPORTING)
})

test("a file importing both what moved and what the change touches judges nothing again", async () => {
  const root = await served()
  const hub =
    'import { apart } from "./apart.module.ts"\nimport { kept } from "./served.module.ts"\n\nexport const hub = apart + kept()\n'
  await landing(
    root,
    rowsIn(root, [{ path: "akasha/hub.module.ts", body: bytes(hub) }]),
    "hub",
    ADMITS
  )
  const held = meanwhile(root, [{ path: APART_AT, body: bytes("export const apart = 2\n") }])
  const rows = rowsIn(root, [{ path: SERVED_AT, body: bytes(UNEXPORTED) }])
  const said = await landing(root, rows, "unexported", held.judging)
  expect(saidIn(said)).toBe("")
  expect(held.seen()).toBe(1)
  expect(servedOn(root)).toBe(UNEXPORTED)
})

type Worked = { readonly changes: ReturnType<typeof rowsIn>; readonly facing: null }

async function reworking(
  root: string,
  held: readonly Held[],
  judging: Judging
): Promise<Landed | Refused> {
  const prepare = (): Worked => ({ changes: rowsIn(root, held), facing: null })
  const landedOn = (_at: string, over: Worked): Promise<Landed | Refused> =>
    landing(root, over.changes, "reworked", judging)
  const head = baseOf(root)
  const prepared = prepare()
  const first = { head, prepared, ended: await landedOn(head, prepared) }
  return (await reworked(root, first, prepare, landedOn)).ended
}

test("a change refused over a landing meanwhile is judged again against HEAD", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: SERVED_AT, body: bytes(UNEXPORTED) }])
  const said = await reworking(root, [{ path: USAGE_AT, body: bytes(IMPORTING) }], held.judging)
  expect(held.seen()).toBe(2)
  expect(saidIn(said)).toContain(`${USAGE_AT} — \`groupServedBy\` is not exported`)
  expect(usageOn(root)).toBeNull()
})

test("a change judged again against HEAD that still holds lands", async () => {
  const root = await served()
  const held = meanwhile(root, [{ path: SERVED_AT, body: bytes(UNEXPORTED) }])
  const said = await reworking(
    root,
    [{ path: USAGE_AT, body: bytes(IMPORTING_KEPT) }],
    held.judging
  )
  expect(held.seen()).toBe(2)
  expect(saidIn(said)).toBe("")
  expect(usageOn(root)).toBe(IMPORTING_KEPT)
})

test("only a refusal over nothing but a HEAD that moved under the checks is judged again", () => {
  expect(judgedOnly(["moved", AGAIN_JUDGED])).toBe(true)
  expect(judgedOnly(["moved"])).toBe(false)
  expect(judgedOnly(["moved", "other", AGAIN_JUDGED])).toBe(false)
})
