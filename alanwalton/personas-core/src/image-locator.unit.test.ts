import { describe, expect, it } from "bun:test"
import {
  type NamedRoot,
  relativizeToNamedRoot,
  resolveByRootTag,
  resolveUnderRoot,
  toRootRelative,
} from "./image-locator"

const ROOT = "/home/walton/Personas"

const NAMED_ROOTS: readonly NamedRoot[] = [
  { tag: "personas", root: "/home/walton/Personas" },
  { tag: "wallpapers", root: "/home/walton/Pictures/Wallpapers/Personas" },
]

describe("toRootRelative", () => {
  it("strips the root prefix to a segment-relative locator", () => {
    expect(toRootRelative("/home/walton/Personas/Abby/images/rewards/abby-L01.png", ROOT)).toBe(
      "Abby/images/rewards/abby-L01.png"
    )
  })

  it("treats the root itself as the empty relative locator", () => {
    expect(toRootRelative(ROOT, ROOT)).toBe("")
  })

  it("tolerates a trailing slash on the root", () => {
    expect(toRootRelative("/home/walton/Personas/Aine/x.png", `${ROOT}/`)).toBe("Aine/x.png")
  })

  it("returns null for a path outside the root (no false prefix match)", () => {
    expect(toRootRelative("/home/walton/Pictures/Wallpapers/Personas/Zadi/z.png", ROOT)).toBeNull()
    expect(toRootRelative("/home/walton/Personas-other/x.png", ROOT)).toBeNull()
  })
})

describe("resolveUnderRoot", () => {
  it("re-joins a relative locator onto the root", () => {
    expect(resolveUnderRoot("Abby/images/rewards/abby-L01.png", ROOT)).toBe(
      "/home/walton/Personas/Abby/images/rewards/abby-L01.png"
    )
  })

  it("passes an absolute locator through unchanged (legacy + deferred-root rows)", () => {
    const abs = "/home/walton/Pictures/Wallpapers/Personas/Zadi/zadi-L01.png"
    expect(resolveUnderRoot(abs, ROOT)).toBe(abs)
  })

  it("round-trips relativize → resolve back to the original absolute", () => {
    const abs = "/home/walton/Personas/Mari/images/rewards/mari-L02.png"
    const rel = toRootRelative(abs, ROOT)
    if (rel === null) throw new Error("expected an under-root path to relativize")
    expect(resolveUnderRoot(rel, ROOT)).toBe(abs)
  })

  it("relocating the root re-resolves the same relative locator to the moved location", () => {
    const oldRoot = "/home/walton/Personas"
    const newRoot = "/mnt/relocated/Personas"
    const abs = `${oldRoot}/Abby/images/rewards/abby-L01.png`

    const rel = toRootRelative(abs, oldRoot)
    if (rel === null) throw new Error("expected an under-root path to relativize")
    expect(rel).toBe("Abby/images/rewards/abby-L01.png")

    expect(resolveUnderRoot(rel, newRoot)).toBe(
      "/mnt/relocated/Personas/Abby/images/rewards/abby-L01.png"
    )
  })
})

describe("relativizeToNamedRoot", () => {
  it("tags + relativizes a path under the wallpapers root", () => {
    expect(
      relativizeToNamedRoot(
        "/home/walton/Pictures/Wallpapers/Personas/Ione/ione-L01.png",
        NAMED_ROOTS
      )
    ).toEqual({ tag: "wallpapers", relative: "Ione/ione-L01.png" })
  })

  it("tags + relativizes a path under the personas root", () => {
    expect(
      relativizeToNamedRoot("/home/walton/Personas/Aria/images/aria-wallpaper.png", NAMED_ROOTS)
    ).toEqual({ tag: "personas", relative: "Aria/images/aria-wallpaper.png" })
  })

  it("returns null for a path outside every named root", () => {
    expect(relativizeToNamedRoot("/tmp/loose/aine-final.png", NAMED_ROOTS)).toBeNull()
  })
})

describe("resolveByRootTag", () => {
  it("resolves a wallpapers-tagged relative locator under the wallpapers root", () => {
    expect(resolveByRootTag("Ione/ione-L01.png", "wallpapers", NAMED_ROOTS)).toBe(
      "/home/walton/Pictures/Wallpapers/Personas/Ione/ione-L01.png"
    )
  })

  it("resolves a personas-tagged relative locator under the personas root", () => {
    expect(resolveByRootTag("Aria/images/aria-wallpaper.png", "personas", NAMED_ROOTS)).toBe(
      "/home/walton/Personas/Aria/images/aria-wallpaper.png"
    )
  })

  it("falls back to the first (personas) root for an absent tag — legacy untagged rows", () => {
    expect(resolveByRootTag("Abby/images/rewards/abby-L01.png", undefined, NAMED_ROOTS)).toBe(
      "/home/walton/Personas/Abby/images/rewards/abby-L01.png"
    )
  })

  it("falls back to the first root for an unrecognized tag", () => {
    expect(resolveByRootTag("Abby/x.png", "bogus", NAMED_ROOTS)).toBe(
      "/home/walton/Personas/Abby/x.png"
    )
  })

  it("passes an absolute locator through unchanged regardless of tag", () => {
    const abs = "/tmp/loose/aine-final.png"
    expect(resolveByRootTag(abs, "wallpapers", NAMED_ROOTS)).toBe(abs)
    expect(resolveByRootTag(abs, undefined, NAMED_ROOTS)).toBe(abs)
  })

  it("relocating the wallpapers root re-resolves the same tagged locator to the moved tree", () => {
    const oldRoots: readonly NamedRoot[] = NAMED_ROOTS
    const newRoots: readonly NamedRoot[] = [
      { tag: "personas", root: "/home/walton/Personas" },
      { tag: "wallpapers", root: "/mnt/relocated/Wallpapers/Personas" },
    ]
    const abs = "/home/walton/Pictures/Wallpapers/Personas/Ione/ione-L01.png"

    const located = relativizeToNamedRoot(abs, oldRoots)
    if (located === null) throw new Error("expected an under-wallpapers-root path to relativize")
    expect(located).toEqual({ tag: "wallpapers", relative: "Ione/ione-L01.png" })

    expect(resolveByRootTag(located.relative, located.tag, newRoots)).toBe(
      "/mnt/relocated/Wallpapers/Personas/Ione/ione-L01.png"
    )
  })
})
