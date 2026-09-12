import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { cluster } from "akasha/commands/arguments/pages/cluster.argument.ts"
import { controlPlaneIps } from "akasha/commands/arguments/pages/control-plane-ips.argument.ts"
import { ip } from "akasha/commands/arguments/pages/ip.argument.ts"
import { workerIps } from "akasha/commands/arguments/pages/worker-ips.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  commaed,
  talosHealth,
} from "akasha/commands/pages/talos/health/talos-health.command.code.ts"
import { talosHealth as page } from "akasha/commands/pages/talos/health/talos-health.command.ts"

const CALLED_AS = "akasha talos health"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [cluster, ip, controlPlaneIps, workerIps]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const EVERY = `\`${SAYS.join("`, `")}\``

const ADDRESS = "10.0.0.7"

const healthRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await talosHealth(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names four arguments, and this test carries the argument page for each", () => {
  expect(SAYS).toEqual([cluster.said, ip.said, controlPlaneIps.said, workerIps.said])
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(1)
})

test("a call naming no address asks for the address alone", async () => {
  const said = await healthRefusing([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${ip.said}\``)
})

test("a flag this takes no argument at is refused, naming every argument it takes", async () => {
  const said = await healthRefusing(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the etcd members with nothing after them are refused", async () => {
  const said = await healthRefusing([ip.said, ADDRESS, controlPlaneIps.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${controlPlaneIps.said}\``)
  expect(said[0]).toContain("none follows it")
})

test("the address whose value is another flag is an argument no value follows", async () => {
  const said = await healthRefusing([ip.said, cluster.said, "other"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${ip.said}\``)
  expect(said[0]).toContain("none follows it")
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the workers said twice are refused rather than the later ones winning", async () => {
  const said = await healthRefusing([workerIps.said, "10.0.0.8", workerIps.said, "10.0.0.9"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${workerIps.said}\``)
  expect(said[0]).toContain("twice")
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("the etcd members joined to an empty value are refused as the call wrote them", async () => {
  const said = await healthRefusing([`${controlPlaneIps.said}=`])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${controlPlaneIps.said}=\``)
  expect(said[1]).toContain(`\`${ip.said}\``)
})

test("an address list is read as its trimmed parts, and an empty part is no address", () => {
  expect(commaed(undefined)).toEqual([])
  expect(commaed("")).toEqual([])
  expect(commaed(" 10.0.0.1 , 10.0.0.2 ")).toEqual(["10.0.0.1", "10.0.0.2"])
  expect(commaed("10.0.0.1,,10.0.0.2,")).toEqual(["10.0.0.1", "10.0.0.2"])
})
