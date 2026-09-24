import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  bundleAt,
  checkedOut,
  stubFor,
  TELLER_STEM,
  unitAt,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import { TELLING_TEMPLATE } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function committed(root: string, body: string): string {
  writeFileSync(join(root, "one.ts"), body)
  writeFileSync(join(root, "notes.md"), body)
  gitSaid(root, ["add", "."])
  gitSaid(root, ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", body])
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

test("a commit is checked out apart, holding only code, and moved to the next commit", () => {
  const root = scratch.rootFor("akasha-bundling-")
  gitSaid(root, ["init", "-q"])
  const first = committed(root, "export const one = 1\n")
  const second = committed(root, "export const one = 2\n")
  const at = join(scratch.rootFor("akasha-bundling-tree-"), "tree")
  const checked = checkedOut(root, first, at)
  expect(checked).toEqual({ tree: at })
  expect(readFileSync(join(at, "one.ts"), "utf8")).toBe("export const one = 1\n")
  expect(existsSync(join(at, "notes.md"))).toBe(false)
  writeFileSync(join(root, "one.ts"), "export const one = 3\n")
  checkedOut(root, second, at)
  expect(readFileSync(join(at, "one.ts"), "utf8")).toBe("export const one = 2\n")
})

const HOME = "/home/one"

const RUNNING = "/repo/one/running.code.ts"

const COMMIT = "a".repeat(40)

test("a stub awaits the run the caller names, handed nothing by default", () => {
  expect(stubFor(RUNNING)).toBe(`import { runService } from "${RUNNING}"\n\nawait runService()\n`)
})

test("a stub hands its run what the caller spells", () => {
  expect(stubFor(RUNNING, "runServiceTelling", "process.argv[2]")).toBe(
    `import { runServiceTelling } from "${RUNNING}"\n\nawait runServiceTelling(process.argv[2])\n`
  )
})

test("the teller's bundle is filed under the stem of the template that starts it", () => {
  expect(`${TELLER_STEM}.service`).toBe(TELLING_TEMPLATE)
  expect(bundleAt(HOME, TELLER_STEM, COMMIT)).toBe(
    `${HOME}/.local/state/workstation-services/${TELLER_STEM}/${COMMIT}.js`
  )
  expect(unitAt(HOME, TELLER_STEM)).toBe(
    `${HOME}/.local/state/workstation-services/${TELLING_TEMPLATE}`
  )
})
