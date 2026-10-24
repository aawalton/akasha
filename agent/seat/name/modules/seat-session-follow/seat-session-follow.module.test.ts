import { expect, test } from "bun:test"
import {
  ancestorsOf,
  panesIn,
  seatSessionFollowPoll,
  sessionHolding,
} from "akasha/agent/seat/name/modules/seat-session-follow/seat-session-follow.module.code.ts"

const LISTED = [
  "10\tamy\t1\t1",
  "20\tcouples-therapy-couples-therapist\t1\t1",
  "30\tmain\t2\t1",
].join("\n")

test("the session found is the lone pane among the supervisor's processes", () => {
  const panes = panesIn(LISTED)
  expect(sessionHolding(panes, [99, 21, 20, 1])).toBe("couples-therapy-couples-therapist")
  expect(sessionHolding(panes, [99, 1])).toBeNull()
})

test("a session holding more than one pane is never found", () => {
  expect(sessionHolding(panesIn(LISTED), [99, 30, 1])).toBeNull()
})

test("a process's ancestors run up to the first one with no parent", () => {
  const parents: Record<number, number> = { 99: 21, 21: 20, 20: 1 }
  expect(ancestorsOf(99, (pid) => parents[pid] ?? null)).toEqual([99, 21, 20, 1])
})

function following(name: string) {
  const renamed: (readonly [string | null, string])[] = []
  const lines: string[] = []
  const poll = seatSessionFollowPoll({
    getAgentId: () => "agent",
    log: (line) => {
      lines.push(line)
    },
    readName: () => name,
    listPanes: async () => LISTED,
    ancestors: () => [99, 21, 20, 1],
    rename: (was, now) => {
      renamed.push([was, now])
      return { kind: "renamed" }
    },
  })
  return { poll, renamed, lines }
}

test("a seat renamed takes its tmux session with it, once", async () => {
  const { poll, renamed, lines } = following("claudius")
  await poll.run()
  await poll.run()
  expect(renamed).toEqual([["couples-therapy-couples-therapist", "claudius"]])
  expect(lines[0]).toContain("moved with it")
})

test("a session already named for its seat is left alone", async () => {
  const { poll, renamed } = following("couples-therapy-couples-therapist")
  await poll.run()
  expect(renamed).toEqual([])
})
