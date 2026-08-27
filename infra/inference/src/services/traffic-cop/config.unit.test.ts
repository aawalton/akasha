import { describe, expect, test } from "bun:test"
import { PoolConfigSchema } from "./config"

const sample = {
  adminPort: 8099,
  warmSet: ["image-gen"],
  services: [
    {
      name: "image-gen",
      publicPort: 8086,
      publicHost: "0.0.0.0",
      internalPort: 18086,
      launchdLabel: "com.alanwalton.inference.image-gen",
    },
    {
      name: "ollama",
      publicPort: 11434,
      publicHost: "127.0.0.1",
      internalPort: 21434,
      launchdLabel: "com.alanwalton.inference.ollama",
    },
  ],
}

describe("PoolConfigSchema", () => {
  test("accepts the authoritative contract sample", () => {
    const parsed = PoolConfigSchema.parse(sample)
    expect(parsed.adminPort).toBe(8099)
    expect(parsed.warmSet).toEqual(["image-gen"])
    expect(parsed.services).toHaveLength(2)
    expect(parsed.services[0]?.name).toBe("image-gen")
    expect(parsed.services[1]?.publicHost).toBe("127.0.0.1")
  })

  test("rejects a missing warmSet (required — the generator always emits it)", () => {
    const { warmSet: _omit, ...rest } = sample
    expect(() => PoolConfigSchema.parse(rest)).toThrow()
  })

  test("rejects an unknown top-level key (strict)", () => {
    expect(() => PoolConfigSchema.parse({ ...sample, extra: true })).toThrow()
  })

  test("rejects an unknown service key (strict)", () => {
    const bad = {
      ...sample,
      services: [{ ...sample.services[0], rogue: 1 }],
    }
    expect(() => PoolConfigSchema.parse(bad)).toThrow()
  })

  test("rejects a missing required field", () => {
    const { adminPort: _omit, ...rest } = sample
    expect(() => PoolConfigSchema.parse(rest)).toThrow()
  })

  test("rejects an out-of-enum publicHost", () => {
    const bad = {
      ...sample,
      services: [{ ...sample.services[0], publicHost: "192.168.0.1" }],
    }
    expect(() => PoolConfigSchema.parse(bad)).toThrow()
  })
})
