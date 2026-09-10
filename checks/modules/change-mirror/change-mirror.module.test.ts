import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import { mirroredOf } from "./change-mirror.module.code.ts"

const UNDER = "/var/tmp/"

const ONE = "akasha/one.module.code.ts"

const TWO = "akasha/deep/two.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("change-mirror-"))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

function handing(held: Record<string, string>): (path: string) => Uint8Array | null {
  return (path: string): Uint8Array | null => {
    const body = held[path]
    return body === undefined ? null : bytesOf(body)
  }
}

test("a body the change carries is written at the path the change files it at", () => {
  const from = repo({ [ONE]: "on disk\n" })
  const mirror = mirroredOf(from, [ONE, TWO], handing({ [ONE]: "proposed\n", [TWO]: "deep\n" }), [])
  try {
    expect(readFileSync(join(mirror.root, ONE), "utf8")).toBe("proposed\n")
    expect(readFileSync(join(mirror.root, TWO), "utf8")).toBe("deep\n")
  } finally {
    mirror.sweep()
  }
})

test("a path the change takes away is written by nothing", () => {
  const from = repo({ [ONE]: "on disk\n" })
  const mirror = mirroredOf(from, [ONE], handing({}), [])
  try {
    expect(existsSync(join(mirror.root, ONE))).toBe(false)
  } finally {
    mirror.sweep()
  }
})

test("a file the caller also names is copied, and one the tree does not hold is skipped", () => {
  const from = repo({ "biome.json": "{}\n" })
  const mirror = mirroredOf(from, [], handing({}), ["biome.json", ".gitignore"])
  try {
    expect(readFileSync(join(mirror.root, "biome.json"), "utf8")).toBe("{}\n")
    expect(existsSync(join(mirror.root, ".gitignore"))).toBe(false)
  } finally {
    mirror.sweep()
  }
})

test("a mirror holds nothing the caller did not ask for", () => {
  const from = repo({ [ONE]: "on disk\n", "akasha/held.md": "held\n", "biome.json": "{}\n" })
  const mirror = mirroredOf(from, [ONE], handing({ [ONE]: "proposed\n" }), [])
  try {
    expect(existsSync(join(mirror.root, "akasha/held.md"))).toBe(false)
    expect(existsSync(join(mirror.root, "biome.json"))).toBe(false)
  } finally {
    mirror.sweep()
  }
})

test("a mirror sits under /var/tmp and is gone once it is swept", () => {
  const mirror = mirroredOf(repo({}), [], handing({}), [])
  expect(mirror.root.startsWith(UNDER)).toBe(true)
  expect(existsSync(mirror.root)).toBe(true)
  mirror.sweep()
  expect(existsSync(mirror.root)).toBe(false)
})

test("a body that would not be read names the path it was handed in for", () => {
  const from = repo({})
  const asked = (): unknown =>
    mirroredOf(
      from,
      [ONE],
      () => {
        throw new Error("held fault")
      },
      []
    )
  expect(asked).toThrow(ONE)
  expect(asked).toThrow("held fault")
})

test("a mirror that could not be written is swept rather than left under /var/tmp", () => {
  const from = repo({})
  let said = ""
  try {
    mirroredOf(
      from,
      [ONE],
      () => {
        throw new Error("held fault")
      },
      []
    )
  } catch (thrown) {
    said = thrown instanceof Error ? thrown.message : String(thrown)
  }
  expect(said).toContain("held fault")
  expect(existsSync(join(UNDER, "akasha-mirror-"))).toBe(false)
})
