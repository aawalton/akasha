import { expect, test } from "bun:test"
import {
  OVER_SSH,
  putUpInferenceService,
  type Reaching,
} from "akasha/commands/pages/deploy/inference-installing/deploy-inference-installing.module.code.ts"

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
  const answer = await putUpInferenceService(ROOT, "no-such-service", false, ROOT, [], reaching({}))
  expect(answer.refusals[0]).toContain("no-such-service")
})

test("a dry run reaches the host to read it and puts nothing up", async () => {
  const up: string[] = []
  const answer = await putUpInferenceService(ROOT, SERVICE, true, ROOT, up, reaching({}))
  expect(answer.code).toBe(0)
  expect(up).toEqual([])
})

test("a run that finished names each thing that reached the host", async () => {
  const up: string[] = []
  const answer = await putUpInferenceService(ROOT, SERVICE, false, ROOT, up, reaching({}))
  expect(answer.code).toBe(0)
  expect(up).toHaveLength(3)
  expect(up[0]).toContain("the pool file on macbook")
  expect(up[1]).toContain("shipped to macbook")
  expect(up[2]).toContain("applied at hash")
})

test("a folder that would not ship raises, and what reached the host is named", async () => {
  const up: string[] = []
  const putting = putUpInferenceService(
    ROOT,
    SERVICE,
    false,
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
    ROOT,
    SERVICE,
    false,
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
    ROOT,
    SERVICE,
    false,
    ROOT,
    up,
    reaching({ runSshCapture: () => Promise.resolve(HOLDS_NONE) })
  )
  await expect(putting).rejects.toThrow("no GUI session")
  expect(up).toEqual([])
})

test("the reaching a deploy uses unless another is handed in is the real ssh", () => {
  expect(OVER_SSH.runSsh).toBeInstanceOf(Function)
  expect(OVER_SSH.runSshCapture).toBeInstanceOf(Function)
  expect(OVER_SSH.syncDir).toBeInstanceOf(Function)
})
