import { expect, test } from "bun:test"
import { join } from "node:path"
import { ACTING_NAMED } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  INSIDE,
  OUTSIDE,
  runsOutside,
} from "akasha/agent/modules/shell-confining/shell-confining.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const CODE = join(import.meta.dir, "shell-confining.module.code.ts")

const FENCE = "HEREDOC"

const CHANGE = [`akasha change apply --draft change-file <<'${FENCE}'`, "at: a.ts", FENCE].join(
  "\n"
)

function lineOf(command: string, fed = " < /dev/null"): string {
  const quoted = command.replaceAll("'", `'"'"'`)
  return `source /s/snapshot.sh 2>/dev/null || true && eval '${quoted}'${fed} && pwd -P >| /var/tmp/claude-ab12-cwd`
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
