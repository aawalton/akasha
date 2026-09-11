import { expect, test } from "bun:test"
import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { keptAt } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  bodyWith,
  SECRETS_FILE,
  saveWorkstationSecret,
} from "akasha/infrastructure/secrets/workstation-secrets/workstation-secrets.module.code.ts"

const NAME = "GOOGLE_OAUTH_REFRESH_TOKEN"

test("a name the file already holds is replaced where that name sits", () => {
  const body = `export A='one'\nexport ${NAME}='old'\nexport B='two'\n`

  expect(bodyWith(body, NAME, "new")).toBe(`export A='one'\nexport ${NAME}='new'\nexport B='two'\n`)
})

test("a name the file holds without export is replaced by one with it", () => {
  expect(bodyWith(`${NAME}=old\n`, NAME, "new")).toBe(`export ${NAME}='new'\n`)
})

test("a name no line holds is appended at the end", () => {
  expect(bodyWith("export A='one'\n", NAME, "new")).toBe(`export A='one'\nexport ${NAME}='new'\n`)
})

test("a body ending in no newline is given one before the line appended", () => {
  expect(bodyWith("export A='one'", NAME, "new")).toBe(`export A='one'\nexport ${NAME}='new'\n`)
})

test("an empty body is the one line", () => {
  expect(bodyWith("", NAME, "new")).toBe(`export ${NAME}='new'\n`)
})

test("a name another name opens with is not mistaken for that name", () => {
  const body = `export ${NAME}_TWO='other'\n`

  expect(bodyWith(body, NAME, "new")).toBe(`export ${NAME}_TWO='other'\nexport ${NAME}='new'\n`)
})

test("a value carrying a quote the shell would act on is refused", () => {
  const home = keptAt("workstation-secrets-")

  expect(() => saveWorkstationSecret(NAME, "one'two", home)).toThrow("single quote")
})

test("the file written is readable by its owner alone", () => {
  const home = keptAt("workstation-secrets-")

  const at = saveWorkstationSecret(NAME, "minted", home)

  expect(at).toBe(join(home, SECRETS_FILE))
  expect(readFileSync(at, "utf8")).toBe(`export ${NAME}='minted'\n`)
  expect(statSync(at).mode & 0o777).toBe(0o600)
})
