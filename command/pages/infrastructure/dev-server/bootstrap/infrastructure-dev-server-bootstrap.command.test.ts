import { expect, test } from "bun:test"
import { DataError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { DATA, partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { infrastructureDevServerBootstrap } from "akasha/command/pages/infrastructure/dev-server/bootstrap/infrastructure-dev-server-bootstrap.command.code.ts"
import { wroteEnvSaid } from "akasha/infrastructure/service/web-app/modules/dev-server-env-writing/dev-server-env-writing.module.code.ts"

const REPO = rootOf(import.meta.dir)

function given(root: string): Given {
  const calledAs = "akasha infrastructure dev-server bootstrap"
  return { root, calledAs, from: root, writer: null, agentId: null }
}

const ARGV = ["--commit", "HEAD", "--app", "temper-web"]

const WROTE = wroteEnvSaid("/tree/apps/one/.env.local", 12)

const NO_SECRETS = new DataError("the resource places no value at all")

test("a run that wrote the env file and then threw names that file", async () => {
  const said = await infrastructureDevServerBootstrap(
    ARGV,
    given(REPO),
    throwingAfter([WROTE], NO_SECRETS)
  )

  expect(said.report).toEqual([WROTE])
  expect(said.refusals.at(-1)).toBe(partWay([WROTE])[0])
  expect(said.code).toBe(DATA)
})

test("a run that threw before it wrote names the fault alone", async () => {
  const said = await infrastructureDevServerBootstrap(
    ARGV,
    given(REPO),
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
