import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { outwardOf, targetOf } from "./imports.ts"

const SCRATCH = "/var/tmp"

function root(manifests: Readonly<Record<string, unknown>>): string {
  const at = mkdtempSync(`${SCRATCH}/imports-`)
  for (const [key, held] of Object.entries(manifests)) {
    const cut = key.lastIndexOf("/")
    if (cut !== -1) mkdirSync(`${at}/${key.slice(0, cut)}`, { recursive: true })
    writeFileSync(`${at}/${key}`, JSON.stringify(held))
  }
  return at
}

const TREE = {
  "package.json": { workspaces: ["packages/*"] },
  "packages/page/package.json": { name: "@akasha/page", exports: { "./*": "./src/*.ts" } },
}

function planted<T>(work: (at: string) => T): T {
  const at = root(TREE)
  try {
    return work(at)
  } finally {
    rmSync(at, { recursive: true, force: true })
  }
}

test("a relative specifier resolves against the importing file", () => {
  planted((at) => {
    expect(targetOf(at, `${at}/checks/one.ts`, "../page/text.ts")).toBe(`${at}/page/text/text.ts`)
  })
})

test("an absolute specifier is its own target", () => {
  planted((at) => {
    expect(targetOf(at, `${at}/checks/one.ts`, "/etc/hosts")).toBe("/etc/hosts")
  })
})

test("a workspace specifier resolves into the package", () => {
  planted((at) => {
    expect(targetOf(at, `${at}/checks/one.ts`, "@akasha/page/text")).toBe(
      `${at}/packages/page/src/text.ts`
    )
  })
})

test("a node builtin has no target", () => {
  planted((at) => {
    expect(targetOf(at, `${at}/checks/one.ts`, "node:path")).toBeNull()
  })
})

test("a third-party specifier has no target", () => {
  planted((at) => {
    expect(targetOf(at, `${at}/checks/one.ts`, "zod")).toBeNull()
  })
})

test("a specifier reaching past the root is outward", () => {
  planted((at) => {
    expect(outwardOf(at, `${at}/checks/one.ts`, "../../elsewhere/thing.ts")).toBe(
      "../elsewhere/thing.ts"
    )
  })
})

test("a workspace specifier is never outward", () => {
  planted((at) => {
    expect(outwardOf(at, `${at}/checks/one.ts`, "@akasha/page/text")).toBeNull()
  })
})

test("a third-party specifier is never outward", () => {
  planted((at) => {
    expect(outwardOf(at, `${at}/checks/one.ts`, "zod")).toBeNull()
  })
})
