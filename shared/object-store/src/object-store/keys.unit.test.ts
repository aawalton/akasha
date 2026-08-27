import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { z } from "zod"
import { seaweedFsMissingEnvVars } from "../config"
import { audioObjectKey, imageObjectKey, imageObjectReadKeys, legacyImageObjectKey, mediaRenderObjectKey } from "../keys"

describe("imageObjectKey", () => {
  it("builds the general images/<pageId>.png write key", () => {
    expect(imageObjectKey("019ee78b-e512-7995-bd1d-3f1881d9bba0")).toBe(
      "images/019ee78b-e512-7995-bd1d-3f1881d9bba0.png"
    )
  })

  it("is stable (same page id -> same key, for overwrite-in-place)", () => {
    const id = "019ee789-9498-759a-89b3-5a9239237b9d"
    expect(imageObjectKey(id)).toBe(imageObjectKey(id))
  })
})

describe("audioObjectKey", () => {
  it("builds the audio/<pageId>.wav write key", () => {
    expect(audioObjectKey("019ee78b-e512-7995-bd1d-3f1881d9bba0")).toBe(
      "audio/019ee78b-e512-7995-bd1d-3f1881d9bba0.wav"
    )
  })

  it("is stable (same page id -> same key, for overwrite-in-place)", () => {
    const id = "019ee789-9498-759a-89b3-5a9239237b9d"
    expect(audioObjectKey(id)).toBe(audioObjectKey(id))
  })
})

describe("legacyImageObjectKey", () => {
  it("builds the pre-generalization persona-images/<pageId>.png key", () => {
    expect(legacyImageObjectKey("019ee78b-e512-7995-bd1d-3f1881d9bba0")).toBe(
      "persona-images/019ee78b-e512-7995-bd1d-3f1881d9bba0.png"
    )
  })
})

describe("imageObjectReadKeys", () => {
  it("returns the general key first, then the legacy key (new -> old read order)", () => {
    const id = "019ee78b-e512-7995-bd1d-3f1881d9bba0"
    expect(imageObjectReadKeys(id)).toEqual([imageObjectKey(id), legacyImageObjectKey(id)])
  })
})

describe("mediaRenderObjectKey", () => {
  it("builds media-renders/<pageId>/<medium>/<variant>.<ext>", () => {
    expect(
      mediaRenderObjectKey("019ea3a3-a93b-7646-9058-1d4c02ac2e4c", "audio", "aura", "mp3")
    ).toBe("media-renders/019ea3a3-a93b-7646-9058-1d4c02ac2e4c/audio/aura.mp3")
  })

  it("is stable (same triple -> same key, for overwrite-in-place)", () => {
    const args = ["019ea3a4-f5aa-7249-8d5c-67add69cb2d9", "audio", "aine", "mp3"] as const
    expect(mediaRenderObjectKey(...args)).toBe(mediaRenderObjectKey(...args))
  })

  it("separates the variant namespace per medium", () => {
    const page = "019ea3a3-a93b-7646-9058-1d4c02ac2e4c"
    expect(mediaRenderObjectKey(page, "audio", "aura", "mp3")).not.toBe(
      mediaRenderObjectKey(page, "video", "aura", "mp4")
    )
  })
})

describe("seaweedFsMissingEnvVars", () => {
  const REQUIRED = [
    "SEAWEEDFS_S3_ENDPOINT",
    "SEAWEEDFS_BUCKET",
    "SEAWEEDFS_ACCESS_KEY",
    "SEAWEEDFS_SECRET_KEY",
  ] as const
  const saved: Record<string, string | undefined> = {}
  const ENV_SCHEMA = z.string().optional()

  beforeEach(() => {
    for (const k of REQUIRED) {
      saved[k] = ENV_SCHEMA.parse(process.env[k])
      delete process.env[k]
    }
  })
  afterEach(() => {
    for (const k of REQUIRED) {
      const v = saved[k]
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
    }
  })

  it("returns all four names when none are set", () => {
    expect(seaweedFsMissingEnvVars()).toEqual([...REQUIRED])
  })

  it("returns empty when all four are set", () => {
    for (const k of REQUIRED) process.env[k] = "x"
    expect(seaweedFsMissingEnvVars()).toEqual([])
  })

  it("returns only the missing subset, preserving canonical order", () => {
    process.env.SEAWEEDFS_S3_ENDPOINT = "x"
    process.env.SEAWEEDFS_ACCESS_KEY = "x"
    expect(seaweedFsMissingEnvVars()).toEqual(["SEAWEEDFS_BUCKET", "SEAWEEDFS_SECRET_KEY"])
  })
})
