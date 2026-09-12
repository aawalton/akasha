import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { port } from "akasha/commands/arguments/pages/port.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { infrastructureDevServerRestart } from "akasha/commands/pages/infrastructure/dev-server/restart/infrastructure-dev-server-restart.command.code.ts"
import { infrastructureDevServerRestart as page } from "akasha/commands/pages/infrastructure/dev-server/restart/infrastructure-dev-server-restart.command.ts"

const CALLED_AS = "akasha infrastructure dev-server restart"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const HELD: readonly Argument[] = [json, seq, webApp, port]

const ENTRIES = page.arguments.map((one) => ({
  said: saidForPart(HELD, one.argument),
  needed: "required" in one && one.required === true,
  asWord: "saidAs" in one && one.saidAs === "flag-or-word",
}))

const NEEDED = ENTRIES.filter((one) => one.needed).map((one) => one.said)

const EITHER_WAY = ENTRIES.filter((one) => one.asWord).map((one) => one.said)

const WORD = `<${seq.placeholder}>`

const NAMED = [seq.said, "3", webApp.said, "temper-web"]

const restartRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await infrastructureDevServerRestart(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(ENTRIES.length).toBe(page.arguments.length)
  expect(NEEDED).toEqual([seq.said, webApp.said])
  expect(EITHER_WAY).toEqual([seq.said])
})

test("a restart takes what a start takes, so the port is among them and nothing more", () => {
  expect(ENTRIES.map((one) => one.said)).toEqual([json.said, seq.said, webApp.said, port.said])
})

test("a flag this takes nothing of is refused and names the arguments it does take", async () => {
  const said = (await restartRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  for (const one of ENTRIES) expect(said).toContain(`\`${one.said}\``)
  expect(said).toContain(`\`${WORD}\``)
})

test("a call saying nothing asks for each argument the page needs", async () => {
  const said = (await restartRefusing([])).join("\n")
  for (const one of NEEDED) expect(said).toContain(`\`${one}\``)
})

test("a missing app draws a line naming the apps beside the line asking for it", async () => {
  const said = await restartRefusing([])
  expect(said.length).toBeGreaterThan(NEEDED.length)
  expect(said.at(-1)).toContain("temper-web")
})

test("the seq is refused where one call says it as a word and at its flag", async () => {
  const said = await restartRefusing(["3", ...NAMED])
  expect(said[0]).toContain(`\`${WORD}\``)
  expect(said[0]).toContain(`\`${seq.said}\``)
})

test("the port takes a whole number, and a word that is none is refused", async () => {
  const said = await restartRefusing([...NAMED, port.said, "soon"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${port.said} soon`)
})

test("the app said twice is refused rather than the later one winning", async () => {
  const said = await restartRefusing([...NAMED, webApp.said, "smilingjenny-web"])
  expect(said[0]).toContain(`\`${webApp.said}\``)
  expect(said[0]).toContain("twice")
})

test("any refusal naming the app carries the apps there are on the line after it", async () => {
  const said = await restartRefusing([...NAMED, webApp.said, "smilingjenny-web"])
  expect(said.length).toBe(2)
  expect(said[1]).toContain("temper-web")
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await restartRefusing([seq.said, "3", webApp.said])
  expect(said).toContain(`\`${webApp.said}\` takes a value, and none follows it`)
})
