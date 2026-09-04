import { expect, test } from "bun:test"
import {
  planRestartNotice,
  type RestartNowEvent,
  type ResumeNotices,
} from "./supervisor-restart-notice-decide.module.code.ts"

const NOTICES: ResumeNotices = {
  "restart-immediate": "restart now",
  "restart-deferred": "restart when you are idle",
  "restart-recovery-clause": "pick your work back up",
}

const EVENT: RestartNowEvent = { action: "restart-now", interruptMessage: null }

test("a restart with nothing else standing goes on the spawn line as the immediate notice", () => {
  const said = planRestartNotice(EVENT, { maintenance: false, reExecPending: false }, NOTICES)
  expect(said.route).toBe("spawn-argv")
  expect(said.notice).toBe("restart now\n\npick your work back up")
})

test("a restart under maintenance is deferred and told on the rail", () => {
  const said = planRestartNotice(EVENT, { maintenance: true, reExecPending: false }, NOTICES)
  expect(said.route).toBe("rail")
  expect(said.notice).toContain("restart when you are idle")
})

test("a restart waiting on a re-exec is told on the rail", () => {
  const said = planRestartNotice(EVENT, { maintenance: false, reExecPending: true }, NOTICES)
  expect(said.route).toBe("rail")
  expect(said.notice).toContain("restart now")
})

test("maintenance outranks a pending re-exec in choosing the body", () => {
  const said = planRestartNotice(EVENT, { maintenance: true, reExecPending: true }, NOTICES)
  expect(said.notice).toContain("restart when you are idle")
})

test("an interrupt message stated with the restart is what the seat is told", () => {
  const said = planRestartNotice(
    { action: "restart-now", interruptMessage: "stop and read this" },
    { maintenance: false, reExecPending: false },
    NOTICES
  )
  expect(said.notice).toBe("stop and read this\n\npick your work back up")
})

test("an interrupt message does not displace the deferred notice under maintenance", () => {
  const said = planRestartNotice(
    { action: "restart-now", interruptMessage: "stop and read this" },
    { maintenance: true, reExecPending: false },
    NOTICES
  )
  expect(said.notice).toContain("restart when you are idle")
})

test("an empty recovery clause leaves the notice as the body alone", () => {
  const said = planRestartNotice(
    EVENT,
    { maintenance: false, reExecPending: false },
    { ...NOTICES, "restart-recovery-clause": "" }
  )
  expect(said.notice).toBe("restart now")
})
