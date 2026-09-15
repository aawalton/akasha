import { describe, expect, test } from "bun:test"
import { isContainerCgroup } from "akasha/infrastructure/memory/reaping/modules/memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"

describe("isContainerCgroup", () => {
  test("reads a rootless-podman cgroup as a container", () => {
    expect(isContainerCgroup("0::/user.slice/libpod-abc123.scope")).toBe(true)
  })

  test("reads a plain user cgroup as no container", () => {
    expect(isContainerCgroup("0::/user.slice/user-1000.slice")).toBe(false)
  })
})
