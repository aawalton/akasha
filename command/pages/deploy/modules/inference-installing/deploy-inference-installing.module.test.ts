import { afterAll, expect, test } from "bun:test"
import {
  OVER_SSH,
  putUpInferenceService,
  type Reaching,
  strayOn,
} from "akasha/command/pages/deploy/modules/inference-installing/deploy-inference-installing.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { parseActualState } from "akasha/infrastructure/inference/pool/modules/provision-script/provision-script.module.code.ts"
import type { Inference } from "akasha/infrastructure/service/akasha-service/service-inference/modules/inference-reading/inference-reading.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const ROOT = process.cwd()
const SERVICE = "moss-tts"
const IN_SESSION = "GUI_SESSION_PROBE gui/501 exit=0\n"
const HOLDS_NONE = ""
const PROBE = "GUI_SESSION_PROBE"

function reaching(over: Partial<Reaching>): Reaching {
  return {
    runSsh: () => Promise.resolve(),
    runSshCapture: (_target, script) =>
      Promise.resolve(script.includes(PROBE) ? IN_SESSION : HOLDS_NONE),
    syncDir: () => Promise.resolve(),
    ...over,
  }
}

test("a slug no inference service is filed under is refused rather than raised", async () => {
  const answer = await putUpInferenceService("no-such-service", ROOT, [], reaching({}))
  expect(answer.refusals[0]).toContain("no-such-service")
})

test("a service page the checkout holds and the pinned tree does not reaches no host", async () => {
  const up: string[] = []
  const answer = await putUpInferenceService(
    SERVICE,
    SCRATCH.rootFor("akasha-pinned-"),
    up,
    reaching({})
  )
  expect(answer.refusals[0]).toContain(SERVICE)
  expect(up).toEqual([])
})

test("a run that finished names each thing that reached the host", async () => {
  const up: string[] = []
  const answer = await putUpInferenceService(SERVICE, ROOT, up, reaching({}))
  expect(answer.code).toBe(0)
  expect(up).toHaveLength(3)
  expect(up[0]).toContain("the pool file on macbook")
  expect(up[1]).toContain("shipped to macbook")
  expect(up[2]).toContain("applied at hash")
})

test("a folder that would not ship raises, and what reached the host is named", async () => {
  const up: string[] = []
  const putting = putUpInferenceService(
    SERVICE,
    ROOT,
    up,
    reaching({ syncDir: () => Promise.reject(new Error("syncDir failed for src")) })
  )
  await expect(putting).rejects.toThrow("syncDir failed for src")
  expect(up).toHaveLength(1)
  expect(up[0]).toContain("the pool file on macbook")
})

test("a run nothing reached the host in names nothing as put up", async () => {
  const up: string[] = []
  const putting = putUpInferenceService(
    SERVICE,
    ROOT,
    up,
    reaching({ runSsh: () => Promise.reject(new Error("ssh exited 255")) })
  )
  await expect(putting).rejects.toThrow("ssh exited 255")
  expect(up).toEqual([])
})

test("a host with no GUI session raises before anything reaches that host", async () => {
  const up: string[] = []
  const putting = putUpInferenceService(
    SERVICE,
    ROOT,
    up,
    reaching({ runSshCapture: () => Promise.resolve(HOLDS_NONE) })
  )
  await expect(putting).rejects.toThrow("no GUI session")
  expect(up).toEqual([])
})

function paged(name: string, host = "macbook"): Inference {
  return {
    name,
    host,
    pythonVersion: "3.12",
    sourceDir: "src",
    workdir: ".",
    runs: "serve",
    port: 18000,
    lifecycle: "pool",
    warm: false,
    enabled: true,
  }
}

const LISTED = [
  "DIR moss-tts abc",
  "LAUNCHD moss-tts",
  "DIR image-gen-abby def",
  "LAUNCHD image-gen-abby",
  "CONDA image-gen-abby",
  "CONDA image-facelock",
  "DIR traffic-cop ghi",
  "DIR whisper-stt NONE",
].join("\n")

test("a name no page names is stray, and a paged name is not", () => {
  const every = [paged("moss-tts"), paged("traffic-cop"), paged("whisper-stt")]
  expect(strayOn(parseActualState(LISTED), every)).toEqual(["image-facelock", "image-gen-abby"])
})

test("a name a page puts on another host is never stray", () => {
  const every = [paged("moss-tts"), paged("image-gen-abby", "studio")]
  expect(strayOn(parseActualState(LISTED), every)).toEqual(["image-facelock", "whisper-stt"])
})

test("the traffic cop is never stray, even where no page names it", () => {
  expect(strayOn(parseActualState("DIR traffic-cop abc"), [])).toEqual([])
})

test("a host holding nothing has nothing stray", () => {
  expect(strayOn(parseActualState(""), [paged("moss-tts")])).toEqual([])
})

test("a deploy tears each stray off the host and names it", async () => {
  const up: string[] = []
  const ran: string[] = []
  const answer = await putUpInferenceService(
    SERVICE,
    ROOT,
    up,
    reaching({
      runSsh: (_target, script) => {
        ran.push(script)
        return Promise.resolve()
      },
      runSshCapture: (_target, script) =>
        Promise.resolve(script.includes(PROBE) ? IN_SESSION : LISTED),
    })
  )
  expect(answer.code).toBe(0)
  const pruned = ran.filter((script) => script.includes("conda env remove"))
  expect(pruned).toHaveLength(2)
  expect(pruned[0]).toContain("inference-image-facelock")
  expect(pruned[1]).toContain("inference-image-gen-abby")
  expect(up[0]).toBe("image-facelock, named by no page, torn off macbook")
  expect(up[1]).toBe("image-gen-abby, named by no page, torn off macbook")
  expect(ran.join("\n")).not.toContain("inference-moss-tts' -y")
  expect(answer.report).toContain("tore image-gen-abby down, as no page names it")
})

test("the reaching a deploy uses unless another is handed in is the real ssh", () => {
  expect(OVER_SSH.runSsh).toBeInstanceOf(Function)
  expect(OVER_SSH.runSshCapture).toBeInstanceOf(Function)
  expect(OVER_SSH.syncDir).toBeInstanceOf(Function)
})
