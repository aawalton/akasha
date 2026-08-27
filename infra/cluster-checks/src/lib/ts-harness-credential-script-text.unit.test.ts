import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanHarnessCredentialScriptText } from "./ts-harness-credential-script-text.ts"

const sfOf = (src: string, filePath = "x.ts"): ts.SourceFile =>
  ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const findingsOf = (src: string, filePath = "x.ts") =>
  scanHarnessCredentialScriptText(sfOf(src, filePath))

describe("scanHarnessCredentialScriptText — flagged: credential interpolated into script text", () => {
  test("waitForFunction string-form interpolating `password`", () => {
    const src = "await page.waitForFunction(`document.x === ${password}`)"
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.method).toBe("waitForFunction")
    expect(findings[0]?.identifier).toBe("password")
  })

  test("evaluate string-form interpolating `creds.password` (property access)", () => {
    const src = "await page.evaluate(`login(${creds.password})`)"
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.method).toBe("evaluate")
    expect(findings[0]?.identifier).toBe("password")
  })

  test("evaluate wrapping the secret in JSON.stringify still leaks it into script text", () => {
    const src = "await page.evaluate(`x(${JSON.stringify(env.BROWSER_TEST_REAL_USER_PASSWORD)})`)"
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.identifier).toBe("BROWSER_TEST_REAL_USER_PASSWORD")
  })

  test("evaluateHandle interpolating `secret`", () => {
    const src = "await frame.evaluateHandle(`auth(${secret})`)"
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.method).toBe("evaluateHandle")
  })

  test("string-concatenation (not a template) into evaluate is also flagged", () => {
    const src = 'await page.evaluate("login(\'" + password + "\')")'
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.method).toBe("evaluate")
  })

  test("1-indexed line/column at the call site; file passed through", () => {
    const src = ["const a = 1", "await page.waitForFunction(`z === ${password}`)"].join("\n")
    const findings = findingsOf(src, "shared/browser-test-harness/src/harness-launch.ts")
    expect(findings[0]?.file).toBe("shared/browser-test-harness/src/harness-launch.ts")
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBe(7)
  })

  test("multiple offending calls each emit a finding", () => {
    const src = [
      "await page.evaluate(`a(${password})`)",
      "await page.waitForFunction(`b(${secret})`)",
    ].join("\n")
    expect(findingsOf(src)).toHaveLength(2)
  })
})

describe("scanHarnessCredentialScriptText — allowed: structured channels & non-credential script text", () => {
  test("function-form waitForFunction with the password as a bound arg is safe", () => {
    const src =
      "await page.waitForFunction((a) => document.x === a.value, { sel, value: password })"
    expect(findingsOf(src)).toEqual([])
  })

  test("function-form evaluate with password as a bound arg is safe", () => {
    const src = "await page.evaluate((p) => document.title === p, password)"
    expect(findingsOf(src)).toEqual([])
  })

  test("string-form waitForFunction interpolating a page title (no credential) is allowed", () => {
    const src = "await page.waitForFunction(`document.title === ${JSON.stringify(titleToAwait)}`)"
    expect(findingsOf(src)).toEqual([])
  })

  test("`.fill(password)` is a structured protocol arg, not script text", () => {
    const src = 'await page.locator("input#password").fill(password)'
    expect(findingsOf(src)).toEqual([])
  })

  test("literal selector text mentioning password is not an interpolation", () => {
    const src = 'await page.evaluate(`document.querySelector("input#password").value`)'
    expect(findingsOf(src)).toEqual([])
  })

  test("evaluate with no interpolation is allowed", () => {
    const src = "await page.evaluate(`document.title`)"
    expect(findingsOf(src)).toEqual([])
  })

  test("a non-evaluate sink interpolating a credential is out of this scanner's scope", () => {
    const src = "logger.info(`pw=${password}`)"
    expect(findingsOf(src)).toEqual([])
  })

  test("comment text is not parsed as a call", () => {
    const src = "// page.evaluate(`${password}`) — documentation, not a call\nconst x = 1"
    expect(findingsOf(src)).toEqual([])
  })
})
