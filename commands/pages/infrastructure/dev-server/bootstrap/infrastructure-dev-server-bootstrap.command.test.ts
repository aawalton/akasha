import { expect, test } from "bun:test"
import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { DATA, partWay } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { infrastructureDevServerBootstrap } from "akasha/commands/pages/infrastructure/dev-server/bootstrap/infrastructure-dev-server-bootstrap.command.code.ts"
import { wroteEnvSaid } from "akasha/infrastructure/services/web-apps/dev-server-env-writing/dev-server-env-writing.module.code.ts"

function given(root: string): Given {
  const calledAs = "akasha infrastructure dev-server bootstrap"
  return { root, calledAs, from: root, writer: null, agentId: null }
}

const ARGV = ["--seq", "7", "--app", "temper-web"]

const WROTE = wroteEnvSaid("/worktree/apps/one/.env.local", 12)

const NO_SECRETS = new DataError("the resource places no value at all")

test("a run that wrote the env file and then threw names that file", async () => {
  const said = await infrastructureDevServerBootstrap(
    ARGV,
    given("/nowhere"),
    throwingAfter([WROTE], NO_SECRETS)
  )

  expect(said.report).toEqual([WROTE])
  expect(said.refusals.at(-1)).toBe(partWay([WROTE])[0])
  expect(said.code).toBe(DATA)
})

test("a run that threw before it wrote names the fault alone", async () => {
  const said = await infrastructureDevServerBootstrap(
    ARGV,
    given("/nowhere"),
    throwingAfter([], NO_SECRETS)
  )

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the resource places no value at all")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("the file is named with how many values it holds and who can read it", () => {
  expect(WROTE).toContain("12 secret values")
  expect(WROTE).toContain("readable by its owner alone")
})
