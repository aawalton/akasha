import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { cluster } from "akasha/commands/arguments/pages/cluster.argument.ts"
import { ip } from "akasha/commands/arguments/pages/ip.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { talosBootstrap } from "akasha/commands/pages/talos/bootstrap/talos-bootstrap.command.code.ts"
import { talosBootstrap as page } from "akasha/commands/pages/talos/bootstrap/talos-bootstrap.command.ts"

const CALLED_AS = "akasha talos bootstrap"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [cluster, ip]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const EVERY = `\`${SAYS.join("`, `")}\``

const ADDRESS = "10.0.0.7"

const bootstrapRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await talosBootstrap(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the cluster and the address, and this test carries both argument pages", () => {
  expect(SAYS).toEqual([cluster.said, ip.said])
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[0]).not.toHaveProperty("required")
  expect(cluster.default).not.toBeUndefined()
})

test("a call naming no address asks for the address alone, the cluster carrying a default", async () => {
  const said = await bootstrapRefusing([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${ip.said}\``)
  expect(said[0]).not.toContain(cluster.said)
})

test("a flag this takes no argument at is refused, naming every argument it takes", async () => {
  const said = await bootstrapRefusing(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("a word is refused here, where no argument this takes is said as a word", async () => {
  const said = await bootstrapRefusing([ADDRESS])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${ADDRESS}\``)
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the address at its flag with nothing after it is refused, and asked for besides", async () => {
  const said = await bootstrapRefusing([ip.said])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${ip.said}\``)
  expect(said[0]).toContain("takes a value")
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the address joined to an empty value is refused as the call wrote it", async () => {
  const said = await bootstrapRefusing([`${ip.said}=`])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${ip.said}=\``)
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the empty word after the address names no value", async () => {
  const said = await bootstrapRefusing([ip.said, ""])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("empty word")
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the address said twice is refused rather than the later one winning", async () => {
  const said = await bootstrapRefusing([ip.said, ADDRESS, ip.said, "10.0.0.8"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${ip.said}\``)
  expect(said[0]).toContain("twice")
})

test("the cluster followed by another flag is an argument no value follows", async () => {
  const said = await bootstrapRefusing([cluster.said, ip.said, ADDRESS])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${cluster.said}\``)
  expect(said[0]).toContain("none follows it")
})
