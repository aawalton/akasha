import { afterAll, test as check, expect } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "../../calling/calling.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import type { Ruled } from "./lint-exception.command.code.ts"
import {
  agreeing,
  arrayEnd,
  besideGlob,
  CONFIG,
  globsIn,
  includesAt,
  lintException,
  objectIn,
  overrideMade,
  ruleIn,
  textsIn,
  turningOff,
  working,
} from "./lint-exception.command.code.ts"

const APPROXIMATE: Ruled = { group: "suspicious", name: "noApproximativeNumericConstant" }

const OFF_HERE =
  '"linter": { "rules": { "suspicious": { "noApproximativeNumericConstant": "off" } } }'

const CONST_OFF = '"linter": { "rules": { "style": { "useConst": "off" } } }'

const CONFIG_TEXT =
  '{\n  "overrides": [\n' +
  `    { "includes": ["one/*"], ${CONST_OFF} },\n` +
  `    {\n      "includes": [\n        "two/**/data/**"\n      ],\n      ${OFF_HERE}\n    }\n` +
  "  ]\n}\n"

const BARE_CONFIG = '{\n  "linter": { "enabled": true },\n  "overrides": []\n}\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function parsed(text: string): Record<string, unknown> {
  const held = objectIn(JSON.parse(text))
  if (held === null) throw new Error("the fixture is no object")
  return held
}

function repo(folders: readonly string[], body: string): string {
  const root = realpathSync(scratch.rootFor("akasha-lint-exception-"))
  writeFileSync(join(root, CONFIG), body)
  for (const one of folders) mkdirSync(join(root, one), { recursive: true })
  return root
}

function given(root: string): Given {
  return { root, calledAs: "akasha lint-exception", from: root, writer: null, agentId: null }
}

check("a rule is read as the group it is in and the name it carries", () => {
  expect(ruleIn("suspicious/noApproximativeNumericConstant")).toEqual(APPROXIMATE)
  for (const one of ["", "suspicious", "suspicious/", "/name", "a/b/c"]) {
    expect(ruleIn(one)).toBeNull()
  }
})

check(
  "a value that is no plain object and a list that is no list of text answer as nothing",
  () => {
    expect(objectIn({ a: 1 })).toEqual({ a: 1 })
    for (const one of [null, [1], "said", 3]) expect(objectIn(one)).toBeNull()
    expect(textsIn(["a", "b"])).toEqual(["a", "b"])
    for (const one of [["a", 1], "a", null]) expect(textsIn(one)).toBeNull()
  }
)

check("the override turning the rule off is the one found, and the others are not", () => {
  const config = parsed(CONFIG_TEXT)
  expect(turningOff(config, APPROXIMATE)).toEqual([1])
  expect(turningOff(config, { group: "style", name: "useConst" })).toEqual([0])
  expect(turningOff(config, { group: "style", name: "useTemplate" })).toEqual([])
  expect(includesAt(config, 1)).toEqual(["two/**/data/**"])
})

check("the end of an array is found past the strings and the objects it holds", () => {
  const text = '{ "overrides": [ { "includes": ["]", "[{"] } ], "css": {} }'
  const at = arrayEnd(text, "overrides")
  expect(text[at]).toBe("]")
  expect(text.slice(at)).toBe('], "css": {} }')
  expect(arrayEnd(text, "nothing")).toBe(-1)
})

check("a glob joins the passage naming the glob already there, and nothing else moves", () => {
  const put = besideGlob(CONFIG_TEXT, "two/**/data/**", "three/**")
  if ("refusal" in put) throw new Error(put.refusal)
  expect(put.text).toContain('"two/**/data/**", "three/**"')
  expect(put.text.replace('"two/**/data/**", "three/**"', '"two/**/data/**"')).toBe(CONFIG_TEXT)
})

check("a passage nowhere in the text, and one there twice, are each refused", () => {
  expect(besideGlob(CONFIG_TEXT, "nowhere/**", "three/**")).toHaveProperty("refusal")
  const twice = `${CONFIG_TEXT}${CONFIG_TEXT}`
  expect(besideGlob(twice, "two/**/data/**", "three/**")).toHaveProperty("refusal")
})

