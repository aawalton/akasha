import { afterAll, expect, test } from "bun:test"
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
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
import { NOTICE_AT } from "akasha/agent/modules/withheld-hiding/withheld-hiding.module.code.ts"
import { ran, type Said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const CODE = join(import.meta.dir, "shell-confining.module.code.ts")

const FENCE = "HEREDOC"

const CHANGE = [`akasha change apply --draft change-file <<'${FENCE}'`, "at: a.ts", FENCE].join(
  "\n"
)

const FED = " < /dev/null"

const SCRIPT_AT = join(
  "code",
  "shell-script",
  "pages",
  "shell-confinement",
  "shell-confinement.shell-script.shell.sh"
)

const JUDGE_AT = join("agent", "modules", "shell-confining", "shell-confining.module.code.ts")

const HIDER_AT = join("agent", "modules", "withheld-hiding", "withheld-hiding.module.code.ts")

const SCRIPT = join(codeRoot(), SCRIPT_AT)

const OWN_AKASHA = '#!/usr/bin/env bash\ntouch "$AKASHA_ROOT/by-akasha"\n'

const BWRAP_HANDED = "bwrap-handed"

const OWN_BWRAP = [
  "#!/usr/bin/env bash",
  `printf "%s\\n" "$@" > "$(dirname "$0")/${BWRAP_HANDED}"`,
  "while [[ $1 != -- ]]; do shift; done",
  "shift",
  'exec "$@"',
  "",
].join("\n")

function lineOf(command: string, fed = FED, cwdAt = "/var/tmp/claude-ab12-cwd"): string {
  const quoted = command.replaceAll("'", `'"'"'`)
  return `source /s/snapshot.sh 2>/dev/null || true && eval '${quoted}'${fed} && pwd -P >| ${cwdAt}`
}

type Held = {
  readonly root: string
  readonly bin: string
  readonly cwd: string
}

const SCRATCH = scratchWorld()

afterAll(() => SCRATCH.sweep())

function heldAnew(): Held {
  const at = SCRATCH.rootFor("shell-confining-")
  const held = { root: join(at, "root"), bin: join(at, "bin"), cwd: join(at, "cwd") }
  for (const one of [held.root, held.bin]) mkdirSync(one)
  writeFileSync(join(held.bin, "akasha"), OWN_AKASHA, { mode: 0o755 })
  writeFileSync(join(held.bin, "bwrap"), OWN_BWRAP, { mode: 0o755 })
  return held
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

function bwrapHanded(held: Held): string | null {
  const at = join(held.bin, BWRAP_HANDED)
  return existsSync(at) ? readFileSync(at, "utf8") : null
}

function agentsLine(held: Held, command: string): string {
  return lineOf(command, FED, held.cwd)
}

test("an akasha call alone on the line runs outside", () => {
  expect(runsOutside(lineOf("akasha audit --check typecheck"))).toBe(true)
  expect(runsOutside(lineOf("akasha"))).toBe(true)
  expect(runsOutside(lineOf("akasha page show 'routes/a.$b.ts'"))).toBe(true)
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
    "cd /x && akasha audit",
    "akashax audit",
    "touch a.ts",
    `${CHANGE}\ntouch a.ts`,
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

test("the script keeps an akasha call with more on the line inside, and says so", () => {
  const held = heldAnew()

  const said = confining(held, agentsLine(held, "akasha | cat"))

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

function homeOf(held: Held): string {
  return join(dirname(held.bin), "home")
}

function bareBin(held: Held): string {
  const at = join(dirname(held.bin), "bare")
  mkdirSync(at)
  for (const one of ["bash", "bun", "dirname", "readlink", "touch"]) {
    symlinkSync(SHAPE.string().parse(Bun.which(one)), join(at, one))
  }
  return at
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
  const tree = SCRATCH.rootFor("shell-confining-tree-")
  for (const at of [SCRIPT_AT, JUDGE_AT, HIDER_AT]) {
    mkdirSync(dirname(join(tree, at)), { recursive: true })
  }
  copyFileSync(SCRIPT, join(tree, SCRIPT_AT))
  symlinkSync(join(codeRoot(), HIDER_AT), join(tree, HIDER_AT))
  if (judge === null) symlinkSync(join(codeRoot(), JUDGE_AT), join(tree, JUDGE_AT))
  else writeFileSync(join(tree, JUDGE_AT), judge)
  return join(tree, SCRIPT_AT)
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

function runtimeAnew(): string {
  const at = SCRATCH.rootFor("shell-confining-runtime-")
  for (const one of ["akasha", "systemd"]) mkdirSync(join(at, one))
  for (const one of ["bus", join("systemd", "private"), "ssh-agent.socket"]) {
    writeFileSync(join(at, one), "")
  }
  return at
}

test("every seat's call reaches no bus and nothing of the runtime folder but logs and ssh", () => {
  const held = heldAnew()
  const runtime = runtimeAnew()
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

test("a game master's akasha call alone on the line still runs outside", () => {
  const held = heldOverLore()

  confiningAs(held, GAME_MASTER_SEAT, agentsLine(held, "akasha"))

  expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
  expect(bwrapHanded(held)).toBeNull()
})
