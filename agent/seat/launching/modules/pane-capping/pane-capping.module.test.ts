import { expect, test } from "bun:test"
import {
  type Answer,
  type Probing,
  paneCapArgv,
  paneCapped,
} from "akasha/agent/seat/launching/modules/pane-capping/pane-capping.module.code.ts"
import { answer } from "akasha/agent/seat/launching/seat-launching.module.test-fixtures.ts"

const SPAWN_GROUP = "0::/user.slice/seats.slice/tmux-spawn-a.scope"

const SHARED_GROUP = "0::/user.slice/seats.slice/tmux-seat-alan-7.scope"

const SHARED_TASKS = "/sys/fs/cgroup/user.slice/seats.slice/tmux-seat-alan-7.scope/pids.max"

function probed(answers: (cmd: readonly string[]) => Answer): {
  readonly how: Probing
  readonly calls: readonly (readonly string[])[]
} {
  const calls: (readonly string[])[] = []
  let now = 0
  const how: Probing = {
    ran: (cmd) => {
      calls.push(cmd)
      return Promise.resolve(answers(cmd))
    },
    at: () => now,
    settle: (ms) => {
      now += ms
      return Promise.resolve()
    },
  }
  return { how, calls }
}

function shared(tasks: string): (cmd: readonly string[]) => Answer {
  return (cmd) => {
    if (cmd[1] === SHARED_TASKS) return answer({ out: tasks })
    if (cmd[1]?.endsWith("/pids.max") === true) return answer({ out: "max" })
    return cmd[0] === "cat" ? answer({ out: SHARED_GROUP }) : answer()
  }
}

test("a pane's cap is set on its scope for this run of the manager alone", () => {
  expect(paneCapArgv("tmux-spawn-a.scope")).toEqual([
    "systemctl",
    "--user",
    "set-property",
    "--runtime",
    "tmux-spawn-a.scope",
    "TasksMax=2000",
  ])
})

test("a pane in a scope tmux made is given the bound on that scope", async () => {
  const { how, calls } = probed((cmd) => answer({ out: cmd[0] === "cat" ? SPAWN_GROUP : "" }))
  expect(await paneCapped("athena", 5151, how)).toBe(null)
  expect(calls).toEqual([["cat", "/proc/5151/cgroup"], paneCapArgv("tmux-spawn-a.scope")])
})

test("a scope that would not take the bound is reported", async () => {
  const { how } = probed((cmd) =>
    cmd[0] === "cat" ? answer({ out: SPAWN_GROUP }) : answer({ code: 1, err: "Access denied" })
  )
  expect(await paneCapped("athena", 5151, how)).toContain("would not take `TasksMax=2000`")
})

test("a pane reaching the scope its launch made carries its bound already", async () => {
  let asks = 0
  const { how, calls } = probed(() => {
    asks += 1
    return answer({
      out: asks < 4 ? SHARED_GROUP : "0::/user.slice/seats.slice/tmux-pane-athena-7.scope/agent",
    })
  })
  expect(await paneCapped("athena", 5151, how)).toBe(null)
  expect(asks).toBe(4)
  expect(calls.some((one) => one[0] === "systemctl")).toBe(false)
})

test("a pane left in a shared scope names that scope and the cap reaching it", async () => {
  const { how, calls } = probed(shared("2000"))
  expect(await paneCapped("athena", 5151, how)).toBe(
    "the pane of `athena` sits in `tmux-seat-alan-7.scope` rather than a scope of its own " +
      "('/user.slice/seats.slice/tmux-seat-alan-7.scope'), so the `pids.max` of 2000 on " +
      "`tmux-seat-alan-7.scope` is shared by every process under `tmux-seat-alan-7.scope`"
  )
  expect(calls.filter((one) => one[1] === "/proc/5151/cgroup").length).toBe(301)
  expect(calls.some((one) => one[0] === "systemctl")).toBe(false)
})

test("a shared scope with no cap above it says no cap reaches the pane", async () => {
  const { how } = probed(shared("max"))
  expect(await paneCapped("athena", 5151, how)).toContain("and no `pids.max` reaches it")
})

test("a pane gone before its scope is read is reported rather than waited for", async () => {
  const { how, calls } = probed(() => answer({ code: 1, err: "No such file or directory" }))
  expect(await paneCapped("athena", 5151, how)).toContain("was gone before its scope was read")
  expect(calls.length).toBe(1)
})
