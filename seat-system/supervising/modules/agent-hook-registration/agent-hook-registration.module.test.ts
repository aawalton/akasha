import { expect, test } from "bun:test"
import type { Valued } from "akasha/agents/hooks/dispatch/hook-dispatch.module.code.ts"
import { runnableIn } from "akasha/seat-system/supervising/modules/agent-hook-registration/agent-hook-registration.module.code.ts"

const NOWHERE = "/no-such-checkout"

const PAGE = "one.agent-hook.ts"

function listed(value: Record<string, unknown>): readonly Valued[] {
  return [{ path: PAGE, value }]
}

test("a hook naming no event registers nothing rather than refusing the spawn", () => {
  expect(() => runnableIn(NOWHERE, listed({ slug: "parked", runsAt: [] }))).not.toThrow()
})

test("a hook stating no list of events is refused by name", () => {
  expect(() => runnableIn(NOWHERE, listed({ slug: "unstated" }))).toThrow(/unstated/)
})

test("a hook naming an event is still refused where its code is not there", () => {
  expect(() => runnableIn(NOWHERE, listed({ slug: "named", runsAt: ["Stop"] }))).toThrow(
    /is not there to run/
  )
})

test("a hook parked that way is the one hook parked rather than the whole fleet", () => {
  const both: readonly Valued[] = [
    { path: PAGE, value: { slug: "parked", runsAt: [] } },
    { path: "two.agent-hook.ts", value: { slug: "named", runsAt: ["Stop"] } },
  ]

  expect(() => runnableIn(NOWHERE, both)).toThrow(/named/)
})
