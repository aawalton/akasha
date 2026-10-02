import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  ACTING_NAMED,
  SEAT_NAMED,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  INSIDE,
  OUTSIDE,
  runsOutside,
} from "akasha/agent/modules/shell-confining/shell-confining.module.code.ts"
import {
  bareBin,
  bwrapHanded,
  CHANGE,
  FED,
  FED_BODY,
  FENCE,
  fedBy,
  type Held,
  heldIn,
  homeOf,
  lineOf,
  runtimeIn,
  SCRIPT,
  scriptIn,
} from "akasha/agent/modules/shell-confining/shell-confining.module.test-fixtures.ts"
import { NOTICE_AT } from "akasha/agent/modules/withheld-hiding/withheld-hiding.module.code.ts"
import { ran, type Said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const CODE = join(import.meta.dir, "shell-confining.module.code.ts")

const SCRATCH = scratchWorld()

afterAll(() => SCRATCH.sweep())

function heldAnew(): Held {
  return heldIn(SCRATCH.rootFor("shell-confining-"))
}

function confining(
  held: Held,
  line: string,
  script = SCRIPT,
  env: Readonly<Record<string, string>> = {}
): Said {
  return ran(["bash", script, line], {
    env: {
      ...process.env,
      AKASHA_ROOT: held.root,
      PATH: `${held.bin}:${SHAPE.string().parse(process.env["PATH"])}`,
      ...env,
    },
  })
}

function agentsLine(held: Held, command: string): string {
  return lineOf(command, FED, held.cwd)
}

test("an akasha call alone on the line runs outside", () => {
  expect(runsOutside(lineOf("akasha audit --check typecheck"))).toBe(true)
  expect(runsOutside(lineOf("akasha"))).toBe(true)
  expect(runsOutside(lineOf("akasha page show 'routes/a.$b.ts'"))).toBe(true)
})

test("a lone akasha call after a plain cd runs outside", () => {
  expect(runsOutside(lineOf("cd '/x y' && cd ~/z && akasha audit"))).toBe(true)
  expect(runsOutside(lineOf(`export ${ACTING_NAMED}='01a0-x'\ncd /x && akasha audit`))).toBe(true)
})

test("an approved change runs outside, heredoc and all", () => {
  expect(runsOutside(lineOf(CHANGE, ""))).toBe(true)
})

test("the name a subagent's call is given is read past", () => {
  const named = `export ${ACTING_NAMED}='01a0-x_y'\n`

  expect(runsOutside(lineOf(`${named}${CHANGE}`, ""))).toBe(true)
  expect(runsOutside(lineOf(`${named}akasha audit`))).toBe(true)
})

test("a call with anything else on the line runs inside", () => {
  for (const command of [
    "akasha audit 2>&1 | tail -40",
    "akasha audit; touch a.ts",
    "akasha audit && touch a.ts",
    'akasha audit "$(touch a.ts)"',
    "akasha audit `touch a.ts`",
    "akasha audit > a.ts",
    "akasha audit &",
    "akasha audit\ntouch a.ts",
    "cd /x && akasha audit | tail",
    "cd /x; akasha audit",
    "cd $(touch a.ts) && akasha audit",
    "cd /x && touch a.ts && akasha audit",
    "akashax audit",
    "touch a.ts",
    `${CHANGE}\ntouch a.ts`,
  ]) {
    expect(runsOutside(lineOf(command))).toBe(false)
  }
})

test("a lone call whose arguments are plain quoted words runs outside", () => {
  for (const command of [
    'akasha search --pattern "elapsed ceiling" --within domain --files-only',
    'akasha search --pattern "clock|four times" --within domain',
    "akasha search --pattern 'clock|four times' --within domain",
    'akasha search --pattern="a b;c&d" --within "agent/x (y)"',
    `akasha search --pattern "it's" --within 'say "so"'`,
    'akasha search --pattern ""',
  ]) {
    expect(runsOutside(lineOf(command))).toBe(true)
  }
})

test("a lone call whose double quotes hold escaped characters runs outside", () => {
  for (const command of [
    'akasha seat send --to nobody --body "say \\"hi\\" now"',
    'akasha search --pattern "a\\nb"',
    'akasha search --pattern "a\\\\b"',
    'akasha search --pattern "cost \\$5 and \\`no\\` call"',
  ]) {
    expect(runsOutside(lineOf(command))).toBe(true)
  }
})

test("a lone call fed a heredoc with a quoted delimiter runs outside, body and all", () => {
  const opening = `akasha seat send --to nobody --body-file - <<'${FENCE}'`
  expect(runsOutside(lineOf(fedBy(opening, FED_BODY), ""))).toBe(true)
  expect(
    runsOutside(lineOf(fedBy("akasha seat send --body-file - <<'EOF'", FED_BODY, "EOF"), ""))
  ).toBe(true)
})

test("a heredoc the shell would rewrite, or that does not end the call, runs inside", () => {
  const send = "akasha seat send --to nobody --body-file -"
  for (const command of [
    fedBy(`${send} <<${FENCE}`, FED_BODY),
    fedBy(`${send} <<"${FENCE}"`, FED_BODY),
    fedBy(`${send} <<'${FENCE}'`, [...FED_BODY, FENCE, "touch a.ts"]),
    `${fedBy(`${send} <<'${FENCE}'`, FED_BODY)}\ntouch a.ts`,
    fedBy(`${send} <<'${FENCE}' | cat`, FED_BODY),
    fedBy(`${send} "$(touch a.ts)" <<'${FENCE}'`, FED_BODY),
    [`${send} <<'${FENCE}'`, ...FED_BODY].join("\n"),
    `${send} <<'${FENCE}'`,
  ]) {
    expect(runsOutside(lineOf(command, ""))).toBe(false)
  }
})

test("a lone call whose double quotes the shell would rewrite runs inside", () => {
  for (const command of [
    'akasha search --pattern "$HOME"',
    'akasha search --pattern "a${HOME}b"',
    'akasha search --pattern "$(touch a.ts)"',
    'akasha search --pattern "`touch a.ts`"',
    'akasha search --pattern "a\\\\$(touch a.ts)"',
    'akasha search --pattern "a\\\\`touch a.ts`"',
    'akasha search --pattern "say \\"hi\\" $(touch a.ts)"',
    'akasha search --pattern \\"hi\\"',
    "akasha search --pattern \\'hi\\'",
    'akasha search --pattern "open',
    'akasha search --pattern "a" | cat',
    'akasha search --pattern "a"; touch a.ts',
    'akasha search --pattern "a" > a.ts',
    `akasha search --pattern ${"a'b'\"c\"".repeat(4000)}$`,
  ]) {
    expect(runsOutside(lineOf(command))).toBe(false)
  }
})

test("an assignment before akasha keeps the call inside", () => {
  expect(runsOutside(lineOf("AKASHA_ROOT=/var/tmp/x akasha change apply"))).toBe(false)
  expect(runsOutside(lineOf("PATH=/var/tmp/x akasha audit"))).toBe(false)
})

test("a line the harness did not wrap is no agent's call and is not let out here", () => {
  expect(runsOutside("akasha audit")).toBe(false)
})

test("run on its own, the module answers which side a line runs on", () => {
  expect(ran(["bun", CODE, lineOf("akasha audit")]).out).toBe(OUTSIDE)
  expect(ran(["bun", CODE, lineOf("touch a.ts")]).out).toBe(INSIDE)
})

test("the script runs a command the harness starts for itself as it was handed", () => {
  const held = heldAnew()

  confining(held, `touch ${held.root}/by-harness`)

  expect(existsSync(join(held.root, "by-harness"))).toBe(true)
  expect(bwrapHanded(held)).toBeNull()
})

test("the script hands an agent's call to bwrap with the checkout read-only", () => {
  const held = heldAnew()
  const line = agentsLine(held, "true")

  confining(held, line)

  const handed = bwrapHanded(held) ?? ""
  expect(handed).toStartWith("--dev-bind\n/\n/\n")
  expect(handed).toContain(`--ro-bind\n${held.root}\n${held.root}\n`)
  expect(handed).toEndWith(`--\nbash\n-c\n${line}\n`)
})

test("the script lets an akasha call alone on the line write the checkout", () => {
  const held = heldAnew()

  confining(held, agentsLine(held, "akasha"))

  expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
  expect(bwrapHanded(held)).toBeNull()
})

test("the script lets out a lone akasha call after a cd, and says so where it keeps one in", () => {
  const out = heldAnew()
  const kept = heldAnew()

  confining(out, agentsLine(out, "cd /tmp && akasha story turn advance --turn t"))
  const said = confining(kept, agentsLine(kept, "cd /tmp && akasha | cat"))

  expect(existsSync(join(out.root, "by-akasha"))).toBe(true)
  expect(bwrapHanded(out)).toBeNull()
  expect(bwrapHanded(kept)).not.toBeNull()
  expect(said.err).toContain("shell-confinement:")
})

test("the script lets a lone akasha call with a double-quoted pattern write the checkout", () => {
  const held = heldAnew()

  confining(held, agentsLine(held, 'akasha search --pattern "clock|four times" --files-only'))

  expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
  expect(bwrapHanded(held)).toBeNull()
})

test("the script lets a lone akasha call with escaped quotes or fed a heredoc write the checkout", () => {
  for (const [command, fed] of [
    ['akasha seat send --to nobody --body "say \\"hi\\""', FED],
    [fedBy(`akasha seat send --to nobody --body-file - <<'${FENCE}'`, FED_BODY), ""],
  ] as const) {
    const held = heldAnew()

    confining(held, lineOf(command, fed, held.cwd))

    expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
    expect(bwrapHanded(held)).toBeNull()
  }
})

test("the script keeps a lone akasha call with a substitution in double quotes inside", () => {
  const held = heldAnew()

  confining(held, agentsLine(held, 'akasha search --pattern "$(true)"'))

  expect(bwrapHanded(held) ?? "").toContain(`--ro-bind\n${held.root}\n${held.root}\n`)
})

test("the script keeps an akasha call with more on the line inside, and says so", () => {
  const held = heldAnew()

  const said = confining(held, agentsLine(held, "touch a.ts\nakasha | cat"))

  expect(bwrapHanded(held) ?? "").toContain(`--ro-bind\n${held.root}\n${held.root}\n`)
  expect(said.err).toContain("shell-confinement:")
})

function heldOverLore(): Held {
  const held = heldAnew()
  const root = loreWorld(SCRATCH)
  mkdirSync(dirname(join(root, LORE_AT)), { recursive: true })
  writeFileSync(join(root, LORE_AT), "held\n")
  return { ...held, root }
}

function confiningAs(held: Held, seat: string, line: string, path?: string): Said {
  mkdirSync(homeOf(held), { recursive: true })
  return ran(["bash", SCRIPT, line], {
    env: {
      ...process.env,
      AKASHA_ROOT: held.root,
      HOME: homeOf(held),
      [SEAT_NAMED]: seat,
      PATH: path ?? `${held.bin}:${SHAPE.string().parse(process.env["PATH"])}`,
    },
  })
}

test("a game master's call reads each withheld page as the refusal, with no network", () => {
  const held = heldOverLore()
  const line = agentsLine(held, "true")

  confiningAs(held, GAME_MASTER_SEAT, line)

  const handed = bwrapHanded(held) ?? ""
  const notice = join(homeOf(held), NOTICE_AT)
  expect(handed).toContain("--unshare-net\n")
  expect(handed).toContain(`--ro-bind\n${notice}\n${join(held.root, LORE_AT)}\n`)
  expect(handed).toEndWith(`--\nbash\n-c\n${line}\n`)
})

test("another seat's call is hidden nothing", () => {
  const held = heldOverLore()

  confiningAs(held, OTHER_SEAT, agentsLine(held, "true"))

  expect(bwrapHanded(held) ?? "").not.toContain("--unshare-net")
})

test("a game master's call on a machine with no bwrap is refused and runs nothing", () => {
  const held = heldOverLore()
  const made = join(dirname(held.bin), "made")

  const said = confiningAs(held, GAME_MASTER_SEAT, agentsLine(held, `touch ${made}`), bareBin(held))

  expect(existsSync(made)).toBe(false)
  expect(said.code).not.toBe(0)
  expect(said.err).toContain("shell-confinement:")
})

test("every seat's call on a machine with no bwrap is refused and runs nothing", () => {
  const held = heldOverLore()
  const made = join(dirname(held.bin), "made")

  const said = confiningAs(held, OTHER_SEAT, agentsLine(held, `touch ${made}`), bareBin(held))

  expect(existsSync(made)).toBe(false)
  expect(said.code).not.toBe(0)
  expect(said.err).toContain("shell-confinement:")
})

test("an akasha call alone on the line still runs outside on a machine with no bwrap", () => {
  const held = heldOverLore()
  const bare = bareBin(held)
  symlinkSync(join(held.bin, "akasha"), join(bare, "akasha"))

  confiningAs(held, OTHER_SEAT, agentsLine(held, "akasha"), bare)

  expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
})

function scriptOverJudge(judge: string | null): string {
  return scriptIn(SCRATCH.rootFor("shell-confining-tree-"), judge)
}

test("a copy of the script beside the judge itself lets an akasha call alone out", () => {
  const held = heldAnew()

  confining(held, agentsLine(held, "akasha"), scriptOverJudge(null))

  expect(bwrapHanded(held)).toBeNull()
})

test("a judge that fails, says nothing or says anything but out keeps the call confined", () => {
  for (const judge of [
    'process.stdout.write("out")\nthrow new Error("broken")\n',
    "",
    'process.stdout.write("outside")\n',
    'process.stdout.write("in out")\n',
  ]) {
    const held = heldAnew()

    const said = confining(held, agentsLine(held, "akasha"), scriptOverJudge(judge))

    expect(bwrapHanded(held) ?? "").toContain(`--ro-bind\n${held.root}\n${held.root}\n`)
    expect(said.err).toContain("shell-confinement:")
  }
})

test("every seat's call reaches no bus and nothing of the runtime folder but logs and ssh", () => {
  const held = heldAnew()
  const runtime = runtimeIn(SCRATCH.rootFor("shell-confining-runtime-"))
  const logs = join(runtime, "akasha")
  const ssh = join(runtime, "ssh-agent.socket")

  confining(held, agentsLine(held, "true"), SCRIPT, {
    XDG_RUNTIME_DIR: runtime,
    SSH_AUTH_SOCK: ssh,
  })

  const handed = bwrapHanded(held) ?? ""
  const emptied = handed.indexOf(`--tmpfs\n${runtime}\n`)
  expect(emptied).toBeGreaterThan(-1)
  expect(handed.indexOf(`--ro-bind\n${logs}\n${logs}\n`)).toBeGreaterThan(emptied)
  expect(handed.indexOf(`--bind\n${ssh}\n${ssh}\n`)).toBeGreaterThan(emptied)
  expect(handed).not.toContain(join(runtime, "bus"))
  expect(handed).not.toContain(join(runtime, "systemd"))
  expect(handed).toContain("--unsetenv\nDBUS_SESSION_BUS_ADDRESS\n")
  expect(handed.includes("--tmpfs\n/run/dbus\n")).toBe(existsSync("/run/dbus"))
})

test("every seat's call reaches no tmux server, under /tmp or under TMUX_TMPDIR", () => {
  const held = heldAnew()
  const uid = process.getuid?.() ?? 0
  const elsewhere = SCRATCH.rootFor("shell-confining-tmux-")
  const sockets = join(elsewhere, `tmux-${uid}`)
  mkdirSync(sockets)

  confining(held, agentsLine(held, "true"), SCRIPT, {
    TMUX_TMPDIR: elsewhere,
    TMUX: `${sockets}/default,1,0`,
    TMUX_PANE: "%1",
  })

  const handed = bwrapHanded(held) ?? ""
  expect(handed).toContain(`--tmpfs\n${sockets}\n`)

  expect(handed).toContain("--unsetenv\nTMUX\n")
  expect(handed).toContain("--unsetenv\nTMUX_PANE\n")
})

test("a game master's akasha call alone on the line still runs outside", () => {
  const held = heldOverLore()

  confiningAs(held, GAME_MASTER_SEAT, agentsLine(held, "akasha"))

  expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
  expect(bwrapHanded(held)).toBeNull()
})
