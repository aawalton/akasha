import { expect, test } from "bun:test"
import {
  DRY_RUN,
  slugIn,
} from "akasha/commands/pages/infrastructure/service/service-slug-arguing/service-slug-arguing.module.code.ts"

const CALLED = "akasha infrastructure service restart"

test("a call naming no service is refused", () => {
  const named = slugIn([], CALLED, [DRY_RUN])
  expect("refused" in named).toBe(true)
  if ("refused" in named) expect(named.refused).toContain("name the service")
})

test("a call naming two services is refused rather than chosen between", () => {
  const named = slugIn(["one", "two"], CALLED, [DRY_RUN])
  expect("refused" in named).toBe(true)
  if ("refused" in named) expect(named.refused).toContain("one service at a time")
})

test("a flag the command does not take is refused by name", () => {
  const named = slugIn(["one", "--all"], CALLED, [DRY_RUN])
  expect("refused" in named).toBe(true)
  if ("refused" in named) expect(named.refused).toContain("`--all`")
})

test("a flag the command takes is read rather than refused", () => {
  const named = slugIn(["one", DRY_RUN], CALLED, [DRY_RUN])
  expect("refused" in named).toBe(false)
  if ("refused" in named) return
  expect(named.slug).toBe("one")
  expect(named.dryRun).toBe(true)
})

test("a command taking no flag refuses the dry run flag by name", () => {
  const named = slugIn(["one", DRY_RUN], "akasha infrastructure service run", [])
  expect("refused" in named).toBe(true)
  if ("refused" in named) expect(named.refused).toContain("`--dry-run`")
})
