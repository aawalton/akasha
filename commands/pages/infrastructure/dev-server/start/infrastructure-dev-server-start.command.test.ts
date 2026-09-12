import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { port } from "akasha/commands/arguments/pages/port.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { infrastructureDevServerStart } from "akasha/commands/pages/infrastructure/dev-server/start/infrastructure-dev-server-start.command.code.ts"
import { infrastructureDevServerStart as page } from "akasha/commands/pages/infrastructure/dev-server/start/infrastructure-dev-server-start.command.ts"
import { namingApps } from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

const CALLED_AS = "akasha infrastructure dev-server start"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const KNOWN: readonly Argument[] = [json, seq, webApp, port]

const SPELLED: readonly string[] = page.arguments.map((one) => saidForPart(KNOWN, one.argument))

const AS_WORD = `<${seq.placeholder}>`

const APP = [webApp.said, "temper-web"]

const startRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await infrastructureDevServerStart(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLED.length).toBe(page.arguments.length)
  expect(SPELLED).toEqual([json.said, seq.said, webApp.said, port.said])
})

test("the app is said at a flag shorter than the argument page is slugged", () => {
  expect(webApp.slug).toBe("web-app")
  expect(webApp.said).toBe("--app")
})

test("a flag this takes nothing of is refused, naming the seq both ways among the rest", async () => {
  const said = (await startRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${json.said}\`, \`${AS_WORD}\`, \`${seq.said}\``)
  expect(said).toContain(`\`${webApp.said}\`, \`${port.said}\``)
})

test("a call saying nothing asks for the seq either way and for the app", async () => {
  const said = await startRefusing([])
  expect(said.some((one) => one.includes(`\`${AS_WORD}\` or \`${seq.said}\``))).toBe(true)
  expect(said.some((one) => one.includes(`\`${webApp.said}\``))).toBe(true)
})

test("the refusal over a missing app carries the apps there are, read at the time", async () => {
  const said = await startRefusing([])
  expect(said).toEqual(namingApps(said.slice(0, 2), REPO, webApp.said))
  expect(said.length).toBe(3)
})

test("the seq said as a word and at its flag in one call is refused", async () => {
  const said = await startRefusing(["3", seq.said, "4", ...APP])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${AS_WORD}\``)
  expect(said[0]).toContain(`\`${seq.said}\``)
})

test("the port is refused a word that is no whole number, before anything is spawned", async () => {
  const said = await startRefusing(["3", ...APP, port.said, "lots"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${port.said} lots`)
  expect(said[0]).toContain("whole number")
})

test("the seq at its flag said twice is refused", async () => {
  const said = await startRefusing([seq.said, "1", seq.said, "2", ...APP])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${seq.said}\``)
  expect(said[0]).toContain("twice")
})

test("the flag answering as JSON carries no value, so one joined to it is refused", async () => {
  const said = await startRefusing([`${json.said}=1`, "3", ...APP])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("carries no value")
})
