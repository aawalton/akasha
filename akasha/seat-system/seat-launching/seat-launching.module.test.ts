import { expect, test } from "bun:test"
import {
  type Answer,
  accountFor,
  envScrubArgv,
  envScrubShell,
  isSeatMode,
  launchArgv,
  launching,
  launchModeFlags,
  newSessionArgv,
  pidIn,
  type SeatLaunch,
  type Spawning,
  scopeArgv,
  scopeShell,
  scopeUnitFor,
  seatStartDir,
  serverOptionArgv,
  serverOptionShell,
  shellQuoted,
  supervisorArgv,
  supervisorEntryArgv,
  supervisorEntryShell,
  underScope,
} from "./seat-launching.module.code.ts"

const ROOT = "/repos/akasha"

const START_DIR = "/repos"

function asked(over: Partial<SeatLaunch> = {}): SeatLaunch {
  return {
    name: "athena",
    agentId: "athena-a2de5a24130090204",
    account: "aawalton",
    prompt: "",
    mode: "interactive",
    ...over,
  }
}

function answer(over: Partial<Answer> = {}): Answer {
  return { code: 0, out: "", err: "", ...over }
}

function fake(
  answers: (cmd: readonly string[]) => Answer,
  held: readonly boolean[]
): { readonly how: Spawning; readonly calls: readonly (readonly string[])[] } {
  const calls: (readonly string[])[] = []
  const heldAt = [...held]
  const how: Spawning = {
    ran: (cmd) => {
      calls.push(cmd)
      return Promise.resolve(answers(cmd))
    },
    held: () => Promise.resolve(heldAt.shift() ?? false),
    at: () => 1700000000000,
    settle: () => Promise.resolve(),
  }
  return { how, calls }
}

test("the terminal's own tmux variables are scrubbed from what a seat inherits", () => {
  expect(envScrubArgv()).toEqual(["env", "-u", "TMUX", "-u", "TMUX_PANE"])
  expect(envScrubShell()).toBe("env -u TMUX -u TMUX_PANE")
})

test("each server option is closed off from the next", () => {
  expect(serverOptionArgv()).toEqual([
    "set-option",
    "-g",
    "history-limit",
    "50000",
    ";",
    "set-option",
    "-g",
    "status",
    "off",
    ";",
    "set-option",
    "-g",
    "remain-on-exit",
    "failed",
    ";",
  ])
})

test("the shell form of the server options escapes each separator", () => {
  expect(serverOptionShell()).toBe(
    "set-option -g history-limit 50000 \\; set-option -g status off \\; " +
      "set-option -g remain-on-exit failed"
  )
})

test("a scope is a collected quiet user scope under the unit it is given", () => {
  expect(scopeArgv("tmux-seat-athena-7")).toEqual([
    "systemd-run",
    "--user",
    "--scope",
    "--collect",
    "--quiet",
    "--unit=tmux-seat-athena-7",
  ])
})

test("the shell form of a scope takes the unit already spelled", () => {
  expect(scopeShell('"--unit=$_unit"')).toBe(
    'systemd-run --user --scope --collect --quiet "--unit=$_unit"'
  )
})

test("a scope unit carries the seat's name and the moment it was asked for", () => {
  expect(scopeUnitFor("athena", 1700000000000)).toBe("tmux-seat-athena-1700000000000")
})

test("the supervisor is reached through the pty proxy", () => {
  expect(supervisorEntryArgv(ROOT)).toEqual([
    "bun",
    "run",
    "/repos/akasha/akasha/seat-system/pty-proxy/pty-proxy.module.code.ts",
    "--",
    "bun",
    "run",
    "/repos/akasha/tools/run-supervisor.ts",
  ])
})

test("the shell form of the entry takes both paths already spelled", () => {
  expect(supervisorEntryShell('"$_root/proxy.ts"', '"$_root/sup.ts"')).toBe(
    'bun run "$_root/proxy.ts" -- bun run "$_root/sup.ts"'
  )
})

test("a launch naming no account is given the default account", () => {
  expect(accountFor(asked({ account: undefined }))).toBe("aawalton")
  expect(accountFor(asked({ account: "" }))).toBe("aawalton")
  expect(accountFor(asked({ account: "someone" }))).toBe("someone")
})

test("a mode is one of the two a seat starts in", () => {
  expect(isSeatMode("interactive")).toBe(true)
  expect(isSeatMode("headless")).toBe(true)
  expect(isSeatMode("Headless")).toBe(false)
  expect(isSeatMode("")).toBe(false)
})

test("only a headless launch carries the headless flag", () => {
  expect(launchModeFlags(true)).toEqual(["--headless"])
  expect(launchModeFlags(false)).toEqual([])
})

test("a supervisor command line carries the agent id and the account", () => {
  expect(supervisorArgv(ROOT, asked())).toEqual([
    "bun",
    "run",
    "/repos/akasha/akasha/seat-system/pty-proxy/pty-proxy.module.code.ts",
    "--",
    "bun",
    "run",
    "/repos/akasha/tools/run-supervisor.ts",
    "--agent-id",
    "athena-a2de5a24130090204",
    "-a",
    "aawalton",
  ])
})

test("a headless seat carries the headless flag before its agent id", () => {
  const argv = supervisorArgv(ROOT, asked({ mode: "headless" }))
  expect(argv.indexOf("--headless")).toBe(7)
  expect(argv.indexOf("--agent-id")).toBe(8)
})

test("an empty prompt is left off rather than given as an empty word", () => {
  expect(supervisorArgv(ROOT, asked()).at(-1)).toBe("aawalton")
})

test("a prompt that was given is the last word of the command line", () => {
  expect(supervisorArgv(ROOT, asked({ prompt: "read the page" })).at(-1)).toBe("read the page")
})

