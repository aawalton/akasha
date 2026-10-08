import { expect, test } from "bun:test"
import { mkdtemp, readdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { SCRATCH_AT } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  highestNumberIn,
  numberedName,
  writeNumbered,
} from "akasha/infrastructure/inference/client/modules/inference-output-path/inference-output-path.module.code.ts"

const BYTES = new Uint8Array([1, 2, 3])

test("the highest number is read off names led by digits, and nothing else", () => {
  expect(highestNumberIn([])).toBe(0)
  expect(highestNumberIn(["001-a.png", "012-b.png", "prompt.txt", "7-c.png"])).toBe(12)
})

test("a name is led by the number padded to three digits", () => {
  expect(numberedName("niala.png", 4)).toBe("004-niala.png")
  expect(numberedName("niala.png", 1234)).toBe("1234-niala.png")
})

test("a name already led by a number is left as named", () => {
  expect(numberedName("009-niala.png", 4)).toBe("009-niala.png")
})

test("each output is written one past the highest number in its folder", async () => {
  const folder = await mkdtemp(join(SCRATCH_AT, "numbered-"))
  await writeFile(join(folder, "002-old.png"), BYTES)
  const first = await writeNumbered(join(folder, "a.png"), BYTES)
  const second = await writeNumbered(join(folder, "a.png"), BYTES)
  expect(first).toBe(join(folder, "003-a.png"))
  expect(second).toBe(join(folder, "004-a.png"))
  expect((await readdir(folder)).sort()).toEqual(["002-old.png", "003-a.png", "004-a.png"])
})

test("a folder not yet made is made, and its first output is numbered one", async () => {
  const folder = join(await mkdtemp(join(SCRATCH_AT, "numbered-")), "fresh")
  expect(await writeNumbered(join(folder, "a.png"), BYTES)).toBe(join(folder, "001-a.png"))
})
