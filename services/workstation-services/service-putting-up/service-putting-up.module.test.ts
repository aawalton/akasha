import { expect, test } from "bun:test"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { putUpService } from "akasha/services/workstation-services/service-putting-up/service-putting-up.module.code.ts"

const ROOT = rootOf(import.meta.dir)

test("a slug no workstation service page carries is refused as the data's fault", () => {
  const put = putUpService(ROOT, "no-such-service-here", true)

  expect(put.code).toBe(2)
})

test("a slug no workstation service page carries is refused by naming that slug", () => {
  const put = putUpService(ROOT, "no-such-service-here", true)

  expect(put.refusals[0]).toContain("no-such-service-here")
})

test("a refusal reaching no systemd reports nothing about a unit", () => {
  const put = putUpService(ROOT, "no-such-service-here", true)

  expect(put.report).toEqual([])
})
