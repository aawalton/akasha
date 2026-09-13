import { expect, test } from "bun:test"
import { DO_NOT_EDIT } from "akasha/temper/addon-generators/modules/do-not-edit/do-not-edit.module.code.ts"

test("the line tells a reader the file is written out rather than edited", () => {
  expect(DO_NOT_EDIT).toBe("DO NOT EDIT — this file is written out from the pages it comes from")
})
