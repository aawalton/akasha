import { expect, test } from "bun:test"
import { reasonsIn } from "akasha/check/code/pages/change-is-reached-through-a-runner/change-is-reached-through-a-runner.check-code.decision.code.ts"
import { bodiesIn } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

const HOME = "change/mechanical/folder/move/shift-folder"

const AT = `${HOME}/shift-folder.change-mechanical-folder.code.ts`

const OTHER =
  "akasha/change/mechanical/file-content/rename/point-names/point-names.change-mechanical-file-content.code.ts"

const OWN = `akasha/${AT}`

test("a body naming another change's code is refused, and names the specifier", () => {
  const said = reasonsIn(given(AT, `import { runChange } from "${OTHER}"\n`))

  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${OTHER}\``)
  expect(said[0]).toContain("reached through a runner")
})

test("a file beside a change naming that change's own code is let through", () => {
  const at = `${HOME}/shift-folder.change-mechanical-folder.ts`

  expect(reasonsIn(given(at, `import { runChange } from "${OWN}"\n`))).toEqual([])
})

test("the map beside a runner names every change and is let through", () => {
  const at = "change/runner/pages/held-running/held-running.change-runner.addressed.ts"

  expect(reasonsIn(given(at, `import { runChange } from "${OTHER}"\n`))).toEqual([])
})

test("a test naming another change's code is refused as any other body is", () => {
  const at = `${HOME}/shift-folder.change-mechanical-folder.test.ts`

  expect(reasonsIn(given(at, `import { runChange } from "${OTHER}"\n`))).toHaveLength(1)
})

test("a test naming the code beside it is let through", () => {
  const at = `${HOME}/shift-folder.change-mechanical-folder.test.ts`

  expect(reasonsIn(given(at, `import { runChange } from "${OWN}"\n`))).toEqual([])
})

test("a module naming no change is let through", () => {
  const body =
    'import { one } from "akasha/change/modules/held-answer/held-answer.module.code.ts"\n'

  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("one body naming two such files is refused once for each", () => {
  const held =
    "akasha/change/mechanical/file/move/shift-file/shift-file.change-mechanical-file.code.ts"
  const body = [`import { one } from "${OTHER}"`, `import { two } from "${held}"`].join("\n")

  expect(reasonsIn(given(AT, body))).toHaveLength(2)
})

test("a body that is not code is passed over", () => {
  expect(reasonsIn(given("changes/notes.txt", `import { one } from "${OTHER}"\n`))).toEqual([])
})

test("a string that merely spells the path is no specifier", () => {
  const body = `export const at = "${OTHER}"\n`

  expect(reasonsIn(given(AT, body))).toEqual([])
})
