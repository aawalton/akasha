import { describe, expect, it } from "bun:test"
import { type ObjectStore } from "@shared/object-store"
import { mediaRenderObjectKey } from "@shared/object-store/keys"
import { getAvailableRenditions, pickDefaultVariant } from "./media-renditions"

const PAGE = "019ea3a3-a93b-7646-9058-1d4c02ac2e4c"

function fakeStore(presentKeys: ReadonlySet<string>): ObjectStore {
  return {
    head: async (key: string) => (presentKeys.has(key) ? { size: 1 } : null),
    append: () => {
      throw new Error("append not expected")
    },
    put: () => {
      throw new Error("put not expected")
    },
    get: () => {
      throw new Error("get not expected")
    },
    getStream: () => {
      throw new Error("getStream not expected")
    },
  }
}

describe("getAvailableRenditions", () => {
  it("returns only candidates with a rendered object, preserving candidate order", async () => {
    const present = new Set([
      mediaRenderObjectKey(PAGE, "audio", "aura", "mp3"),
      mediaRenderObjectKey(PAGE, "audio", "aine", "mp3"),
    ])
    const available = await getAvailableRenditions(fakeStore(present), {
      pageId: PAGE,
      medium: "audio",
      candidates: ["abby", "aine", "amy", "aura"],
    })
    expect(available).toEqual(["aine", "aura"])
  })

  it("returns empty when no candidate has a rendition", async () => {
    const available = await getAvailableRenditions(fakeStore(new Set()), {
      pageId: PAGE,
      medium: "audio",
      candidates: ["aura", "aine"],
    })
    expect(available).toEqual([])
  })

  it("returns empty for an empty candidate set", async () => {
    const available = await getAvailableRenditions(fakeStore(new Set()), {
      pageId: PAGE,
      medium: "audio",
      candidates: [],
    })
    expect(available).toEqual([])
  })
})

describe("pickDefaultVariant", () => {
  it("returns the narrator when it has a rendered variant", () => {
    expect(pickDefaultVariant("aura", ["aine", "aura"])).toBe("aura")
  })

  it("returns null when the narrator has no rendered variant (preserves unrendered behavior)", () => {
    expect(pickDefaultVariant("zadi", ["aine", "aura"])).toBeNull()
  })

  it("returns null when the narrator is unset", () => {
    expect(pickDefaultVariant(null, ["aine", "aura"])).toBeNull()
  })

  it("returns null when the narrator is an empty string", () => {
    expect(pickDefaultVariant("", ["aine", "aura"])).toBeNull()
  })

  it("returns null when no variants are rendered", () => {
    expect(pickDefaultVariant("aura", [])).toBeNull()
  })
})
