import { expect, test } from "bun:test"
import { argument } from "akasha/command/argument/argument.page-type.ts"
import { descent } from "akasha/command/argument/pages/descent.argument.ts"
import { paths } from "akasha/command/argument/pages/paths.argument.ts"
import { rootDomain } from "akasha/command/argument/pages/root-domain.argument.ts"
import { up } from "akasha/command/argument/pages/up.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { domainDag as drawing } from "akasha/command/pages/domain/dag/domain-dag.command.code.ts"
import { domainDag } from "akasha/command/pages/domain/dag/domain-dag.command.ts"

const NOWHERE = "/nowhere"

const PATHS_AT = `${argument.slug}/${paths.slug}` as const

const DESCENT_AT = `${argument.slug}/${descent.slug}` as const

const ROOT_DOMAIN_AT = `${argument.slug}/${rootDomain.slug}` as const

const UP_AT = `${argument.slug}/${up.slug}` as const

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
    [PATHS_AT]: paths.said,
    [DESCENT_AT]: descent.said,
    [ROOT_DOMAIN_AT]: rootDomain.said,
    [UP_AT]: up.said,
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
    const twice = one.argument === ROOT_DOMAIN_AT || one.argument === UP_AT

    expect(repeats).toBe(twice)
  }
})
