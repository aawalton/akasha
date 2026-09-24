import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"

describe("ROOT", () => {
  test("names a checkout, which the `.git` at the top of it marks", () => {
    expect(existsSync(join(ROOT, ".git"))).toBe(true)
  })

  test("holds the manifest the one package states itself in", () => {
    expect(existsSync(join(ROOT, "package.json"))).toBe(true)
  })
})
