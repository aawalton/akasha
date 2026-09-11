import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  extensionsIn,
  ranBy,
} from "akasha/infrastructure/container-image/dockerfiles/built-images/auth-proxy/auth-proxy.built-image.extending.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const WRITTEN = "auth-proxy.built-image.extensions.json"

const OWN = "auth-proxy.built-image.extending.code.ts"

function committed(): string {
  return readFileSync(join(HERE, WRITTEN), "utf8")
}

test("what is written here is what is committed beside this test, byte for byte", () => {
  expect(extensionsIn(ROOT)).toBe(committed())
})

test("the module the image runs is a file that is there", () => {
  expect(existsSync(join(ROOT, ranBy(ROOT)))).toBe(true)
})

test("the code writing the extensions spells none of that module's path", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(ranBy(ROOT))
})
