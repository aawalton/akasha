import { expect, test } from "bun:test"
import { standing } from "../../no-refused-syntax.check.test-fixtures.ts"
import {
  credentialNamedIn,
  noCredentialInScriptText,
} from "./no-credential-in-script-text.syntax-rule.code.ts"

test("a file calling nothing is refused nothing", () => {
  expect(noCredentialInScriptText(standing("export const one = 1\n"))).toEqual([])
})

test("a credential joined into evaluate text is refused", () => {
  const said = noCredentialInScriptText(standing('page.evaluate("value = " + password)\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`password`")
  expect(said[0]?.reason).toContain("`evaluate`")
})

test("a credential put into a template handed to evaluate is refused", () => {
  const said = noCredentialInScriptText(standing("page.evaluate(`value = ${password}`)\n"))
  expect(said).toHaveLength(1)
})

test("evaluateHandle hands text to the browser too", () => {
  const said = noCredentialInScriptText(standing("page.evaluateHandle(`x = ${secret}`)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`evaluateHandle`")
})

test("waitForFunction hands text to the browser too", () => {
  const said = noCredentialInScriptText(standing("page.waitForFunction(`x === ${pwd}`)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`waitForFunction`")
})

test("the arrow form stands, its arguments being bound apart from the text", () => {
  const text = "page.evaluate((one) => document.write(one), password)\n"
  expect(noCredentialInScriptText(standing(text))).toEqual([])
})

test("the function-expression form stands as the arrow form does", () => {
  const text = "page.evaluate(function (one) { return one }, credential)\n"
  expect(noCredentialInScriptText(standing(text))).toEqual([])
})

test("evaluate carrying no credential stands", () => {
  expect(noCredentialInScriptText(standing("page.evaluate(`x = ${count}`)\n"))).toEqual([])
})

test("a quoted word spelling password is no credential", () => {
  expect(noCredentialInScriptText(standing('page.evaluate("password")\n'))).toEqual([])
})

test("a property named for a credential is read as a name is", () => {
  const said = noCredentialInScriptText(standing("page.evaluate(`x = ${creds.password}`)\n"))
  expect(said).toHaveLength(1)
})

test("a method that is no sink stands, however it is named", () => {
  expect(noCredentialInScriptText(standing("held.compute(`x = ${password}`)\n"))).toEqual([])
})

test("a bare call with no property before it is no sink", () => {
  expect(noCredentialInScriptText(standing("evaluate(`x = ${password}`)\n"))).toEqual([])
})

test("the line named is the line the call stands on", () => {
  const said = noCredentialInScriptText(standing("const one = 1\npage.evaluate(password)\n"))
  expect(said[0]?.line).toBe(2)
})

test("two leaking calls are refused once each", () => {
  const text = "page.evaluate(password)\nframe.waitForFunction(secret)\n"
  expect(noCredentialInScriptText(standing(text))).toHaveLength(2)
})

test("a credential is found however deep in the text it stands", () => {
  const source = standing("const one = [[{ held: passwd }]]\n").source
  expect(credentialNamedIn(source)).toBe("passwd")
})

test("a body naming no credential answers none", () => {
  expect(credentialNamedIn(standing("const one = held\n").source)).toBeNull()
})
