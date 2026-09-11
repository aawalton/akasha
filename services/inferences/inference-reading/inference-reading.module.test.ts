import { expect, test } from "bun:test"
import {
  everyInference,
  folderOf,
  inferenceIn,
  readFor,
  runIn,
  slugIn,
} from "akasha/services/inferences/inference-reading/inference-reading.module.code.ts"

const ROOT = process.cwd()

const WHOLE = {
  pageTypeSlug: "inference-service",
  slug: "a-service",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m a.server"],
  enabled: true,
  port: 8093,
  internalPort: 18093,
  lifecycle: "pool",
}

test("a name is read whether or not its page type is spelled before it", () => {
  expect(slugIn("shell-script/mlx-audio-provision")).toBe("mlx-audio-provision")
  expect(slugIn("mlx-audio-provision")).toBe("mlx-audio-provision")
})

test("the one command line a service runs is read, and anything else is none", () => {
  expect(runIn(["a b"])).toBe("a b")
  expect(runIn([])).toBe(null)
  expect(runIn(["  "])).toBe(null)
  expect(runIn("a b")).toBe(null)
  expect(runIn(undefined)).toBe(null)
})

test("the folder handed to the host is the folder the named script sits in", () => {
  expect(folderOf(ROOT, "shell-script/mlx-audio-provision")).toBe(
    "inference/pool/mlx-audio-provision"
  )
  expect(folderOf(ROOT, "no-script-is-filed-under-this")).toBe(null)
})

test("a value stating everything a service needs is read as one", () => {
  const read = inferenceIn(ROOT, { ...WHOLE })
  expect(typeof read).not.toBe("string")
  if (typeof read === "string") return
  expect(read.name).toBe("a-service")
  expect(read.runs).toBe("python -m a.server")
  expect(read.sourceDir).toBe("inference/pool/mlx-audio-provision")
  expect(read.warm).toBe(false)
})

test("a value missing what a service needs is refused by what it is missing", () => {
  for (const key of ["slug", "host", "pythonVersion", "workdir", "provision", "runs"]) {
    const held: Record<string, unknown> = { ...WHOLE }
    delete held[key]
    expect(inferenceIn(ROOT, held)).toContain("states no slug")
  }
  const noPort: Record<string, unknown> = { ...WHOLE }
  delete noPort.port
  expect(inferenceIn(ROOT, noPort)).toBe("states no port")
})

test("a lifecycle that is neither of the two is refused by name", () => {
  expect(inferenceIn(ROOT, { ...WHOLE, lifecycle: "sometimes" })).toContain("sometimes")
})

test("a service named a script no page is filed under is refused by that name", () => {
  expect(inferenceIn(ROOT, { ...WHOLE, provision: "no-script-is-filed-under-this" })).toContain(
    "no-script-is-filed-under-this"
  )
})

test("a slug no inference service is filed under is refused by name", () => {
  expect("refused" in readFor(ROOT, "no-such-inference-service")).toBe(true)
})

test("the service there today is read from its page", () => {
  const read = readFor(ROOT, "moss-tts")
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services[0]?.port).toBe(8093)
  expect(read.services[0]?.warm).toBe(true)
  expect(read.services[0]?.sourceDir).toBe("inference/pool/mlx-audio-provision")
})

test("every inference service there is read, and the cop is among them", () => {
  const read = everyInference(ROOT)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.map((one) => one.name)).toContain("traffic-cop")
})
