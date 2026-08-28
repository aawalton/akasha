import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { resolve } from "node:path"
import type { Batch, CheckFailure, Tree } from "../check-shape.ts"
import typecheck from "./typecheck.check.code.attachment.ts"

const SCRATCH = "/var/tmp"

const run = typecheck.run as (given: Batch) => readonly CheckFailure[]

function batchOver(at: string, held: Readonly<Record<string, string>>, subjects: readonly string[]): Batch {
  const bodies = new Map(Object.entries(held).map(([rel, text]): [string, string] => [resolve(at, rel), text]))
  const tree: Tree = {
    root: at,
    paths: () => [...bodies.keys()],
    gone: () => [],
    goneElsewhere: () => [],
    repointedElsewhere: () => new Map(),
    dir: () => at,
    at: (path) => {
      const found = bodies.get(resolve(path))
      return found === undefined ? null : Buffer.from(found)
    },
  }
  return { root: at, paths: subjects.map((one) => resolve(at, one)), tree, keep: () => at }
}

function planted<T>(work: (at: string) => T): T {
  const at = mkdtempSync(`${SCRATCH}/typecheck-`)
  try {
    return work(at)
  } finally {
    rmSync(at, { recursive: true, force: true })
  }
}

test("a module the tree holds resolves though its directory is on no disk", () => {
  planted((at) => {
    const given = batchOver(
      at,
      {
        "one.ts": 'import { two } from "./made/two.ts"\nexport const one: string = two\n',
        "made/two.ts": 'export const two = "two"\n',
      },
      ["one.ts"]
    )
    expect(run(given)).toEqual([])
  })
})

test("a type that does not hold is reported against the file carrying it", () => {
  planted((at) => {
    const given = batchOver(at, { "bad.ts": "export const n: number = \"no\"\n" }, ["bad.ts"])
    const failures = run(given)
    expect(failures).toHaveLength(1)
    expect(failures[0]?.path).toBe(resolve(at, "bad.ts"))
    expect(failures[0]?.reason).toContain("TS2322")
  })
})

test("a fault standing in a file that imports what is judged is left to whoever touches it", () => {
  planted((at) => {
    const given = batchOver(
      at,
      {
        "held.ts": 'export const held = "held"\n',
        "caller.ts": 'import { held } from "./held.ts"\nexport const seen = held\nexport const n: number = "no"\n',
      },
      ["held.ts"]
    )
    expect(run(given)).toEqual([])
  })
})

test("a fault standing in a file that what is judged imports is left to whoever touches it", () => {
  planted((at) => {
    const given = batchOver(
      at,
      {
        "held.ts": 'import { under } from "./under.ts"\nexport const held = under\n',
        "under.ts": 'export const under = "under"\nexport const n: number = "no"\n',
      },
      ["held.ts"]
    )
    expect(run(given)).toEqual([])
  })
})

test("a fault a file in a cycle with what is judged carries is reported", () => {
  planted((at) => {
    const given = batchOver(
      at,
      {
        "held.ts": 'import { other } from "./other.ts"\nexport const held = "held"\nexport const seen = other\n',
        "other.ts": 'import { held } from "./held.ts"\nexport const other = held\nexport const n: number = "no"\n',
      },
      ["held.ts"]
    )
    const failures = run(given)
    expect(failures).toHaveLength(1)
    expect(failures[0]?.path).toBe(resolve(at, "other.ts"))
    expect(failures[0]?.reason).toContain("TS2322")
  })
})

test("a file the judged file breaks goes unreported, the program holding only what the judged file reaches", () => {
  planted((at) => {
    const given = batchOver(
      at,
      {
        "held.ts": 'export const held = "held"\n',
        "caller.ts": 'import { held } from "./held.ts"\nexport const n: number = held\n',
      },
      ["held.ts"]
    )
    expect(run(given)).toEqual([])
  })
})
