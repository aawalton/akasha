import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { resolve } from "node:path"
import type { Batch, CheckFailure, Tree, Was } from "../check-shape.ts"
import typecheck from "./typecheck.check.code.attachment.ts"

const SCRATCH = "/var/tmp"

const check = typecheck.run as (given: Batch, was: Was) => readonly CheckFailure[]

function run(given: Batch, before: Tree | null = null): readonly CheckFailure[] {
  return check(given, { before })
}

function treeOver(at: string, held: Readonly<Record<string, string>>): Tree {
  const bodies = new Map(Object.entries(held).map(([rel, text]): [string, string] => [resolve(at, rel), text]))
  return {
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
}

function batchOver(at: string, held: Readonly<Record<string, string>>, subjects: readonly string[]): Batch {
  const tree = treeOver(at, held)
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

test("a fault the change causes in a file it did not touch is reported", () => {
  planted((at) => {
    const before = treeOver(at, {
      "held.ts": 'export const held = "held"\n',
      "caller.ts": 'import { held } from "./held.ts"\nexport const seen = held\n',
    })
    const given = batchOver(
      at,
      {
        "held.ts": 'export const renamed = "held"\n',
        "caller.ts": 'import { held } from "./held.ts"\nexport const seen = held\n',
      },
      ["held.ts"]
    )
    const failures = run(given, before)
    expect(failures).toHaveLength(1)
    expect(failures[0]?.path).toBe(resolve(at, "caller.ts"))
    expect(failures[0]?.reason).toContain("TS2305")
  })
})

test("a fault already standing in a file the change did not touch is left where it was", () => {
  planted((at) => {
    const caller = 'import { held } from "./held.ts"\nexport const seen = held\nexport const n: number = "no"\n'
    const before = treeOver(at, { "held.ts": 'export const held = "held"\n', "caller.ts": caller })
    const given = batchOver(at, { "held.ts": 'export const held = "kept"\n', "caller.ts": caller }, ["held.ts"])
    expect(run(given, before)).toEqual([])
  })
})

test("a fault in a file more than one project reaches is one finding, not one for each", () => {
  planted((at) => {
    const project = (file: string): string =>
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
          module: "Preserve",
          moduleResolution: "Bundler",
          target: "ESNext",
          allowImportingTsExtensions: true,
          skipLibCheck: true,
          types: [],
        },
        files: [file],
      })
    const given = batchOver(
      at,
      {
        "one/tsconfig.json": project("own.ts"),
        "one/own.ts": 'import { shared } from "../shared/held.ts"\nexport const one = shared\n',
        "two/tsconfig.json": project("own.ts"),
        "two/own.ts": 'import { shared } from "../shared/held.ts"\nexport const two = shared\n',
        "shared/held.ts": 'export const shared = "shared"\nexport const n: number = "no"\n',
      },
      ["one/own.ts", "two/own.ts", "shared/held.ts"]
    )
    const failures = run(given)
    expect(failures).toHaveLength(1)
    expect(failures[0]?.path).toBe(resolve(at, "shared/held.ts"))
    expect(failures[0]?.reason).toContain("TS2322")
  })
})

test("two faults on one line are both reported, their messages telling them apart", () => {
  planted((at) => {
    const given = batchOver(at, { "both.ts": 'export const n: number = "no", s: string = 7\n' }, ["both.ts"])
    const failures = run(given)
    expect(failures).toHaveLength(2)
    expect(failures.map((one) => one.reason.startsWith("line 1: TS2322: "))).toEqual([true, true])
    expect(failures[0]?.reason).not.toBe(failures[1]?.reason)
  })
})

test("two faults on one line under one message are both reported, the column telling them apart", () => {
  planted((at) => {
    const given = batchOver(at, { "twice.ts": 'export const a: number = "x", b: number = "y"\n' }, ["twice.ts"])
    const failures = run(given)
    expect(failures).toHaveLength(2)
    expect(failures[0]?.path).toBe(resolve(at, "twice.ts"))
    expect(failures[1]?.path).toBe(resolve(at, "twice.ts"))
    expect(failures[0]?.reason).toBe(failures[1]?.reason)
    expect(failures[0]?.reason).toContain("TS2322")
  })
})
