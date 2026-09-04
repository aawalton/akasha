import { expect, test } from "bun:test"
import { join } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { ran } from "@akasha/utils-run/running"
import { judging } from "../../hook-judging/hook-judging.module.code.ts"
import { payloadOf } from "../../hook-payload/hook-payload.module.code.ts"
import { refusalIn, SCOPE, tscIn } from "./block-typecheck.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "block-typecheck.agent-hook.code.ts")

const ROOT = rootOf(import.meta.path)

const judged = judging(refusalIn, ROOT)

test("a tsc call is refused, naming a file as well as naming none", () => {
  for (const one of ["tsc --noEmit", "tsc", "tsc -p tsconfig.json", "tsc one.ts"]) {
    expect(judged(one)).toContain("refused this call")
  }
})

test("the refusal names the command that answers instead", () => {
  const said = judged("tsc --noEmit") ?? ""
  expect(said).toContain("akasha audit --check typecheck")
  expect(said).toContain("Say `akasha audit --help` for what it takes.")
})

test("the refusal says why a root tsc is empty rather than merely discouraged", () => {
  const said = judged("tsc --noEmit") ?? ""
  expect(said).toContain('"files": []')
  expect(said).toContain("compiles no file")
  expect(said).toContain("exits 0")
})

test("tsc reached by a path is the same call", () => {
  expect(judged("node_modules/.bin/tsc --noEmit")).not.toBeNull()
  expect(judged("./node_modules/typescript/bin/tsc")).not.toBeNull()
})

test("tsc reached through a runner is the same call", () => {
  for (const one of ["npx tsc --noEmit", "bunx tsc --noEmit", "npx --yes tsc"]) {
    expect(judged(one)).not.toBeNull()
  }
})

test("a prefix that sets the call up is stepped over", () => {
  expect(judged("sudo tsc --noEmit")).not.toBeNull()
  expect(judged("TS_NODE=one tsc --noEmit")).not.toBeNull()
})

test("a prefix that only runs the call does not hide it", () => {
  for (const one of [
    "timeout 900 tsc --noEmit",
    "timeout -k 5 900 tsc",
    "nice tsc",
    "nice -n 10 tsc",
    "nohup tsc",
    "stdbuf -oL tsc",
    "time tsc",
    "command tsc",
    "/usr/bin/timeout 900 tsc",
    "timeout 900 bunx tsc",
    "timeout 900 bun run typecheck",
    "nice -n 10 bun typecheck",
  ]) {
    expect(judged(one)).not.toBeNull()
  }
})

test("a prefix around a call this does not name is let through", () => {
  for (const one of ["timeout 900 echo tsc", "nice -n 10 cat tsc.log", "command -v tsc"]) {
    expect(judged(one)).toBeNull()
  }
})

test("a flag before the script name does not hide the typecheck script", () => {
  expect(judged("bun run --silent typecheck")).not.toBeNull()
  expect(judged("bun --silent run --silent typecheck")).not.toBeNull()
  expect(judged("bun run --cwd /elsewhere typecheck")).not.toBeNull()
  expect(judged("timeout 900 bun run --silent typecheck")).not.toBeNull()
})

test("bun typecheck and bun run typecheck are both refused", () => {
  expect(judged("bun typecheck")).not.toBeNull()
  expect(judged("bun run typecheck")).not.toBeNull()
})

test("the bun refusal names what a script compiles rather than the empty root", () => {
  const said = judged("bun run typecheck") ?? ""
  expect(said).toContain("package script")
  expect(said).toContain("akasha audit --check typecheck")
})

test("another bun act and another script are let through", () => {
  expect(judged("bun run build")).toBeNull()
  expect(judged("bun tools/run-checks.ts")).toBeNull()
  expect(judged("bun run lint")).toBeNull()
})

test("a program whose name merely carries tsc is let through", () => {
  for (const one of ["tsconfig", "vue-tsc --noEmit", "echo tsc"]) expect(judged(one)).toBeNull()
})

test("a refusal answers the whole call, wherever it stands in the chain", () => {
  expect(judged("ls && tsc --noEmit")).not.toBeNull()
  expect(judged("tsc --noEmit ; echo done")).not.toBeNull()
})

test("a call inside a quoted run is not read as a call", () => {
  expect(judged('echo "tsc --noEmit"')).toBeNull()
})

test("a call running outside the repository this hook stands in is let through", () => {
  expect(judged("tsc --noEmit", "/var/tmp/probe")).toBeNull()
})

test("a call stating no working directory is judged as though it ran here", () => {
  expect(judged("tsc --noEmit", "")).not.toBeNull()
})

test("the head of a segment is what is read, so tsc as an argument is not a call", () => {
  expect(tscIn("cat tsc.log")).toBe(false)
  expect(tscIn("rg tsc akasha/")).toBe(false)
  expect(tscIn("tsc")).toBe(true)
})

test("the scope names the hole in this rule rather than hiding it", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("vue-tsc")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("WHERE THE CALL RUNS")
})

test("the scope names the prefixes it steps over and says that list samples a class too", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER")
  expect(said).toContain("timeout")
  expect(said).toContain("That list samples an open class too.")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("tsc --noEmit", ROOT)) })
  expect(done.code).toBe(2)
  const said: unknown = JSON.parse(done.out)
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("akasha audit --check typecheck")
})

test("the hook stands aside on stdin for a call that is not a typecheck", () => {
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
