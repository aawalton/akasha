import { expect, test } from "bun:test"
import { join } from "node:path"
import { globbedSource } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/bundle-meta-glob/bundle-meta-glob.module.code.ts"

const AT = join(import.meta.dir, "bundle-meta-glob.module.code.ts")

test("an eager glob becomes an import of each file found, keyed by its path from the caller", () => {
  const text = 'const FOUND = import.meta.glob<Filed>("./*.module.test.ts", {\n  eager: true,\n})\n'
  expect(globbedSource(text, AT)).toBe(
    `import * as __metaGlob0 from ${JSON.stringify(join(import.meta.dir, "bundle-meta-glob.module.test.ts"))}\n` +
      'const FOUND = { "./bundle-meta-glob.module.test.ts": __metaGlob0 }\n'
  )
})

test("the caller never finds itself", () => {
  const text = 'const FOUND = import.meta.glob("./*.module.code.ts", { eager: true })'
  expect(globbedSource(text, AT)).toBe("\nconst FOUND = {  }")
})

test("a file calling no glob is left to the bundler", () => {
  expect(globbedSource("export const ONE = 1\n", AT)).toBeUndefined()
})
