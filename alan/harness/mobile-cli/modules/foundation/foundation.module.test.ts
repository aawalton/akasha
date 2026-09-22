import { describe, expect, test } from "bun:test"
import { buildRunCheckout } from "akasha/alan/harness/mobile-cli/modules/foundation/foundation.module.code.ts"

const COMMIT = "0".repeat(40)

const EXPORT_AT = '"$NATIVE_SHELL_CHECKOUT"'

const INDEX_AT = '"$NATIVE_SHELL_CHECKOUT.index"'

const COMMIT_READ = '"$_CHECKOUT_COMMIT"'

function lineWith(script: string, held: string): string {
  const found = script.split("\n").filter((line) => line.includes(held))
  expect(found.length).toBe(1)
  return found.join("")
}

describe("the mac checkout a run compiles", () => {
  test("the export is written out of the commit the run names", () => {
    const script = buildRunCheckout(COMMIT)
    expect(script).toContain(`rev-parse --verify "${COMMIT}^{commit}"`)
    expect(lineWith(script, "read-tree")).toContain(`read-tree --reset -u ${COMMIT_READ}`)
    expect(lineWith(script, "read-tree")).toContain(`--work-tree=${EXPORT_AT}`)
  })

  test("the clone is fetched before the commit is read out of it", () => {
    const script = buildRunCheckout(COMMIT)
    const fetched = script.indexOf("fetch origin")
    expect(fetched).toBeGreaterThan(-1)
    expect(script.indexOf("rev-parse")).toBeGreaterThan(fetched)
  })

  test("the index git writes sits outside the export git writes", () => {
    const script = buildRunCheckout(COMMIT)
    expect(lineWith(script, "read-tree")).toContain(`GIT_INDEX_FILE=${INDEX_AT} `)
    expect(script).not.toContain(`GIT_INDEX_FILE=${EXPORT_AT}/`)
  })

  test("the export is stamped at its root with the commit it was written from", () => {
    const script = buildRunCheckout(COMMIT)
    expect(script).toContain(`printf '%s\\n' ${COMMIT_READ} > ${EXPORT_AT}/.pinned-commit`)
  })

  test("the stamping seam is told that commit, the export having no git to ask", () => {
    const script = buildRunCheckout(COMMIT)
    expect(script).toContain(`export NATIVE_SHELL_STAMP_COMMIT=${COMMIT_READ}`)
  })

  test("taking the checkout away removes the export and the index", () => {
    const script = buildRunCheckout(COMMIT)
    expect(script).toContain(`_on_cleanup 'rm -rf ${EXPORT_AT} ${INDEX_AT} || true'`)
    expect(script.indexOf("_on_cleanup")).toBeLessThan(script.indexOf("read-tree"))
  })

  test("nothing in the checkout reaches for a git worktree", () => {
    expect(buildRunCheckout(COMMIT)).not.toContain("worktree")
  })
})
