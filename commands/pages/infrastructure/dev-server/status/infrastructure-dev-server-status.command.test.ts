import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { infrastructureDevServerStatus } from "akasha/commands/pages/infrastructure/dev-server/status/infrastructure-dev-server-status.command.code.ts"
import { infrastructureDevServerStatus as page } from "akasha/commands/pages/infrastructure/dev-server/status/infrastructure-dev-server-status.command.ts"

const CALLED_AS = "akasha infrastructure dev-server status"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CARRIED: readonly Argument[] = [json, seq, webApp]

const NAMES: readonly string[] = page.arguments.map((one) => saidForPart(CARRIED, one.argument))

const PLACED = `<${seq.placeholder}>`

const statusRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await infrastructureDevServerStatus(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(NAMES.length).toBe(page.arguments.length)
  expect(NAMES).toEqual([json.said, seq.said, webApp.said])
})

test("this reads rather than writes, so the page needs no argument and takes no port", () => {
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
  expect(NAMES).not.toContain("--port")
})

test("a flag this takes nothing of is refused, naming the seq both ways among the rest", async () => {
  const said = (await statusRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${json.said}\`, \`${PLACED}\`, \`${seq.said}\`, \`${webApp.said}\``)
})

test("a second word is refused and the refusal names the word nothing takes", async () => {
  const said = await statusRefusing(["3", "4"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`4`")
})

test("the seq said as a word and at its flag in one call is refused", async () => {
  const said = await statusRefusing(["3", seq.said, "4"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
  expect(said[0]).toContain(`\`${seq.said}\``)
})

test("the app said twice is refused, and no line naming the apps follows it here", async () => {
  const said = await statusRefusing([webApp.said, "temper-web", webApp.said, "smilingjenny-web"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${webApp.said}\``)
  expect(said[0]).toContain("twice")
})

test("the app with no value after it is refused", async () => {
  const said = await statusRefusing([webApp.said])
  expect(said).toContain(`\`${webApp.said}\` takes a value, and none follows it`)
})

test("the flag answering as JSON carries no value, so one joined to it is refused", async () => {
  const said = await statusRefusing([`${json.said}=1`])
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("carries no value")
})
