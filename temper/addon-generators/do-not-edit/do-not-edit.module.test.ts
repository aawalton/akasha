import { expect, test } from "bun:test"
import { temperAddonDataGenerate } from "akasha/commands/pages/temper/addon/data-generate/temper-addon-data-generate.command.ts"
import { temperAddon } from "akasha/commands/pages/temper/addon/temper-addon.namespace.ts"
import { temper } from "akasha/commands/pages/temper/temper.namespace.ts"
import { DO_NOT_EDIT } from "akasha/temper/addon-generators/do-not-edit/do-not-edit.module.code.ts"

test("the line names the call that writes the rendered file again", () => {
  const call = `akasha ${temper.name} ${temperAddon.name} ${temperAddonDataGenerate.name}`
  expect(DO_NOT_EDIT).toBe(`DO NOT EDIT — regenerate with: ${call}`)
})
