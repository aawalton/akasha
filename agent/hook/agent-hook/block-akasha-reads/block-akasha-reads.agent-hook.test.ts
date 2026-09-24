import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  imageBytesAt,
  refusalIn,
  SCOPE,
} from "akasha/agent/hook/agent-hook/block-akasha-reads/block-akasha-reads.agent-hook.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { image } from "akasha/infrastructure/inference/generation/image/image.page-type.ts"
import { imageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldAt(): string {
  const root = realpathSync(scratch.rootFor("akasha-reads-hook-"))
  mkdirSync(join(root, "one"), { recursive: true })
  writeFileSync(join(root, "one", "held.ts"), "one\n")
  return root
}

function awayAt(): string {
  const away = realpathSync(scratch.rootFor("akasha-reads-away-"))
  writeFileSync(join(away, "held.ts"), "one\n")
  return away
}

test("a Read inside the checkout is refused and names the akasha read", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "held.ts"), root, root)
  expect(said).not.toBeNull()
  expect(said).toContain("akasha read --file-path one/held.ts")
  expect(said).toContain("inside this checkout")
})

test("a refusal says the output must reach the agent", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "held.ts"), root, root)
  expect(said).toContain("LET THE OUTPUT REACH YOU")
  expect(said).toContain("/dev/null")
})

test("a refusal says a body already held comes back as one line", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "held.ts"), root, root)
  expect(said).toContain("already hold")
  expect(said).toContain("--full")
})

test("a path is resolved against the directory the call was made in", () => {
  const root = worldAt()
  const said = refusalIn("held.ts", join(root, "one"), root)
  expect(said).toContain("akasha read --file-path one/held.ts")
})

test("a path spelled through a parent still lands inside", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "..", "one", "held.ts"), root, root)
  expect(said).not.toBeNull()
})

test("a Read outside the checkout is let through", () => {
  const root = worldAt()
  expect(refusalIn(join(awayAt(), "held.ts"), root, root)).toBeNull()
})

test("the index is no page, so a Read of it is let through", () => {
  const root = worldAt()
  mkdirSync(join(root, INDEX_AT), { recursive: true })
  writeFileSync(join(root, INDEX_AT, "one.jsonl"), "{}\n")
  expect(refusalIn(join(root, INDEX_AT, "one.jsonl"), root, root)).toBeNull()
})

test("a link inside the checkout pointing out of it is let through", () => {
  const root = worldAt()
  symlinkSync(join(awayAt(), "held.ts"), join(root, "pointer.ts"))
  expect(refusalIn(join(root, "pointer.ts"), root, root)).toBeNull()
})

test("a link outside the checkout pointing into it is refused", () => {
  const root = worldAt()
  const away = awayAt()
  symlinkSync(join(root, "one", "held.ts"), join(away, "pointer.ts"))
  expect(refusalIn(join(away, "pointer.ts"), root, root)).not.toBeNull()
})

test("a call naming no path is let through", () => {
  const root = worldAt()
  expect(refusalIn("", root, root)).toBeNull()
  expect(refusalIn("   ", root, root)).toBeNull()
})

test("another checkout of the repository is not guarded from here", () => {
  const one = worldAt()
  const other = worldAt()
  expect(refusalIn(join(other, "one", "held.ts"), other, one)).toBeNull()
})

test("a file that is not there yet is judged by where it would land", () => {
  const root = worldAt()
  expect(refusalIn(join(root, "one", "unborn.ts"), root, root)).not.toBeNull()
})

const PICTURE = "image-0123456789abcdef"

function pictureAt(root: string, name: string): string {
  mkdirSync(join(root, "pictures"), { recursive: true })
  writeFileSync(join(root, "pictures", name), "bytes\n")
  return join(root, "pictures", name)
}

test("an image's bytes are let through under each ending the image page type holds them in", () => {
  const root = worldAt()
  for (const ending of imageBytes.extensions) {
    const at = pictureAt(root, `${PICTURE}.image.${imageBytes.propertySlug}.uncommitted.${ending}`)
    expect(imageBytesAt(at)).toBe(true)
    expect(refusalIn(at, root, root)).toBeNull()
  }
})

test("the image page beside the bytes is refused", () => {
  const root = worldAt()
  expect(refusalIn(pictureAt(root, `${PICTURE}.image.ts`), root, root)).not.toBeNull()
  expect(refusalIn(pictureAt(root, `${PICTURE}.image.uncommitted.ts`), root, root)).not.toBeNull()
})

test("bytes under an ending the image page type does not hold are refused", () => {
  const root = worldAt()
  const at = pictureAt(root, `${PICTURE}.image.${imageBytes.propertySlug}.uncommitted.ts`)
  expect(refusalIn(at, root, root)).not.toBeNull()
})

test("a file named like bytes beside a page of another type is refused", () => {
  const root = worldAt()
  const at = pictureAt(root, `${PICTURE}.persona.${imageBytes.propertySlug}.uncommitted.jpg`)
  expect(refusalIn(at, root, root)).not.toBeNull()
})

test("a file beside an image under another property is refused", () => {
  const root = worldAt()
  const at = pictureAt(root, `${PICTURE}.image.other.uncommitted.jpg`)
  expect(refusalIn(at, root, root)).not.toBeNull()
})

test("the image page type declares the bytes it lets through", () => {
  expect(image.properties.map((one) => one.pageProperty)).toContain(
    `file-property/${imageBytes.slug}`
  )
})

test("what this does not reach is printed, and names Grep and Glob and the index", () => {
  expect(SCOPE.join("\n")).toContain("NOT REACHED")
  expect(SCOPE.join("\n")).toContain("Grep and Glob")
  expect(SCOPE.join("\n")).toContain(INDEX_AT)
})
