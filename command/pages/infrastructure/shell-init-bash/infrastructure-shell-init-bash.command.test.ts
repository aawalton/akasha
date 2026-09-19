import { afterAll, describe, expect, test } from "bun:test"
import { ANTHROPIC } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { generateBashInit } from "akasha/code/shell/terminal/modules/terminal-bash/terminal-bash.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { infrastructureShellInitBash } from "akasha/command/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.code.ts"
import { ACCOUNT_TYPE_AT } from "akasha/command/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const ACCOUNT_SLUG = "model-account"

const ACCOUNT_TYPE_BODY =
  `export const modelAccount = { id: "${ACCOUNT_TYPE}", pageTypeSlug: "page-type", ` +
  `slug: "${ACCOUNT_SLUG}", pluralSlug: "model-accounts", extendsSlug: [] } as const\n`

function accountlessRoot(root: string): string {
  writing(root, ACCOUNT_TYPE_AT, ACCOUNT_TYPE_BODY)
  pageFiled(root, ACCOUNT_TYPE, ACCOUNT_TYPE_AT)
  listedFiled(root, "page-type", ACCOUNT_SLUG, [{ path: ACCOUNT_TYPE_AT, id: ACCOUNT_TYPE }])
  return root
}

const ACCOUNTS = [
  { account: "walton-one", aliasIndex: 1 },
  { account: "walton-seven", aliasIndex: 7 },
]

function accountedRoot(root: string): string {
  accountlessRoot(root)
  valueAlsoFiled(
    root,
    ACCOUNT_SLUG,
    ACCOUNTS.map((one) => ({
      path: `agent/model/account/pages/${one.account}/${one.account}.${ACCOUNT_SLUG}.ts`,
      value: { slug: one.account, provider: ANTHROPIC, aliasIndex: one.aliasIndex },
    }))
  )
  return root
}

const WORLD = scratchWorld()

afterAll(() => WORLD.sweep())

const ROOT = accountedRoot(WORLD.rootFor("shell-init-bash-"))

const given: Given = {
  root: ROOT,
  calledAs: "akasha infrastructure shell-init-bash",
  from: ROOT,
  writer: null,
  agentId: null,
}

describe("what this takes", () => {
  test("is nothing", () => {
    expect(infrastructureShellInitBash([], given).refusals).toEqual([])
  })

  test("so a word given to it is refused", () => {
    expect(infrastructureShellInitBash(["bash"], given).code).toBe(1)
  })

  test("and every word given is named rather than the first alone", () => {
    expect(infrastructureShellInitBash(["one", "two"], given).refusals.length).toBe(2)
  })
})

describe("the set composed", () => {
  const answer = infrastructureShellInitBash([], given)

  test("is answered rather than refused", () => {
    expect(answer.refusals).toEqual([])
    expect(answer.code).toBe(0)
  })

  test("goes to the report, one line of the set to one line of the report", () => {
    expect(answer.report.length).toBe(generateBashInit(ACCOUNTS).split("\n").length)
    for (const one of answer.report) expect(one).not.toContain("\n")
  })

  test("carries the launchers a terminal reaches", () => {
    const said = answer.report.join("\n")
    for (const name of ["sn()", "sr()", "cu()", "cna()", "_akasha_reload()"]) {
      expect(said).toContain(name)
    }
  })

  test("carries one launcher for each account page stating an alias index", () => {
    const said = answer.report.filter((one) => /^c\d+\(\) \{$/.test(one))
    expect(said).toEqual(ACCOUNTS.map((one) => `c${String(one.aliasIndex)}() {`))
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

describe("a root holding no account page", () => {
  test("is a data refusal rather than a set with no launcher", () => {
    const world = scratchWorld()
    try {
      const root = accountlessRoot(world.rootFor("shell-init-bash-"))
      const answer = infrastructureShellInitBash([], { ...given, root })
      expect(answer.code).toBe(2)
      expect(answer.report).toEqual([])
      expect(answer.refusals[0]).toContain("no model account page was read")
    } finally {
      world.sweep()
    }
  })
})