check("a rule no override turns off is given an override of its own", () => {
  const put = overrideMade(BARE_CONFIG, APPROXIMATE, "three/**")
  if ("refusal" in put) throw new Error(put.refusal)
  const config = parsed(put.text)
  expect(turningOff(config, APPROXIMATE)).toEqual([0])
  expect(includesAt(config, 0)).toEqual(["three/**"])
  expect(overrideMade('{ "linter": {} }', APPROXIMATE, "three/**")).toHaveProperty("refusal")
})

check("a body that does not carry the exception asked for is refused rather than landed", () => {
  const put = besideGlob(CONFIG_TEXT, "two/**/data/**", "three/**")
  if ("refusal" in put) throw new Error(put.refusal)
  expect(agreeing(put.text, APPROXIMATE, ["three/**"])).toBeNull()
  expect(agreeing(put.text, APPROXIMATE, ["four/**"])).toContain("carries none of")
  expect(agreeing(CONFIG_TEXT, APPROXIMATE, ["three/**"])).toContain("carries none of")
  expect(agreeing("{ not json", APPROXIMATE, [])).toContain("does not parse as json")
  expect(agreeing("[]", APPROXIMATE, [])).toContain("is no object")
  expect(agreeing(BARE_CONFIG, APPROXIMATE, [])).toContain("0 overrides")
})

check("a package that is not there is refused, and a folder that is there is taken", () => {
  const root = repo(["three"], CONFIG_TEXT)
  writeFileSync(join(root, "four.ts"), "")
  const said = globsIn(root, ["three", "nowhere", "four.ts", null, "../elsewhere", "three"])
  expect(said.globs).toEqual(["three/**"])
  expect(said.refusals[0]).toContain("names nothing that is there")
  expect(said.refusals[1]).toContain("is a file")
  expect(said.refusals[2]).toContain("takes a path, and none follows it")
  expect(said.refusals[3]).toContain("is outside this repository")
  expect(said.refusals[4]).toContain("named more than once")
})

check("a glob the override already carries is answered as carried rather than added", () => {
  const worked = working(CONFIG_TEXT, parsed(CONFIG_TEXT), APPROXIMATE, ["two/**/data/**"])
  if ("refusals" in worked) throw new Error(worked.refusals.join("; "))
  expect(worked.added).toEqual([])
  expect(worked.carried).toEqual(["two/**/data/**"])
  expect(worked.text).toBe(CONFIG_TEXT)
})

check("several packages join one override, each after the one before it", () => {
  const worked = working(CONFIG_TEXT, parsed(CONFIG_TEXT), APPROXIMATE, ["a/**", "b/**"])
  if ("refusals" in worked) throw new Error(worked.refusals.join("; "))
  expect(worked.added).toEqual(["a/**", "b/**"])
  expect(includesAt(parsed(worked.text), 1)).toEqual(["two/**/data/**", "a/**", "b/**"])
})

check("more than one override turning the rule off is refused rather than chosen between", () => {
  const doubled = CONFIG_TEXT.replace(CONST_OFF, OFF_HERE)
  expect(turningOff(parsed(doubled), APPROXIMATE)).toEqual([0, 1])
  expect(working(doubled, parsed(doubled), APPROXIMATE, ["a/**"])).toHaveProperty("refusals")
})

check("an exception naming a package that is not there refuses and writes nothing", () => {
  const root = repo(["three"], CONFIG_TEXT)
  const said = lintException(
    ["--rule", "suspicious/noApproximativeNumericConstant", "--package-path", "nowhere"],
    given(root)
  )
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain("names nothing that is there")
})

check("a call naming no package, no rule, or a rule that is no rule is refused", () => {
  const root = repo(["three"], CONFIG_TEXT)
  expect(lintException(["--rule", "suspicious/x"], given(root)).refusals[0]).toContain(
    "names no --package-path"
  )
  expect(lintException(["--package-path", "three"], given(root)).refusals[0]).toContain(
    "is given 0 times"
  )
  expect(
    lintException(["--rule", "suspicious", "--package-path", "three"], given(root)).refusals[0]
  ).toContain("names no rule")
  expect(lintException(["--write"], given(root)).refusals[0]).toContain("`--write` is no flag")
})

check("a config that does not parse is refused rather than rewritten", () => {
  const root = repo(["three"], "{ not json")
  const said = lintException(
    ["--rule", "suspicious/noApproximativeNumericConstant", "--package-path", "three"],
    given(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("does not parse as json")
})
