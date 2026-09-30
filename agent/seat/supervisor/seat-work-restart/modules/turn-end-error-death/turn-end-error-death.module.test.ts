import { expect, test } from "bun:test"
import { classifyTurnEndErrorDeath } from "akasha/agent/seat/supervisor/seat-work-restart/modules/turn-end-error-death/turn-end-error-death.module.code.ts"

function died(status: number | null, error: string): string {
  return JSON.stringify({
    type: "assistant",
    isApiErrorMessage: true,
    apiErrorStatus: status,
    error,
  })
}

const SPOKE = JSON.stringify({ type: "assistant", message: { content: "done" } })

test("a server error mid-response with no status is a death", () => {
  const reading = classifyTurnEndErrorDeath([SPOKE, died(null, "server_error")].join("\n"))
  expect(reading).toEqual({ detected: true, consecutive: 1, statuses: [null] })
})

test("an overload and a bad gateway are deaths, counted running", () => {
  const text = [SPOKE, died(529, "server_error"), died(502, "server_error")].join("\n")
  expect(classifyTurnEndErrorDeath(text)).toEqual({
    detected: true,
    consecutive: 2,
    statuses: [529, 502],
  })
})

test("a rate limit is no death this resumes", () => {
  expect(classifyTurnEndErrorDeath(died(429, "rate_limit")).detected).toBe(false)
})

test("a failed login is no death this resumes", () => {
  expect(classifyTurnEndErrorDeath(died(401, "authentication_failed")).detected).toBe(false)
})

test("a turn that ended in words is no death", () => {
  expect(classifyTurnEndErrorDeath([died(null, "server_error"), SPOKE].join("\n")).detected).toBe(
    false
  )
})
