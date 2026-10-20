import { expect, test } from "bun:test"
import { appendFileSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  apartFrom,
  carried,
  DETACHED,
  detachedDeploy,
  endingIn,
  type Following,
  followed,
  placeFor,
  RUNTIME_MAX_SECONDS,
  startArgv,
  unitFor,
} from "akasha/command/pages/deploy/modules/detaching/deploy-detaching.module.code.ts"

const ROOT = "/checkout"

const CALLED: Given = {
  root: ROOT,
  calledAs: "akasha deploy",
  calledWhole: "akasha deploy auth-proxy",
  from: ROOT,
  writer: null,
  agentId: null,
}

const FROM_CODE: Given = {
  root: ROOT,
  calledAs: "akasha deploy",
  from: ROOT,
  writer: null,
  agentId: null,
}

const UNIT = unitFor("auth-proxy", 7)

const SCRATCH = "/var/tmp"

function scratch(): string {
  return mkdtempSync(join(SCRATCH, "deploy-detaching-"))
}

function placed(): ReturnType<typeof placeFor> {
  const place = placeFor(scratch(), UNIT)
  mkdirSync(place.at, { recursive: true })
  return place
}

function following(said: Uint8Array[], alive: () => boolean, onSleep: () => void): Following {
  return {
    write: (bytes) => {
      said.push(Uint8Array.from(bytes))
    },
    alive,
    sleep: async () => {
      onSleep()
    },
  }
}

function text(said: readonly Uint8Array[]): string {
  return said.map((one) => new TextDecoder().decode(one)).join("")
}

test("a deploy called from the command line runs apart", () => {
  expect(apartFrom(CALLED, {}, false)).toBe(true)
})

test("a deploy called from code, in the cluster or in its own service is not run apart", () => {
  expect(apartFrom(FROM_CODE, {}, false)).toBe(false)
  expect(apartFrom(CALLED, {}, true)).toBe(false)
  expect(apartFrom(CALLED, { [DETACHED]: "1" }, false)).toBe(false)
})

test("the service is a user service named for the slug, running the launcher's deploy", () => {
  const place = placeFor("/state", UNIT)
  const argv = startArgv(ROOT, place, ["auth-proxy", "--measured"], { PATH: "/bin" })

  expect(argv.slice(0, 2)).toEqual(["systemd-run", "--user"])
  expect(argv).toContain(`--unit=${UNIT}`)
  expect(argv).toContain(`--property=RuntimeMaxSec=${String(RUNTIME_MAX_SECONDS)}`)
  expect(argv).toContain(`--property=StandardOutput=append:${place.log}`)
  expect(argv).toContain(`--setenv=${DETACHED}=1`)
  expect(argv).toContain("--setenv=PATH")
  expect(argv.slice(argv.indexOf("--") + 2)).toEqual(["deploy", "auth-proxy", "--measured"])
  expect(argv.find((one) => one.startsWith("--property=ExecStopPost="))).toContain(place.ended)
})

test("the log and the ending sit under the state folder, named for the unit", () => {
  const place = placeFor("/state", UNIT)

  expect(place.log).toBe(`/state/akasha/deploys/${UNIT}.log`)
  expect(place.ended).toBe(`/state/akasha/deploys/${UNIT}.ended`)
})

test("every name in the caller's environment is handed on but those systemd sets", () => {
  const env = { PATH: "/bin", INVOCATION_ID: "x", "BASH_FUNC_f%%": "() {}", [DETACHED]: "1" }

  expect(carried(env)).toEqual(["--setenv=PATH"])
})

test("a deploy that exited is answered with the code it exited with", () => {
  const place = placeFor("/state", UNIT)

  expect(endingIn("success exited 0\n", place)).toEqual({ report: [], refusals: [], code: 0 })
  expect(endingIn("exit-code exited 3\n", place).code).toBe(3)
})

test("a deploy ended by a signal or a ceiling is refused, naming how it ended", () => {
  const place = placeFor("/state", UNIT)
  const killed = endingIn("signal killed TERM\n", place)
  const ceiling = endingIn("timeout killed TERM\n", place)

  expect(killed.code).toBe(OPERATIONAL)
  expect(killed.refusals[0]).toContain("killed by TERM (signal)")
  expect(ceiling.refusals[0]).toContain("(timeout)")
  expect(endingIn("", place).refusals[0]).toContain("wrote no ending")
})

test("the call says what the deploy says as the log grows, and ends with its code", async () => {
  const place = placed()
  const said: Uint8Array[] = []
  let ticks = 0
  const answer = await followed(
    place,
    following(
      said,
      () => true,
      () => {
        ticks += 1
        if (ticks === 1) writeFileSync(place.log, "commit\tabc\n")
        if (ticks === 2) appendFileSync(place.log, "recorded\tauth-proxy\tabc\n")
        if (ticks === 3) writeFileSync(place.ended, "success exited 0\n")
      }
    )
  )

  expect(text(said)).toBe("commit\tabc\nrecorded\tauth-proxy\tabc\n")
  expect(answer.code).toBe(0)
})

test("a service gone with no ending written is refused rather than taken as done", async () => {
  const place = placed()
  const answer = await followed(
    place,
    following(
      [],
      () => false,
      () => undefined
    )
  )

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain(place.unit)
})

test("a service that will not start refuses the deploy and follows nothing", async () => {
  const state = scratch()
  const said: Uint8Array[] = []
  const answer = await detachedDeploy(
    ["auth-proxy"],
    "auth-proxy",
    CALLED,
    { XDG_STATE_HOME: state },
    () => ({ code: 1, out: "Failed to connect to bus" }),
    following(
      said,
      () => true,
      () => undefined
    ),
    7
  )

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("Failed to connect to bus")
  expect(said).toEqual([])
})
