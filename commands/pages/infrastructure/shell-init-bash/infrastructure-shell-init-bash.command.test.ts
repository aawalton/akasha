import { describe, expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import {
  infrastructureShellInitBash,
  readIn,
} from "akasha/commands/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.code.ts"
import { ACCOUNT_TYPE_AT } from "akasha/commands/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.test-fixtures.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { pageFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const given: Given = {
  root: "/var/home/walton/repos/akasha",
  calledAs: "akasha infrastructure shell-init-bash",
  from: "/var/home/walton/repos/akasha",
  writer: null,
  agentId: null,
}

describe("what this takes", () => {
  test("is nothing", () => {
    expect(readIn([])).toEqual({ composing: true })
  })

  test("so a word given to it is refused", () => {
    const read = readIn(["bash"])
    expect("refused" in read).toBe(true)
    expect(infrastructureShellInitBash(["bash"], given).code).toBe(1)
  })

  test("and every word given is named rather than the first alone", () => {
    const read = readIn(["one", "two"])
    expect("refused" in read && read.refused.length).toBe(2)
  })
})

describe("the set composed", () => {
  const answer = infrastructureShellInitBash([], given)

  test("is answered rather than refused", () => {
    expect(answer.refusals).toEqual([])
    expect(answer.code).toBe(0)
  })

  test("goes to the report, one line of the set to one line of the report", () => {
    expect(answer.report.length).toBeGreaterThan(50)
    for (const one of answer.report) expect(one).not.toContain("\n")
  })

  test("carries the launchers a terminal reaches", () => {
    const said = answer.report.join("\n")
    for (const name of ["sn()", "sr()", "cu()", "cna()", "_akasha_reload()"]) {
      expect(said).toContain(name)
    }
  })

  test("carries one launcher for each account page stating an alias index", () => {
    const said = answer.report.join("\n")
    expect(said).toMatch(/^c\d+\(\) \{$/m)
  })

  test("is bash a shell can parse", async () => {
    const ran = Bun.spawn({
      cmd: ["bash", "-n"],
      stdin: new TextEncoder().encode(answer.report.join("\n")),
      stderr: "pipe",
    })
    expect(await new Response(ran.stderr).text()).toBe("")
    expect(await ran.exited).toBe(0)
  })
})

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const ACCOUNT_TYPE_BODY =
  `export const claudeAccount = { id: "${ACCOUNT_TYPE}", pageTypeSlug: "page-type", ` +
  `slug: "claude-account", pluralSlug: "claude-accounts", extendsSlug: [] } as const\n`

function accountlessRoot(root: string): string {
  writing(root, ACCOUNT_TYPE_AT, ACCOUNT_TYPE_BODY)
  pageFiled(root, ACCOUNT_TYPE, ACCOUNT_TYPE_AT)
  listedFiled(root, "page-type", "claude-account", [{ path: ACCOUNT_TYPE_AT, id: ACCOUNT_TYPE }])
  return root
}

describe("a root holding no account page", () => {
  test("is a data refusal rather than a set with no launcher", () => {
    const world = scratchWorld()
    try {
      const root = accountlessRoot(world.rootFor("shell-init-bash-"))
      const answer = infrastructureShellInitBash([], { ...given, root })
      expect(answer.code).toBe(2)
      expect(answer.report).toEqual([])
      expect(answer.refusals[0]).toContain("no claude account page was read")
    } finally {
      world.sweep()
    }
  })
})
