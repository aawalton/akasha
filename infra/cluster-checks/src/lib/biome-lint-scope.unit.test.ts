import { describe, expect, test } from "bun:test"
import {
  biomeEffectiveLintedFiles,
  biomeLintsPath,
  biomePositiveExtensions,
  globToRegExp,
  parseBiomeIncludes,
} from "./biome-lint-scope.ts"

const CONFIG = JSON.stringify({
  files: {
    includes: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
      "!**/node_modules",
      "!**/*.config.js",
      "!temper/addons/plugins/*.js",
      "!shared/supabase-database/src/generated",
    ],
  },
})

describe("globToRegExp", () => {
  test("**/*.js matches at any depth", () => {
    expect(globToRegExp("**/*.js").test("temper/web/public/sidebar-boot.js")).toBe(true)
    expect(globToRegExp("**/*.js").test("root.js")).toBe(true)
  })
  test("single * does not cross a directory separator", () => {
    expect(
      globToRegExp("temper/addons/plugins/*.js").test(
        "temper/addons/plugins/tstl-no-multi-store.js"
      )
    ).toBe(true)
    expect(
      globToRegExp("temper/addons/plugins/*.js").test(
        "temper/addons/plugins/sub/x.js"
      )
    ).toBe(false)
  })
  test("a bare directory pattern excludes the directory and its contents", () => {
    const re = globToRegExp("**/node_modules")
    expect(re.test("x/node_modules")).toBe(true)
    expect(re.test("x/node_modules/pkg/index.js")).toBe(true)
  })
  test("a literal path prefix excludes everything under it", () => {
    const re = globToRegExp("shared/supabase-database/src/generated")
    expect(re.test("shared/supabase-database/src/generated/types.ts")).toBe(true)
  })
})

describe("parseBiomeIncludes", () => {
  test("splits positive and negative include entries", () => {
    const { positives, negatives } = parseBiomeIncludes(CONFIG)
    expect(positives).toContain("**/*.js")
    expect(negatives).toContain("**/node_modules")
    expect(negatives).toContain("**/*.config.js")
  })
  test("throws when files.includes is absent", () => {
    expect(() => parseBiomeIncludes(JSON.stringify({ files: {} }))).toThrow()
  })
})

describe("biomeLintsPath", () => {
  const includes = parseBiomeIncludes(CONFIG)
  test("a public sidebar-boot.js is linted", () => {
    expect(biomeLintsPath("temper/web/public/sidebar-boot.js", includes)).toBe(true)
  })
  test("a *.config.js is excluded", () => {
    expect(biomeLintsPath("vite.config.js", includes)).toBe(false)
  })
  test("a tstl plugin under the excluded dir is excluded", () => {
    expect(biomeLintsPath("temper/addons/plugins/tstl-no-multi-store.js", includes)).toBe(
      false
    )
  })
  test("a file under node_modules is excluded", () => {
    expect(biomeLintsPath("x/node_modules/dep/index.js", includes)).toBe(false)
  })
  test("a .md file is not in lint scope", () => {
    expect(biomeLintsPath("docs/x.md", includes)).toBe(false)
  })
})

describe("biomeEffectiveLintedFiles", () => {
  test("keeps only biome-linted files", () => {
    const includes = parseBiomeIncludes(CONFIG)
    const linted = biomeEffectiveLintedFiles(
      [
        "temper/web/public/sidebar-boot.js",
        "x/a.ts",
        "vite.config.js",
        "docs/x.md",
        "x/node_modules/dep/index.js",
      ],
      includes
    )
    expect(linted).toEqual(["temper/web/public/sidebar-boot.js", "x/a.ts"])
  })
})

describe("biomePositiveExtensions", () => {
  test("extracts the declared **/*.EXT extensions", () => {
    expect(biomePositiveExtensions(parseBiomeIncludes(CONFIG))).toEqual(["js", "jsx", "ts", "tsx"])
  })
})
