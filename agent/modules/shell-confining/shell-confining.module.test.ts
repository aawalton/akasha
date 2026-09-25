import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ACTING_NAMED } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  INSIDE,
  OUTSIDE,
  runsOutside,
} from "akasha/agent/modules/shell-confining/shell-confining.module.code.ts"
import { ran, type Said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const CODE = join(import.meta.dir, "shell-confining.module.code.ts")

const FENCE = "HEREDOC"

const CHANGE = [`akasha change apply --draft change-file <<'${FENCE}'`, "at: a.ts", FENCE].join(
  "\n"
)

const FED = " < /dev/null"

const SCRIPT = join(
  codeRoot(),
  "code",
  "shell-script",
  "pages",
  "shell-confinement",
  "shell-confinement.shell-script.shell.sh"
)

const OWN_AKASHA = '#!/usr/bin/env bash\ntouch "$AKASHA_ROOT/by-akasha"\n'

function lineOf(command: string, fed = FED, cwdAt = "/var/tmp/claude-ab12-cwd"): string {
  const quoted = command.replaceAll("'", `'"'"'`)
  return `source /s/snapshot.sh 2>/dev/null || true && eval '${quoted}'${fed} && pwd -P >| ${cwdAt}`
}

type Held = {
  readonly root: string
  readonly other: string
  readonly bin: string
  readonly cwd: string
}

const SCRATCH = scratchWorld()

afterAll(() => SCRATCH.sweep())

function heldAnew(): Held {
  const at = SCRATCH.rootFor("shell-confining-")
  const held = {
    root: join(at, "root"),
    other: join(at, "other"),
    bin: join(at, "bin"),
    cwd: join(at, "cwd"),
  }
  for (const one of [held.root, held.other, held.bin]) mkdirSync(one)
  writeFileSync(join(held.bin, "akasha"), OWN_AKASHA, { mode: 0o755 })
  return held
}

function confining(held: Held, line: string): Said {
  return ran(["bash", SCRIPT, line], {
    env: {
      ...process.env,
      AKASHA_ROOT: held.root,
      PATH: `${held.bin}:${process.env["PATH"] ?? ""}`,
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
})

test("the script keeps an agent's call from writing the checkout", () => {
  const held = heldAnew()

  const said = confining(held, agentsLine(held, `touch ${held.root}/by-agent`))

  expect(existsSync(join(held.root, "by-agent"))).toBe(false)
  expect(said.err).toContain("Read-only file system")
})

test("the script lets an agent's call write outside the checkout", () => {
  const held = heldAnew()

  confining(held, agentsLine(held, `touch ${held.other}/by-agent`))

  expect(existsSync(join(held.other, "by-agent"))).toBe(true)
})

test("the script lets an akasha call alone on the line write the checkout", () => {
  const held = heldAnew()

  confining(held, agentsLine(held, "akasha"))

  expect(existsSync(join(held.root, "by-akasha"))).toBe(true)
})

test("the script keeps an akasha call with more on the line inside, and says so", () => {
  const held = heldAnew()

  const said = confining(held, agentsLine(held, "akasha | cat"))

  expect(existsSync(join(held.root, "by-akasha"))).toBe(false)
  expect(said.err).toContain("shell-confinement:")
})
