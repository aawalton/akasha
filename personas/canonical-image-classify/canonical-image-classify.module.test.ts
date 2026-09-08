import { describe, expect, test } from "bun:test"
import type { NamedRoot } from "../image-locator/image-locator.module.code.ts"
import {
  CANONICAL_BACKFILL_TAG,
  classifyCanonicalImage,
} from "./canonical-image-classify.module.code.ts"

const ROOTS: readonly NamedRoot[] = [
  { tag: "personas", root: "/img/personas" },
  { tag: "generated", root: "/img/generated" },
]

const classify = (path: string) => classifyCanonicalImage(path, ROOTS)

describe("classifyCanonicalImage", () => {
  test("answers nothing for a path under none of the roots", () => {
    expect(classify("/elsewhere/aria/anchor.png")).toBeNull()
  })

  test("answers nothing for a file that is not an image", () => {
    expect(classify("/img/personas/aria/notes.txt")).toBeNull()
  })

  test("reads a file straight under a persona as her anchor", () => {
    const found = classify("/img/personas/aria/anchor.png")
    expect(found?.bucket).toBe("personas")
    expect(found?.category).toBe("anchor")
    expect(found?.persona).toBe("aria")
    expect(found?.relative).toBe("aria/anchor.png")
  })

  test("tags every image it classifies as a backfill", () => {
    expect(classify("/img/personas/aria/anchor.png")?.tags).toContain(CANONICAL_BACKFILL_TAG)
  })

  test("reads a persona's training folder as lora source", () => {
    const found = classify("/img/personas/aria/training/x.png")
    expect(found?.category).toBe("lora-source")
    expect(found?.tags).toContain("training")
  })

  test("reads a named images bucket by the name it carries", () => {
    expect(classify("/img/personas/aria/images/canon/x.png")?.category).toBe("canon")
    expect(classify("/img/personas/aria/images/finalists/x.png")?.category).toBe("finalist")
    expect(classify("/img/personas/aria/images/lora/x.png")?.category).toBe("lora-source")
  })

  test("answers nothing for an images bucket nobody named", () => {
    expect(classify("/img/personas/aria/images/rejects/x.png")).toBeNull()
  })

  test("reads a grade off the folder of an explore run", () => {
    const found = classify("/img/generated/aria-explore/A+/x.png")
    expect(found?.bucket).toBe("explore")
    expect(found?.grade).toBe("A+")
    expect(found?.persona).toBe("aria")
  })

  test("reads a grade off the end of the filename where the folder gives none", () => {
    expect(classify("/img/generated/aria-explore/shot-S.png")?.grade).toBe("S")
  })

  test("leaves the grade unstated where the filename carries none", () => {
    expect(classify("/img/generated/aria-explore/shot.png")?.grade).toBeUndefined()
  })

  test("tags a sub-folder that is no grade as a bucket", () => {
    expect(classify("/img/generated/aria-explore/keepers/x.png")?.tags).toContain("bucket:keepers")
  })

  test("names no persona for a file straight under the generated root", () => {
    const found = classify("/img/generated/x.png")
    expect(found?.category).toBe("generated-output")
    expect(found?.persona).toBeUndefined()
  })

  test("takes a known suffix off a generated folder to find the persona", () => {
    expect(classify("/img/generated/aria-wallpaper-compose/x.png")?.persona).toBe("aria")
    expect(classify("/img/generated/aria-voice/x.png")?.persona).toBe("aria")
  })
})
