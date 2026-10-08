import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/code/ios-app/pages/alanwalton/scripts/ios-seam/alanwalton-ios-seam.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-ios-seam.shell-script.shell.sh"

const OWN = "alanwalton-ios-seam.shell-script.scripting.code.ts"

const MOVED = "code-system"

const SOURCED = "# shellcheck source="

const WORK = 'ICON_WORK="$(mktemp -d)"'

const NAMED = 'ICON_SOURCE="$ICON_WORK/AppIcon-1024.png"'

const REMOVAL = "trap 'rm -rf \"$ICON_WORK\" || true' EXIT"

const DECODED = 'carried_file_out "$ICON_CARRIER" "$ICON_SOURCE"'

const CONSUMED = '. "$SEAM_DIR/app-icon/'

const HOLDING = "ICON_WORK"

const REMOVES = "rm -rf"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every script the seam reads in is a file that is there", () => {
  const said = bodyIn(ROOT)
    .split("\n")
    .filter((one) => one.startsWith(SOURCED))
    .map((one) => one.slice(SOURCED.length))
  expect(said).toHaveLength(30)
  expect(said.filter((one) => !existsSync(join(HERE, one)))).toEqual([])
})

test("the script names the directory it decodes the icon into, and removes that directory", () => {
  const lines = bodyIn(ROOT).split("\n")
  expect(lines).toContain(WORK)
  expect(lines).toContain(NAMED)
  expect(lines).toContain(REMOVAL)
})

test("the icon's directory is removed as the run ends, after the icon is copied out", () => {
  const lines = bodyIn(ROOT).split("\n")
  const decoded = lines.indexOf(DECODED)
  const consumed = lines.findIndex((one) => one.startsWith(CONSUMED))
  expect(decoded).toBeGreaterThan(0)
  expect(consumed).toBeGreaterThan(decoded)
  const removing = lines.filter((one) => one.includes(HOLDING) && one.includes(REMOVES))
  expect(removing).toEqual([REMOVAL])
  const between = lines.slice(decoded, consumed + 1).filter((one) => one.includes(HOLDING))
  expect(between).toEqual([])
})
