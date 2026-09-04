import { expect, test } from "bun:test"
import { join } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { ran } from "@akasha/utils-run/running"
import { guarding } from "../../hook-answer/hook-answer.module.code.ts"
import { judging } from "../../hook-judging/hook-judging.module.code.ts"
import { payloadOf } from "../../hook-payload/hook-payload.module.code.ts"
import { refusalIn, SCOPE } from "./block-bun-test.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "block-bun-test.agent-hook.code.ts")

const ROOT = rootOf(import.meta.path)

const judged = judging(refusalIn, ROOT)

test("a run naming no path is refused, and names the command that runs the tests", () => {
  const said = judged("bun test") ?? ""
  expect(said).toContain("a run naming no path reaches every one of them")
  expect(said).toContain("akasha test")
})

test("a run naming a path is refused too, and says why the path bounds nothing", () => {
  const said = judged("bun test hook-system/agent-hooks") ?? ""
  expect(said).toContain("runs the akasha tests outside the akasha commands")
  expect(said).toContain("Every test file in this repository is an akasha test")
  expect(said).toContain("akasha test --file-path <path>")
  expect(said).toContain("Say `akasha test --help` for what it takes.")
})

test("a flag changes nothing, because no word after the act is read", () => {
  for (const one of ["bun test --timeout 5000", "bun test -t held", "bun test --bail"]) {
    expect(judged(one)).not.toBeNull()
  }
})

test("every refusal names the hook that made it", () => {
  expect(judged("bun test")).toContain("block-bun-test refused this call.")
})

test("every spelling of a path reaching akasha is refused", () => {
  for (const one of ["akasha", "akasha/", "./akasha/hook-system", "../akasha", "one/akasha/two"]) {
    expect(judged(`bun test ${one}`)).not.toBeNull()
  }
})

test("a path naming no akasha segment is refused as well, which is what closed the gate", () => {
  for (const one of ["shared/design-system", "tools/lib", "infra/k8s/one.test.ts", "."]) {
    expect(judged(`bun test ${one}`)).not.toBeNull()
  }
})

test("a run outside the repository this hook stands in is let through", () => {
  expect(judged("bun test", "/var/tmp/probe")).toBeNull()
  expect(judged("bun test akasha/", "/var/tmp/probe")).toBeNull()
  expect(judged("bun test shared/one", "/var/tmp/probe")).toBeNull()
})

test("a run stating no working directory is judged as though it ran here", () => {
  expect(judged("bun test", "")).not.toBeNull()
  expect(guarding("", ROOT)).toBe(true)
})

test("a folder whose name starts with the root's name is outside it", () => {
  expect(guarding(`${ROOT}-other`, ROOT)).toBe(false)
  expect(guarding(join(ROOT, "hook-system"), ROOT)).toBe(true)
})

test("a prefix that only runs the call does not hide it", () => {
  for (const one of [
    "timeout 900 bun test",
    "timeout -k 5 900 bun test",
    "nice -n 10 bun test",
    "nohup bun test",
    "stdbuf -oL bun test",
    "time bun test",
    "command bun test",
    "timeout 900 bun test akasha/",
    "timeout 900 bun test shared/one",
  ]) {
    expect(judged(one)).not.toBeNull()
  }
})

test("a prefix this does not name hides the call behind it", () => {
  expect(judged("timeout 900 echo bun test")).toBeNull()
})

test("a bun act this hook does not name is stood aside", () => {
  for (const one of ["bun install", "bun run build", "bun x tsc", "bun one.ts"]) {
    expect(judged(one)).toBeNull()
  }
})

test("`bun run test` is not read here, and stands aside", () => {
  expect(judged("bun run test")).toBeNull()
})

test("a runner that is not bun is stood aside", () => {
  for (const one of ["npm test", "vitest", "node --test", "jest akasha/"]) {
    expect(judged(one)).toBeNull()
  }
})

test("a refusal answers the whole call, wherever the act stands in the chain", () => {
  expect(judged("ls && bun test")).not.toBeNull()
  expect(judged("bun test akasha/ ; echo done")).not.toBeNull()
})

test("an act inside a quoted run is not read as a call", () => {
  expect(judged('echo "bun test"')).toBeNull()
})

test("the scope names the class it cannot close and says no form is let through", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("`bun run test`")
  expect(said).toContain("There is no form of it this lets through.")
  expect(said).toContain("WHERE THE CALL RUNS")
})

test("the scope prescribes no path, because a path bounds nothing", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("There is nothing left for a path to prove")
  expect(said).toContain("No word after `test` is read at all.")
  expect(said).not.toContain("naming only paths outside the akasha folder is let through")
})

test("the scope names the prefixes it steps over and says that list samples a class too", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER")
  expect(said).toContain("timeout")
  expect(said).toContain("That list samples an open class too.")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("bun test", ROOT)) })
  expect(done.code).toBe(2)
  const said: unknown = JSON.parse(done.out)
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("akasha test")
})

test("the hook refuses a run naming a path on stdin too", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("bun test shared/one", ROOT)) })
  expect(done.code).toBe(2)
  expect(done.out).toContain("block-bun-test refused this call.")
})

test("the hook stands aside on stdin for an act it does not name", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("bun run build", ROOT)) })
  expect(done.code).toBe(0)
  expect(done.out).toBe("")
})

test("a payload that will not parse lets the call through rather than refusing it", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(done.code).toBe(5)
  expect(done.err).toContain("the call was not refused")
})

test("the hook prints its scope when it is asked", () => {
  const done = ran(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(done.code).toBe(0)
  expect(done.out).toContain("NOT REACHED")
})
