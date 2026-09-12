import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { everyServer } from "akasha/commands/arguments/pages/every-server.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seq } from "akasha/commands/arguments/pages/seq.argument.ts"
import { webApp } from "akasha/commands/arguments/pages/web-app.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { infrastructureDevServerStop } from "akasha/commands/pages/infrastructure/dev-server/stop/infrastructure-dev-server-stop.command.code.ts"
import { infrastructureDevServerStop as page } from "akasha/commands/pages/infrastructure/dev-server/stop/infrastructure-dev-server-stop.command.ts"

const CALLED_AS = "akasha infrastructure dev-server stop"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const OFFERED: readonly Argument[] = [json, seq, webApp, everyServer]

const SAID: readonly string[] = page.arguments.map((one) => saidForPart(OFFERED, one.argument))

const APART = page.arguments.find((one) => "notWith" in one)

const KEPT_FROM: readonly string[] =
  APART === undefined ? [] : APART.notWith.map((one) => saidForPart(OFFERED, one))

const WORD = `<${seq.placeholder}>`

const stopRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await infrastructureDevServerStop(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SAID.length).toBe(page.arguments.length)
  expect(SAID).toEqual([json.said, seq.said, webApp.said, everyServer.said])
})

test("the flag naming every server is said shorter than the argument page is slugged", () => {
  expect(everyServer.slug).toBe("every-server")
  expect(everyServer.said).toBe("--all")
})

test("every server is kept apart from the two that name one server", () => {
  expect(KEPT_FROM).toEqual([seq.said, webApp.said])
})

test("a flag this takes nothing of is refused, naming the seq both ways among the rest", async () => {
  const said = (await stopRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${json.said}\`, \`${WORD}\`, \`${seq.said}\``)
  expect(said).toContain(`\`${webApp.said}\`, \`${everyServer.said}\``)
})

test("each argument every server is kept from is refused where a call says both", async () => {
  for (const one of KEPT_FROM) {
    const said = await stopRefusing([everyServer.said, one, "a-value"])
    expect(said).toContain(
      `\`${everyServer.said}\` and \`${one}\` are never said together, and this call says both`
    )
  }
})

test("both arguments said beside every server earn a refusal each", async () => {
  const said = await stopRefusing([everyServer.said, seq.said, "3", webApp.said, "temper-web"])
  expect(said.length).toBe(KEPT_FROM.length)
})

test("a call naming neither every server nor both of the pair is refused", async () => {
  const said = await stopRefusing([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${everyServer.said}\``)
  expect(said[0]).toContain(`\`${seq.said}\``)
  expect(said[0]).toContain(`\`${webApp.said}\``)
})

test("one of the pair alone is refused as saying neither is", async () => {
  for (const one of [
    [seq.said, "3"],
    [webApp.said, "temper-web"],
  ]) {
    const said = await stopRefusing(one)
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`\`${everyServer.said}\``)
  }
})

test("the seq said as a word and at its flag in one call is refused", async () => {
  const said = await stopRefusing(["3", seq.said, "4"])
  expect(said[0]).toContain(`\`${WORD}\``)
  expect(said[0]).toContain(`\`${seq.said}\``)
})

test("every server carries no value, so one joined to it is refused", async () => {
  const said = await stopRefusing([`${everyServer.said}=1`])
  expect(said[0]).toContain(`\`${everyServer.said}\``)
  expect(said[0]).toContain("carries no value")
})
