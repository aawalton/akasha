import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { mirroredOf } from "akasha/checks/modules/change-mirror/change-mirror.module.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

const UNDER = "/var/tmp/"

const ONE = "akasha/one.module.code.ts"

const TWO = "akasha/deep/two.module.code.ts"

function handing(held: Record<string, string>): (path: string) => Uint8Array | null {
  return (path: string): Uint8Array | null => {
    const body = held[path]
    return body === undefined ? null : bytesOf(body)
  }
}

test("a body the change carries is written at the path the change files it at", () => {
  const mirror = mirroredOf([ONE, TWO], handing({ [ONE]: "proposed\n", [TWO]: "deep\n" }))
  try {
    expect(readFileSync(join(mirror.root, ONE), "utf8")).toBe("proposed\n")
    expect(readFileSync(join(mirror.root, TWO), "utf8")).toBe("deep\n")
  } finally {
    mirror.sweep()
  }
})

test("a path the change takes away is written by nothing", () => {
  const mirror = mirroredOf([ONE], handing({}))
  try {
    expect(existsSync(join(mirror.root, ONE))).toBe(false)
  } finally {
    mirror.sweep()
  }
})

test("a mirror holds nothing the caller did not ask for", () => {
  const mirror = mirroredOf([ONE], handing({ [ONE]: "proposed\n", [TWO]: "deep\n" }))
  try {
    expect(existsSync(join(mirror.root, ONE))).toBe(true)
    expect(existsSync(join(mirror.root, TWO))).toBe(false)
  } finally {
    mirror.sweep()
  }
})

test("a mirror sits under /var/tmp and is gone once it is swept", () => {
  const mirror = mirroredOf([], handing({}))
  expect(mirror.root.startsWith(UNDER)).toBe(true)
  expect(existsSync(mirror.root)).toBe(true)
  mirror.sweep()
  expect(existsSync(mirror.root)).toBe(false)
})

test("a body that would not be read names the path it was handed in for", () => {
  const asked = (): unknown =>
    mirroredOf([ONE], () => {
      throw new Error("held fault")
    })
  expect(asked).toThrow(ONE)
  expect(asked).toThrow("held fault")
})

test("a mirror that could not be written is swept rather than left under /var/tmp", () => {
  let said = ""
  try {
    mirroredOf([ONE], () => {
      throw new Error("held fault")
    })
  } catch (thrown) {
    said = thrown instanceof Error ? thrown.message : String(thrown)
  }
  expect(said).toContain("held fault")
  expect(existsSync(join(UNDER, "akasha-mirror-"))).toBe(false)
})
