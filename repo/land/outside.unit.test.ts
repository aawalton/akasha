import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { removeOutside } from "./outside.ts"

const SCRATCH = "/var/tmp"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function loosePath(): string {
  const dir = mkdtempSync(`${SCRATCH}/land-outside-`)
  made.push(dir)
  return `${dir}/gone.txt`
}

function said(run: () => void): string {
  const held = process.stdout.write.bind(process.stdout)
  let out = ""
  process.stdout.write = ((text: string) => {
    out += text
    return true
  }) as typeof process.stdout.write
  try {
    run()
  } finally {
    process.stdout.write = held
  }
  return out
}

test("a dry run outside every repo says what would go and leaves it standing", () => {
  const at = loosePath()
  writeFileSync(at, "probe\n")
  const out = said(() => removeOutside([at], true))
  expect(out).toContain("write:  dry-run — 1 file(s) would be removed outside every repo")
  expect(out).toContain(`${at}  6 → gone`)
  expect(existsSync(at)).toBe(true)
})

test("a removal outside every repo takes the file and commits nothing", () => {
  const at = loosePath()
  writeFileSync(at, "probe\n")
  const out = said(() => removeOutside([at], false))
  expect(out).toContain("write:  1 file(s) removed outside every repo")
  expect(out).toContain(`${at}  6 → gone`)
  expect(out).toContain("commit: none — no repo holds these paths, so nothing carries their history")
  expect(existsSync(at)).toBe(false)
})
