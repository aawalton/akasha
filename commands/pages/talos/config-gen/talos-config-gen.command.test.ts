import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { node } from "akasha/commands/arguments/pages/node.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { talosConfigGen } from "akasha/commands/pages/talos/config-gen/talos-config-gen.command.code.ts"
import { talosConfigGen as page } from "akasha/commands/pages/talos/config-gen/talos-config-gen.command.ts"

const CALLED_AS = "akasha talos config-gen"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [node, output]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const IN_PLACE = `<${node.placeholder}>`

const EVERY = `\`${IN_PLACE}\`, \`${node.said}\`, \`${output.said}\``

const ASKED = `\`${IN_PLACE}\` or \`${node.said}\``

const NAMED = "a-node-the-table-names"

const genRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await talosConfigGen(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the node and where to write, and this test carries both argument pages", () => {
  expect(SAYS).toEqual([node.said, output.said])
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("flag-or-word")
  expect(page.arguments[1]).not.toHaveProperty("saidAs")
})

test("a call naming no node asks for it as a word or at its flag", async () => {
  const said = await genRefusing([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(ASKED)
})

test("a flag this takes no argument at is refused, naming the placeholder among the flags", async () => {
  const said = await genRefusing(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(ASKED)
})

test("the node said as a word and at its flag in one call is refused", async () => {
  const said = await genRefusing([NAMED, node.said, NAMED])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[0]).toContain(`\`${node.said}\``)
})

test("one spare word is refused, and the refusal names the word nothing takes", async () => {
  const said = await genRefusing([NAMED, "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("two spare words are both named, drawn one beside the other", async () => {
  const said = await genRefusing([NAMED, "one-spare", "two-spare"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`one-spare` or `two-spare`")
})

test("a word after a bare dash pair fills the node rather than being read as a flag", async () => {
  const said = await genRefusing(["--", node.said, "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
  expect(said[0]).not.toContain(ASKED)
})

test("where to write with nothing after it is refused, and the node asked for besides", async () => {
  const said = await genRefusing([output.said])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${output.said}\``)
  expect(said[0]).toContain("takes a value")
  expect(said[1]).toContain(ASKED)
})

test("where to write joined to an empty value is refused as the call wrote it", async () => {
  const said = await genRefusing([`${output.said}=`])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${output.said}=\``)
  expect(said[1]).toContain(ASKED)
})
