import { expect, test } from "bun:test"
import { readFileSync, readdirSync } from "node:fs"
import usage from "./usage.command.code.attachment.ts"

const PAGES = `${import.meta.dir}/../../../pages/claude-account`

const ENTRY = `${import.meta.dir}/usage.command.code.attachment.ts`

const SUFFIX = ".claude-account.md"

function accountsOnDisk(): readonly string[] {
  return readdirSync(PAGES)
    .filter((one) => one.endsWith(SUFFIX))
    .map((one) => one.slice(0, -SUFFIX.length))
}

async function printed(): Promise<readonly string[]> {
  const said: string[] = []
  const held = console.log
  console.log = (line: string) => {
    said.push(line)
  }
  try {
    await usage([])
  } finally {
    console.log = held
  }
  return said
}

test("every account holding a page gets a line, whatever its usage row says", async () => {
  const accounts = accountsOnDisk()
  expect(accounts.length).toBeGreaterThan(0)
  const said = await printed()
  expect(said.length).toBe(accounts.length)
  for (const account of accounts) {
    expect(said.some((line) => line.includes(account))).toBe(true)
  }
})

test("nothing here reaches the network, which is what dropped accounts before", () => {
  expect(readFileSync(ENTRY, "utf8")).not.toContain("fetch(")
})
