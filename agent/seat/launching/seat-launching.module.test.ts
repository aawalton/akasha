import { expect, test } from "bun:test"
import {
  accountFor,
  envScrubArgv,
  envScrubShell,
  launchArgv,
  launching,
  launchModeFlags,
  newSessionArgv,
  paneCapArgv,
  paneCapped,
  pidIn,
  scopeArgv,
  scopeShell,
  scopeUnitFor,
  seatStartDir,
  secretsSourcedArgv,
  secretsSourcedShell,
  serverOptionArgv,
  serverOptionShell,
  shellQuoted,
  supervisorArgv,
  supervisorEntryArgv,
  supervisorEntryShell,
  underScope,
} from "akasha/agent/seat/launching/seat-launching.module.code.ts"
import {
  answer,
  asked,
  fake,
  launchedWith,
  PROXY_AT,
  ROOT,
  SECRETS_LINE,
  START_DIR,
  SUPERVISOR_AT,
} from "akasha/agent/seat/launching/seat-launching.module.test-fixtures.ts"

test("the terminal's own tmux variables are scrubbed from what a seat inherits", () => {
  expect(envScrubArgv()).toEqual([
    "env",
    "-u",
    "TMUX",
    "-u",
    "TMUX_PANE",
    "TMPDIR=/var/tmp",
    "BASH_ENV=",
  ])
  expect(envScrubShell()).toBe("env -u TMUX -u TMUX_PANE TMPDIR=/var/tmp BASH_ENV=")
})

test("a seat's scratch is named on the disk rather than in the folder held in memory", () => {
  expect(envScrubArgv()).toContain("TMPDIR=/var/tmp")
})

test("the scrub is not undone by a startup file the next bash would read", () => {
  expect(envScrubArgv()).toContain("BASH_ENV=")
  expect(envScrubShell().endsWith("BASH_ENV=")).toBe(true)
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
    "-p",
    "CPUWeight=100",
    "-p",
    "TasksMax=2000",
    "--unit=tmux-seat-athena-7",
  ])
})

test("a seat is bounded by its share rather than by a ceiling on processor time", () => {
  expect(scopeArgv("u").join(" ")).not.toContain("CPUQuota")
  expect(scopeArgv("u")).toContain("CPUWeight=100")
  expect(scopeArgv("u")).toContain("TasksMax=2000")
})

test("the shell form of a scope takes the unit already spelled", () => {
  expect(scopeShell('"--unit=$_unit"')).toBe(
    "systemd-run --user --scope --collect --quiet -p CPUWeight=100 " +
      '-p TasksMax=2000 "--unit=$_unit"'
  )
})

test("a scope unit carries the seat's name and the moment it was asked for", () => {
  expect(scopeUnitFor("athena", 1700000000000)).toBe("tmux-seat-athena-1700000000000")
})

test("the supervisor is reached through the pty proxy", () => {
  expect(supervisorEntryArgv(ROOT)).toEqual([
    "bash",
    "-c",
    SECRETS_LINE,
    "seat-supervisor",
    "bun",
    "run",
    PROXY_AT,
    "--",
    "bun",
    "run",
    SUPERVISOR_AT,
  ])
})

test("the shell form of the entry takes both paths already spelled", () => {
  expect(supervisorEntryShell('"$_root/proxy.ts"', '"$_root/sup.ts"')).toBe(
    `bash -c '${SECRETS_LINE}' seat-supervisor ` +
      'bun run "$_root/proxy.ts" -- bun run "$_root/sup.ts"'
  )
})

test("the shell starting a supervisor reads the secrets held outside the repo", () => {
  expect(secretsSourcedArgv()).toEqual(["bash", "-c", SECRETS_LINE, "seat-supervisor"])
  expect(SECRETS_LINE).toContain('. "$HOME/.secrets.env"')
})

test("every name the secrets file gives is exported to the supervisor", () => {
  expect(SECRETS_LINE.startsWith("set -a;")).toBe(true)
  expect(SECRETS_LINE).toContain("set +a;")
})

test("a secrets file that is not there is no reason to refuse the launch", () => {
  expect(SECRETS_LINE).toContain('[ -f "$HOME/.secrets.env" ] &&')
})

test("the supervisor replaces the shell that read the secrets", () => {
  expect(SECRETS_LINE.endsWith('exec "$@"')).toBe(true)
})

test("the shell form quotes the same line the argv form hands over whole", () => {
  expect(SECRETS_LINE).not.toContain("'")
  expect(secretsSourcedShell()).toBe(`bash -c '${SECRETS_LINE}' seat-supervisor`)
})

test("a launch naming no account is given the default account", () => {
  expect(accountFor(asked({ account: undefined }))).toBe("aawalton")
  expect(accountFor(asked({ account: "" }))).toBe("aawalton")
  expect(accountFor(asked({ account: "someone" }))).toBe("someone")
})

test("only a headless launch carries the headless flag", () => {
  expect(launchModeFlags(true)).toEqual(["--headless"])
  expect(launchModeFlags(false)).toEqual([])
})

test("a supervisor command line carries the agent id and the account", () => {
  expect(supervisorArgv(ROOT, asked())).toEqual([
    "bash",
    "-c",
    SECRETS_LINE,
    "seat-supervisor",
    "bun",
    "run",
    PROXY_AT,
    "--",
    "bun",
    "run",
    SUPERVISOR_AT,
    "--agent-id",
    "athena-a2de5a24130090204",
    "-a",
    "aawalton",
  ])
})

