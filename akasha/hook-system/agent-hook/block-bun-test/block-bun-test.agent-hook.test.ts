import { expect, test } from "bun:test"
import { join } from "node:path"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import { judging } from "../../hook-judging/hook-judging.module.code.ts"
import { payloadOf } from "../../hook-payload/hook-payload.module.code.ts"
import {
  filtersOf,
  guarding,
  reachesAkasha,
  refusalIn,
  SCOPE,
} from "./block-bun-test.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "block-bun-test.agent-hook.code.ts")

const ROOT = rootOf(import.meta.path)

const judged = judging(refusalIn, ROOT)

test("a run naming no path is refused, and says what it would reach", () => {
  const said = judged("bun test") ?? ""
  expect(said).toContain("naming no path runs every test in this repository")
  expect(said).toContain("akasha test")
})

test("a flag is no path, so a run carrying only flags is still unbounded", () => {
  for (const one of ["bun test --timeout 5000", "bun test -t held", "bun test --bail"]) {
    expect(judged(one)).toContain("naming no path")
  }
})

test("a run reaching the akasha folder is refused, and names the command that runs it", () => {
  const said = judged("bun test akasha/") ?? ""
  expect(said).toContain("runs the akasha tests outside the akasha commands")
  expect(said).toContain("akasha test --file-path <path>")
  expect(said).toContain("Say `akasha test --help` for what it takes.")
})

test("every refusal names the hook that made it", () => {
  expect(judged("bun test")).toContain("block-bun-test refused this call.")
})

test("every spelling of a path reaching akasha is refused", () => {
  for (const one of ["akasha", "akasha/", "./akasha/hook-system", "../akasha", "one/akasha/two"]) {
    expect(judged(`bun test ${one}`)).not.toBeNull()
  }
})

test("a run naming only paths outside the akasha folder is let through", () => {
  for (const one of ["shared/design-system", "tools/lib", "infra/k8s/one.test.ts"]) {
    expect(judged(`bun test ${one}`)).toBeNull()
  }
})

test("one path reaching akasha refuses a run that names others beside it", () => {
  expect(judged("bun test shared/one akasha/two")).not.toBeNull()
})

test("a run outside the repository this hook stands in is let through", () => {
  expect(judged("bun test", "/var/tmp/probe")).toBeNull()
  expect(judged("bun test akasha/", "/var/tmp/probe")).toBeNull()
})

test("a run stating no working directory is judged as though it ran here", () => {
  expect(judged("bun test", "")).not.toBeNull()
  expect(guarding("", ROOT)).toBe(true)
})

test("a folder whose name starts with the root's name is outside it", () => {
  expect(guarding(`${ROOT}-other`, ROOT)).toBe(false)
  expect(guarding(join(ROOT, "akasha"), ROOT)).toBe(true)
})

test("a word standing for everything bounds nothing", () => {
  for (const one of [".", "..", "./", "/", "*"]) expect(reachesAkasha(one)).toBe(true)
})

test("a path outside the folder reaches nothing here", () => {
  expect(reachesAkasha("shared/one")).toBe(false)
  expect(reachesAkasha("akasha-other/one")).toBe(false)
})

test("a flag's value is never read as a path", () => {
  expect(filtersOf(["--timeout", "5000"])).toEqual([])
  expect(filtersOf(["-t", "held", "shared/one"])).toEqual(["shared/one"])
  expect(filtersOf(["--coverage", "shared/one"])).toEqual(["shared/one"])
})

test("a bun verb this hook does not name is stood aside", () => {
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

test("a refusal answers the whole call, wherever the verb stands in the chain", () => {
  expect(judged("ls && bun test")).not.toBeNull()
  expect(judged("bun test akasha/ ; echo done")).not.toBeNull()
})

test("a verb inside a quoted run is not read as a call", () => {
  expect(judged('echo "bun test"')).toBeNull()
})

test("the scope names the class it cannot close and the gap it carries", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("`bun run test`")
  expect(said).toContain("a gap, not a rule")
  expect(said).toContain("WHERE THE CALL RUNS")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("bun test", ROOT)) })
  expect(ran.exitCode).toBe(2)
  const said: unknown = JSON.parse(ran.stdout.toString())
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("akasha test")
})

test("the hook stands aside on stdin for a run outside the akasha folder", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], {
    stdin: Buffer.from(payloadOf("bun test shared/one", ROOT)),
  })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toBe("")
})

test("a payload that will not parse lets the call through rather than refusing it", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(ran.exitCode).toBe(5)
  expect(ran.stderr.toString()).toContain("the call was not refused")
})

test("the hook prints its scope when it is asked", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toContain("NOT REACHED")
})
