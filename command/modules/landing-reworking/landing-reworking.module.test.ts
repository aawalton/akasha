import { afterAll, expect, test } from "bun:test"
import { appendFileSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  AGAIN_WORKED,
  workedOnly,
} from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import {
  AGAIN_WRITTEN,
  type Landed,
  landing,
  type Refused,
} from "akasha/command/modules/landing/landing.module.code.ts"
import {
  bytes,
  git,
  repoWith,
  rowsIn,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import {
  REWORKED_AT_MOST,
  reworked,
} from "akasha/command/modules/landing-reworking/landing-reworking.module.code.ts"
import type { Facing } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

afterAll(scratch.sweep)

const MADE_AT = "one.thing.refs.jsonl"

const OWN_AT = "held.txt"

const REFS_AT = "refs.file-property.ts"

const OWN = "written by the agent\n"

function facingOf(root: string): Facing {
  return {
    kindsUnder: (of) => (of === "file-property" ? ["file-property"] : []),
    everyOfType: (kind) => (kind === "file-property" ? [{ path: REFS_AT }] : []),
    valueAt: (path) => (path === REFS_AT ? { propertySlug: "refs", generated: true } : null),
    carryingOf: (named) =>
      named === "file-property/refs"
        ? { carrying: [{ pageTypeSlug: "thing", path: "one.thing.ts", id: "held", within: null }] }
        : { refused: "no page property carries that slug" },
    root,
  }
}

function movedBy(root: string, paths: readonly string[], row: string): undefined {
  for (const one of paths) appendFileSync(join(root, one), row)
  git(root, ["commit", "--quiet", "-am", "meanwhile"])
}

type Moving = { readonly judging: Judging; readonly seen: () => number }

function moving(root: string, times: number, paths: readonly string[]): Moving {
  let seen = 0
  const over = async (): Promise<readonly []> => {
    seen += 1
    if (seen <= times) movedBy(root, paths, `landed meanwhile ${seen}\n`)
    return []
  }
  return {
    judging: { named: ["meanwhile"], checksFor: () => ["meanwhile"], over },
    seen: () => seen,
  }
}

type Worked = { readonly changes: ReturnType<typeof rowsIn>; readonly facing: Facing }

function preparedAt(root: string): (head: string) => Worked {
  return (head) => ({
    changes: rowsIn(root, [
      { path: MADE_AT, body: bytes(`${git(root, ["show", `${head}:${MADE_AT}`])}row\n`) },
      { path: OWN_AT, body: bytes(OWN) },
    ]),
    facing: facingOf(root),
  })
}

async function reworking(
  root: string,
  judging: Judging,
  most?: number,
  between: () => undefined = () => undefined
): Promise<Landed | Refused> {
  const prepare = preparedAt(root)
  const landedOn = async (at: string, over: Worked): Promise<Landed | Refused> => {
    const ended = await landing(
      root,
      over.changes,
      "held",
      judging,
      null,
      at,
      [],
      null,
      null,
      [],
      null,
      over.facing
    )
    between()
    return ended
  }
  const head = baseOf(root)
  const prepared = prepare(head)
  const first = { head, prepared, ended: await landedOn(head, prepared) }
  return (await reworked(root, first, prepare, landedOn, most)).ended
}

const fresh = (): string => repoWith({ [MADE_AT]: "first row\n", [OWN_AT]: "first\n" })

const refusalsOf = (said: Landed | Refused): readonly string[] =>
  "refusals" in said ? said.refusals : []

const bodyAt = (root: string, path: string): string => readFileSync(join(root, path), "utf8")

test("a body a machine generates that moved under the apply is worked out again and lands", async () => {
  const root = fresh()
  const held = moving(root, 2, [MADE_AT])
  const said = await reworking(root, held.judging)
  expect(refusalsOf(said)).toEqual([])
  expect(held.seen()).toBe(3)
  expect(bodyAt(root, MADE_AT)).toBe("first row\nlanded meanwhile 1\nlanded meanwhile 2\nrow\n")
  expect(bodyAt(root, OWN_AT)).toBe(OWN)
})

test("a path holding the agent's edit that moved is refused at once and not written over", async () => {
  const root = fresh()
  const held = moving(root, 1, [OWN_AT, MADE_AT])
  const said = await reworking(root, held.judging)
  expect(refusalsOf(said)).toContain(AGAIN_WRITTEN)
  expect(held.seen()).toBe(1)
  expect(bodyAt(root, OWN_AT)).toBe("first\nlanded meanwhile 1\n")
})

test("a path holding the agent's edit that moved between landings refuses the next landing", async () => {
  const root = fresh()
  const held = moving(root, 1, [MADE_AT])
  let once = true
  const between = (): undefined => {
    if (once) movedBy(root, [OWN_AT], "moved between landings\n")
    once = false
  }
  const said = await reworking(root, held.judging, undefined, between)
  expect(refusalsOf(said)).toContain(AGAIN_WRITTEN)
  expect(refusalsOf(said)[0]).toContain(OWN_AT)
  expect(held.seen()).toBe(1)
  expect(bodyAt(root, OWN_AT)).toBe("first\nmoved between landings\n")
})

test("a body a machine generates that keeps moving is worked out again only up to the bound", async () => {
  const root = fresh()
  const held = moving(root, Number.POSITIVE_INFINITY, [MADE_AT])
  const said = await reworking(root, held.judging)
  expect(held.seen()).toBe(REWORKED_AT_MOST + 1)
  expect(refusalsOf(said).at(-1)).toBe(AGAIN_WORKED)
  expect(workedOnly(refusalsOf(said))).toBe(true)
  expect(bodyAt(root, OWN_AT)).toBe("first\n")
}, 60000)

test("a landing allowed no working out again lands once", async () => {
  const root = fresh()
  const held = moving(root, 1, [MADE_AT])
  const said = await reworking(root, held.judging, 0)
  expect(held.seen()).toBe(1)
  expect(workedOnly(refusalsOf(said))).toBe(true)
})

test("only a refusal over nothing but bodies a machine generates is worked out again", () => {
  expect(workedOnly(["moved", AGAIN_WORKED])).toBe(true)
  expect(workedOnly(["moved", AGAIN_WRITTEN, AGAIN_WORKED])).toBe(false)
  expect(workedOnly(["moved", AGAIN_WRITTEN])).toBe(false)
})