test("a headless seat carries the headless flag before its agent id", () => {
  const argv = supervisorArgv(ROOT, asked({ mode: "headless" }))
  expect(argv.indexOf("--headless")).toBe(11)
  expect(argv.indexOf("--agent-id")).toBe(12)
})

test("every flag a seat is launched with reaches the supervisor rather than the shell", () => {
  const argv = supervisorArgv(ROOT, asked({ mode: "headless" }))
  expect(argv.indexOf("--headless")).toBeGreaterThan(argv.indexOf(SECRETS_LINE))
  expect(argv[argv.indexOf(SECRETS_LINE) + 1]).toBe("seat-supervisor")
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
    "TMPDIR=/var/tmp",
    "BASH_ENV=",
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
  expect(argv.slice(0, 11)).toEqual([
    "systemd-run",
    "--user",
    "--scope",
    "--collect",
    "--quiet",
    "-p",
    "CPUWeight=100",
    "-p",
    "TasksMax=2000",
    "--unit=tmux-seat-athena-7",
    "tmux",
  ])
  expect(argv.slice(11, 15)).toEqual(["set-option", "-g", "history-limit", "50000"])
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
    "TMPDIR=/var/tmp",
    "BASH_ENV=",
    "AGENT_ID=athena-a2de5a24130090204",
    "bash",
    "-c",
    SECRETS_LINE,
    "seat-supervisor",
    "bun",
    "run",
    PROXY_AT,
    "--",
    "bun",
    "run",
    SUPERVISOR_AT,
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

test("a launch that begins the server caps the pane's scope as well", async () => {
  const { how, calls } = launchedWith((cmd) =>
    cmd[1] === "list-sessions" ? answer({ code: 1 }) : null
  )
  await launching(asked(), ROOT, how)
  expect(calls).toContainEqual(paneCapArgv("tmux-spawn-a.scope"))
})

test("a cap the scope would not take is reported rather than refusing the launch", async () => {
  const { how } = launchedWith((cmd) =>
    cmd[0] === "systemctl" ? answer({ code: 1, err: "Access denied" }) : null
  )
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({
    launched: { name: "athena", pid: 4242, uncapped: expect.stringContaining("Access denied") },
  })
})

test("a pane in no scope tmux made is reported uncapped and nothing is set", async () => {
  const { how, calls } = launchedWith((cmd) =>
    cmd[0] === "cat" ? answer({ out: "0::/user.slice/app.slice/tmux-seat-athena-7.scope" }) : null
  )
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({
    launched: {
      name: "athena",
      pid: 4242,
      uncapped: expect.stringContaining("no scope tmux made"),
    },
  })
  expect(calls.some((one) => one[0] === "systemctl")).toBe(false)
})

test("a seat that exited at boot is refused before its pane is capped", async () => {
  const { how, calls } = fake(
    (cmd) => {
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      if (cmd[1] === "display-message") return answer({ out: "4242" })
      return answer()
    },
    [false, false]
  )
  await launching(asked(), ROOT, how)
  expect(calls.some((one) => one[0] === "cat" || one[0] === "systemctl")).toBe(false)
})

test("a revived pane's fresh scope is capped", async () => {
  const { how, calls } = launchedWith(() => null)
  expect(await paneCapped("athena", 5151, how)).toBe(null)
  expect(calls).toEqual([["cat", "/proc/5151/cgroup"], paneCapArgv("tmux-spawn-a.scope")])
})

test("a revived pane's refused cap is reported", async () => {
  const { how } = launchedWith((cmd) => (cmd[0] === "systemctl" ? answer({ code: 1 }) : null))
  expect(await paneCapped("athena", 5151, how)).toContain("would not take `TasksMax=2000`")
})

test("a launch onto a running server reports the pane pid", async () => {
  const { how, calls } = launchedWith(() => null)
  const said = await launching(asked(), ROOT, how)
  expect(said).toEqual({ launched: { name: "athena", pid: 4242, uncapped: null } })
  expect(calls).toContainEqual(paneCapArgv("tmux-spawn-a.scope"))
  expect(calls.some((one) => one[0] === "systemd-run")).toBe(false)
  expect(calls).toContainEqual(["tmux", "set-option", "-w", "-t", "%7", "remain-on-exit", "on"])
})

test("the pane pid is asked of the pane rather than of the session", async () => {
  const { how, calls } = fake(
    (cmd) => {
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      if (cmd[1] === "display-message") return answer({ out: "4242" })
      return answer()
    },
    [false, true]
  )
  await launching(asked(), ROOT, how)

  expect(calls).toContainEqual(["tmux", "display-message", "-p", "-t", "%7", "#{pane_pid}"])
})

test("a session holding no pane is refused", async () => {
  const { how } = fake(
    (cmd) => (cmd[1] === "list-panes" ? answer({ code: 1 }) : answer({ out: "4242" })),
    [false]
  )
  const said = await launching(asked(), ROOT, how)

  expect(said).toEqual({ refused: expect.stringContaining("holds no pane") })
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
  expect(launch?.[9]).toBe("--unit=tmux-seat-athena-1700000000000")
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
