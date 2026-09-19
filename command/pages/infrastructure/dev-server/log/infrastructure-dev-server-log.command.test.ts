import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { infrastructureDevServerLog } from "akasha/command/pages/infrastructure/dev-server/log/infrastructure-dev-server-log.command.code.ts"

const root = join(import.meta.dir, "..", "..", "..", "..", "..")

function given(): Given {
  return {
    root,
    calledAs: "akasha infrastructure dev-server log",
    from: root,
    writer: null,
    agentId: null,
  }
}

test("nothing said is refused, naming the commit and the apps there are", async () => {
  const said = await infrastructureDevServerLog([], given())
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain("smilingjenny-web")
})

test("a flag it does not take is refused", async () => {
  const said = await infrastructureDevServerLog(
    ["HEAD", "--app", "alanwalton-web", "--json"],
    given()
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--json")
})

test("a word that names no commit is the caller's mistake", async () => {
  const said = await infrastructureDevServerLog(["999999999", "--app", "alanwalton-web"], given())
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain("names no commit")
})

test("a log no file is there for is a data refusal", async () => {
  const said = await infrastructureDevServerLog(["HEAD", "--app", "alanwalton-web"], given())
  expect(said.code).toBe(2)
})

test("a web app stating no base port is named and refused with why", async () => {
  const said = await infrastructureDevServerLog(["HEAD", "--app", "smilingjenny-web"], given())
  expect(said.refusals.join(" ")).toContain("base port")
})
