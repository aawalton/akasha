import { expect, test } from "bun:test"
import { image } from "akasha/command/argument/pages/image.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { pagePicture } from "akasha/command/pages/page/picture/page-picture.command.code.ts"

const GIVEN: Given = {
  root: rootOf(process.cwd()),
  calledAs: "akasha page picture",
  from: ".",
  writer: null,
  agentId: null,
}

test("a call naming no picture is refused by the argument naming one", async () => {
  const said = await pagePicture([], GIVEN)
  expect(said.refusals.join("\n")).toContain(`\`${image.said}\``)
})

test("a picture that will not read is refused by the argument naming it", async () => {
  const said = await pagePicture([image.said, "/nowhere/at/all.jpg"], GIVEN)
  expect(said.refusals.join("\n")).toContain("/nowhere/at/all.jpg")
  expect(said.refusals.join("\n")).toContain("will not read")
})
