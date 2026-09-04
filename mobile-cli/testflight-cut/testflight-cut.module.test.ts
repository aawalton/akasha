import { describe, expect, test } from "bun:test"
import type { CutFingerprint } from "../cut-fingerprint/cut-fingerprint.module.code.ts"
import { cutRecordCall, fileFingerprint } from "./testflight-cut.module.code.ts"

const FP: CutFingerprint = {
  buildNumber: 199,
  mainSha: "1111111111111111111111111111111111111111",
  shellSha: "2222222222222222222222222222222222222222",
  buildInputTreeHash: "3333",
  cutAt: "2026-09-02T04:15:00.000Z",
}

const noWait = async (): Promise<undefined> => undefined

const saidNothing = (): undefined => undefined

describe("fileFingerprint", () => {
  test("a filing that lands first time answers null and files once", async () => {
    let tries = 0
    const failed = await fileFingerprint(
      "alanwalton",
      FP,
      async () => {
        tries += 1
      },
      noWait,
      saidNothing
    )
    expect(failed).toBeNull()
    expect(tries).toBe(1)
  })

  test("a filing that fails once and then lands answers null, so a racing commit is survived", async () => {
    let tries = 0
    const failed = await fileFingerprint(
      "alanwalton",
      FP,
      async () => {
        tries += 1
        if (tries === 1) throw new Error("index.lock exists")
      },
      noWait,
      saidNothing
    )
    expect(failed).toBeNull()
    expect(tries).toBe(2)
  })

  test("a filing that never lands answers why, so nothing reads it as filed", async () => {
    let tries = 0
    const failed = await fileFingerprint(
      "alanwalton",
      FP,
      async () => {
        tries += 1
        throw new Error("no checkout root places the page type")
      },
      noWait,
      saidNothing
    )
    expect(failed).toContain("no checkout root places the page type")
    expect(tries).toBe(4)
  })
})

describe("cutRecordCall", () => {
  test("names every value the fingerprint carries, so nothing is recomputed to file it", () => {
    const said = cutRecordCall("alanwalton", FP)
    expect(said).toContain("akasha mobile-cut-record")
    expect(said).toContain("--app alanwalton")
    expect(said).toContain("--build-number 199")
    expect(said).toContain(`--main-sha ${FP.mainSha}`)
    expect(said).toContain(`--shell-sha ${FP.shellSha}`)
    expect(said).toContain("--build-input-tree-hash 3333")
    expect(said).toContain(`--cut-at ${FP.cutAt}`)
  })

  test("a fingerprint carrying no shell sha names no flag for one", () => {
    const said = cutRecordCall("atlas", { ...FP, shellSha: null, buildInputTreeHash: null })
    expect(said).not.toContain("--shell-sha")
    expect(said).not.toContain("--build-input-tree-hash")
  })
})