test("the overrides follow the account in the order they are declared", () => {
  const argv = supervisorArgv(
    ROOT,
    asked({
      modelOverride: "opus",
      anthropicBaseUrl: "http://here",
      anthropicAuthToken: "tok",
    })
  )
  expect(argv.slice(argv.indexOf("aawalton") + 1)).toEqual([
    "--model",
    "opus",
    "--anthropic-base-url",
    "http://here",
    "--anthropic-auth-token",
    "tok",
  ])
})

test("a resumed seat names its session and asks to resume", () => {
  const argv = supervisorArgv(ROOT, asked({ resumeSessionId: "sess-1", prompt: "go" }))
  expect(argv.slice(-4)).toEqual(["--session-id", "sess-1", "--resume", "go"])
})

test("a session is started detached under the seat's name in the start directory", () => {
  expect(newSessionArgv(asked(), START_DIR, ["bun", "run", "sup.ts"])).toEqual([
    "new-session",
    "-d",
    "-s",
    "athena",
    "-c",
    "/repos",
    "--",
    "env",
    "-u",
    "TMUX",
    "-u",
    "TMUX_PANE",
    "AGENT_ID=athena-a2de5a24130090204",
    "bun",
    "run",
    "sup.ts",
  ])
})

test("a launch onto a server already up carries neither scope nor server options", () => {
  expect(underScope(["new-session", "-d"], null)).toEqual(["tmux", "new-session", "-d"])
})

test("a launch that begins the server puts it in a scope and gives the server options", () => {
  const argv = underScope(["new-session", "-d"], "tmux-seat-athena-7")
  expect(argv.slice(0, 7)).toEqual([
    "systemd-run",
    "--user",
    "--scope",
    "--collect",
    "--quiet",
    "--unit=tmux-seat-athena-7",
    "tmux",
  ])
  expect(argv.slice(7, 11)).toEqual(["set-option", "-g", "history-limit", "50000"])
  expect(argv.slice(-2)).toEqual(["new-session", "-d"])
})

test("the whole launch is composed from the seat alone", () => {
  expect(
    launchArgv({
      asked: asked({ mode: "headless" }),
      root: ROOT,
      startDir: START_DIR,
      scopeUnit: null,
    })
  ).toEqual([
    "tmux",
    "new-session",
    "-d",
    "-s",
    "athena",
    "-c",
    "/repos",
    "--",
    "env",
    "-u",
    "TMUX",
    "-u",
    "TMUX_PANE",
    "AGENT_ID=athena-a2de5a24130090204",
    "bun",
    "run",
    "/repos/akasha/akasha/seat-system/pty-proxy/pty-proxy.module.code.ts",
    "--",
    "bun",
    "run",
    "/repos/akasha/tools/run-supervisor.ts",
    "--headless",
    "--agent-id",
    "athena-a2de5a24130090204",
    "-a",
    "aawalton",
  ])
})

test("a seat begins in the folder above the akasha checkout", () => {
  expect(seatStartDir("/home/me/repos/akasha")).toBe("/home/me/repos")
})

test("a quoted line closes every single quote it carries", () => {
  expect(shellQuoted(["echo", "it's here"])).toBe("'echo' 'it'\\''s here'")
})

test("a pane pid is read only where it is a whole number above zero", () => {
  expect(pidIn("4242")).toBe(4242)
  expect(pidIn("")).toBe(null)
  expect(pidIn("0")).toBe(null)
  expect(pidIn("-3")).toBe(null)
  expect(pidIn("nothing")).toBe(null)
})

test("a name a live session already carries refuses the launch", async () => {
  const { how, calls } = fake(() => answer(), [true])
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({
    refused: expect.stringContaining("already carried by a live tmux session"),
  })
  expect(calls).toEqual([])
})

test("a launch onto a running server reports the pane pid", async () => {
  const { how, calls } = fake(
    (cmd) => {
      if (cmd[1] === "list-sessions") return answer()
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      if (cmd[1] === "display-message") return answer({ out: "4242" })
      return answer()
    },
    [false, true]
  )
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({ launched: { name: "athena", pid: 4242 } })
  expect(calls.some((one) => one[0] === "systemd-run")).toBe(false)
  expect(calls).toContainEqual(["tmux", "set-option", "-w", "-t", "%7", "remain-on-exit", "on"])
})

test("a launch with no server up begins one inside a scope", async () => {
  const { how, calls } = fake(
    (cmd) => {
      if (cmd[1] === "list-sessions") return answer({ code: 1 })
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      if (cmd[1] === "display-message") return answer({ out: "4242" })
      return answer()
    },
    [false, true]
  )
  await launching(asked(), ROOT, how)
  const launch = calls.find((one) => one[0] === "systemd-run")
  expect(launch?.[5]).toBe("--unit=tmux-seat-athena-1700000000000")
})

test("tmux refusing the launch is answered with what tmux said", async () => {
  const { how } = fake(
    (cmd) => {
      if (cmd[1] === "list-sessions") return answer()
      if (cmd[1] === "new-session") return answer({ code: 1, err: "duplicate session" })
      return answer()
    },
    [false]
  )
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({ refused: expect.stringContaining("duplicate session") })
})

test("a session naming no pane pid is refused", async () => {
  const { how } = fake(
    (cmd) => {
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      return answer()
    },
    [false]
  )
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({ refused: expect.stringContaining("named no pane pid") })
})

test("a seat gone once it has had a moment to boot is refused", async () => {
  const { how } = fake(
    (cmd) => {
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      if (cmd[1] === "display-message") return answer({ out: "4242" })
      return answer()
    },
    [false, false]
  )
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({ refused: expect.stringContaining("exited as soon as it began") })
})
