import { expect, test } from "bun:test"
import { descent } from "akasha/commands/arguments/pages/descent.argument.ts"
import { paths } from "akasha/commands/arguments/pages/paths.argument.ts"
import { rootDomain } from "akasha/commands/arguments/pages/root-domain.argument.ts"
import { up } from "akasha/commands/arguments/pages/up.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { domainDag as drawing } from "akasha/commands/pages/domain/dag/domain-dag.command.code.ts"
import { domainDag } from "akasha/commands/pages/domain/dag/domain-dag.command.ts"

const NOWHERE = "/nowhere"

function given(): Given {
  return {
    root: NOWHERE,
    calledAs: "akasha domain dag",
    from: NOWHERE,
    writer: null,
    agentId: null,
  }
}

function refusalsOf(argv: readonly string[]): string {
  return drawing(argv, given()).refusals.join(" ")
}

test("a flag it does not take is refused by name", () => {
  expect(refusalsOf(["--nope"])).toContain("`--nope` is no argument")
})

test("a word that is no flag at all is refused too", () => {
  expect(refusalsOf(["declarations"])).toContain("`declarations` is no argument")
})

test("a flag wanting a word and given none is refused", () => {
  expect(refusalsOf([rootDomain.said])).toContain("takes a value, and none follows it")
  expect(refusalsOf([up.said, paths.said])).toContain("takes a value, and none follows it")
})

test("the page names every flag this takes, in the order they are drawn", () => {
  const said: Readonly<Record<string, string>> = {
    "argument/paths": paths.said,
    "argument/descent": descent.said,
    "argument/root-domain": rootDomain.said,
    "argument/up": up.said,
  }

  expect(domainDag.arguments.map((one) => said[one.argument] ?? "")).toEqual([
    paths.said,
    descent.said,
    rootDomain.said,
    up.said,
  ])
})

test("`--domain` and `--up` each repeat and the bare flags do not", () => {
  for (const one of domainDag.arguments) {
    const repeats = "repeats" in one && one.repeats
    const twice = one.argument === "argument/root-domain" || one.argument === "argument/up"

    expect(repeats).toBe(twice)
  }
})
