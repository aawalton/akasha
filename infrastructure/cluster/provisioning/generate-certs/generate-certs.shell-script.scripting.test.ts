import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { bodyIn } from "akasha/infrastructure/cluster/provisioning/generate-certs/generate-certs.shell-script.scripting.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "shell-script"

const OWN = "generate-certs"

const SOURCED = "deploy-functions"

const SHELL = "shell"

const BESIDE = "generate-certs.shell-script.shell.sh"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, BESIDE), "utf8"))
})

test("the script the body sources is where the index answers that script sits", () => {
  const at = fileOf(ROOT, valuedAt(ROOT, SCRIPT, SOURCED), SCRIPT, SHELL)
  const own = dirname(valuedAt(ROOT, SCRIPT, OWN).path)
  expect(bodyIn(ROOT)).toContain(relative(own, at))
})
