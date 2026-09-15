import { expect, test } from "bun:test"
import {
  judgedAlone,
  runAuditChild,
} from "akasha/check/modules/audit-child/audit-child.module.code.ts"

const TAKES = "a root, a check and a file to answer into"

const GATHERS_NONE = "is no check this tree gathers"

test("a run handed no check and no file to answer into judges nothing", async () => {
  await expect(runAuditChild(["/nowhere"])).rejects.toThrow(TAKES)
})

test("a run handed no file to answer into judges nothing", async () => {
  await expect(runAuditChild(["/nowhere", "typecheck"])).rejects.toThrow(TAKES)
})

test("a run handed nothing at all judges nothing", async () => {
  await expect(runAuditChild([])).rejects.toThrow(TAKES)
})

test("a slug no check and no model check carries judges nothing", async () => {
  await expect(judgedAlone(process.cwd(), "no-check-carries-this-slug")).rejects.toThrow(
    GATHERS_NONE
  )
})
