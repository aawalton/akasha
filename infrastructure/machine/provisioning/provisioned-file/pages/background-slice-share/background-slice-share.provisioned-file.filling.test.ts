import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/infrastructure/machine/provisioning/provisioned-file/pages/background-slice-share/background-slice-share.provisioned-file.filling.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const HERE = dirname(import.meta.path)

const CONTENT = "background-slice-share.provisioned-file.content.conf"

test("the body written here is the content committed beside this test, byte for byte", () => {
  expect(bodyIn(codeRoot())).toBe(readFileSync(join(HERE, CONTENT), "utf8"))
})
