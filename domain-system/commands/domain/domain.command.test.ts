import { expect, test } from "bun:test"
import {
  AT_DOMAIN,
  DAG,
  DECLARATIONS,
  DESCENT,
  domainsIn,
  heldBy,
  kindsUnder,
  kindsUnderDomain,
  PATHS,
  readIn,
  type Standing,
  SUBJECT,
  treeLines,
  UP,
} from "./domain.command.code.ts"
import { domain as domainCommand } from "./domain.command.ts"

const ROOT = new URL("../../../", import.meta.url).pathname.replace(/\/$/, "")

function refusalsOf(argv: readonly string[]): readonly string[] {
  const read = readIn(argv)
  return "refused" in read ? read.refused : []
}

function wantedOf(argv: readonly string[]) {
  const read = readIn(argv)
  if ("refused" in read) throw new Error(`refused: ${read.refused.join("; ")}`)
  return read
}

test("the act is the first word", () => {
  expect(wantedOf([DAG]).act).toBe(DAG)
  expect(wantedOf([DECLARATIONS]).act).toBe(DECLARATIONS)
})

test("naming no act is refused, naming what it carries", () => {
  const refused = refusalsOf([])
  expect(refused.length).toBe(1)
  expect(refused[0]).toContain(DAG)
  expect(refused[0]).toContain(DECLARATIONS)
})

test("an act it does not carry is refused rather than answered as nothing", () => {
  expect(refusalsOf(["unreached"]).join(" ")).toContain("`unreached` is no act")
})

test("one call names one act", () => {
  expect(refusalsOf([DAG, DECLARATIONS]).join(" ")).toContain("one call names one act")
})

test("a flag an act does not take is refused against that act by name", () => {
  expect(refusalsOf([DECLARATIONS, PATHS]).join(" ")).toContain(
    `\`${PATHS}\` is taken by \`${DAG}\``
  )
  expect(refusalsOf([DECLARATIONS, DESCENT]).join(" ")).toContain(`\`${DESCENT}\` is taken by`)
  expect(refusalsOf([DAG, SUBJECT, "domains"]).join(" ")).toContain(
    `\`${SUBJECT}\` is taken by \`${DECLARATIONS}\``
  )
})

test("a flag it carries at all is refused when it is none of them", () => {
  expect(refusalsOf([DAG, "--nope"]).join(" ")).toContain("`--nope` is no flag this takes")
})

test("a flag wanting a word and given none is refused", () => {
  expect(refusalsOf([DAG, AT_DOMAIN]).join(" ")).toContain("nothing followed it")
  expect(refusalsOf([DAG, UP, PATHS]).join(" ")).toContain("nothing followed it")
})

test("--domain and --up are each repeatable", () => {
  const wanted = wantedOf([DAG, AT_DOMAIN, "one", AT_DOMAIN, "two", UP, "three"])
  expect(wanted.rooted).toEqual(["one", "two"])
  expect(wanted.above).toEqual(["three"])
})

test("a subject that is neither domains nor personas is refused", () => {
  expect(refusalsOf([DECLARATIONS, SUBJECT, "widgets"]).join(" ")).toContain(
    "`widgets` is no subject"
  )
})

test("a domain page carries its parts as the domains it holds", () => {
  const domains = domainsIn(ROOT, false)
  expect(domains.size).toBeGreaterThan(0)
  const email = domains.get("email")
  expect(email?.path.endsWith("email.domain.ts")).toBe(true)
  expect(email?.parts).toContain("email-action")
})

test("a domain never names itself as one of its own parts", () => {
  for (const one of domainsIn(ROOT, false).values()) expect(one.parts).not.toContain(one.slug)
})

test("the holders of a part are the domains naming it", () => {
  const domains = domainsIn(ROOT, false)
  expect(heldBy(domains).get("email-action")).toContain("email")
})

test("`domain` itself is under `domain`, and `module` and `command` are too", () => {
  const kinds = kindsUnderDomain(ROOT)
  expect(kinds.has("domain")).toBe(true)
  expect(kinds.has("module")).toBe(true)
  expect(kinds.has("command")).toBe(true)
  expect(kinds.has("page")).toBe(false)
})

test("the descent reading holds strictly more than the domain pages alone", () => {
  expect(domainsIn(ROOT, true).size).toBeGreaterThan(domainsIn(ROOT, false).size)
})

test("the page says it writes nothing and takes both acts", () => {
  expect(domainCommand.changeKindSlug).toBe("change-none")
  const said = domainCommand.taking.map((one) => one.said)
  expect(said).toContain(DAG)
  expect(said).toContain(DECLARATIONS)
})

function typesOf(
  said: Readonly<Record<string, string | readonly string[] | null>>
): ReadonlyMap<string, Record<string, unknown>> {
  return new Map(Object.entries(said).map(([slug, above]) => [slug, { slug, extendsSlug: above }]))
}

function standingOf(
  said: Readonly<Record<string, readonly string[]>>
): ReadonlyMap<string, Standing> {
  return new Map(
    Object.entries(said).map(([slug, parts]) => [slug, { slug, path: `${slug}.domain.ts`, parts }])
  )
}

test("a page type naming one type above it is a kind of domain as it always was", () => {
  const kinds = kindsUnder(
    typesOf({
      domain: null,
      page: null,
      module: "page-type/domain",
      command: "page-type/module",
      property: "page-type/page",
    })
  )

  expect([...kinds].sort()).toEqual(["command", "domain", "module"])
})

test("a page type naming two types above it is a kind of domain where either of them is", () => {
  const kinds = kindsUnder(
    typesOf({
      domain: null,
      page: null,
      module: "page-type/domain",
      held: ["page-type/page", "page-type/module"],
      beside: ["page-type/module", "page-type/page"],
    })
  )

  expect([...kinds].sort()).toEqual(["beside", "domain", "held", "module"])
})

test("a page type naming two types above it, neither of them under domain, is left out", () => {
  const kinds = kindsUnder(
    typesOf({
      domain: null,
      page: null,
      property: "page-type/page",
      held: ["page-type/page", "page-type/property"],
    })
  )

  expect([...kinds].sort()).toEqual(["domain"])
})

test("a type below one reached through a list is a kind of domain too", () => {
  const kinds = kindsUnder(
    typesOf({
      domain: null,
      page: null,
      held: ["page-type/page", "page-type/domain"],
      under: "page-type/held",
      deeper: ["page-type/under"],
    })
  )

  expect([...kinds].sort()).toEqual(["deeper", "domain", "held", "under"])
})

test("a ring among the types above is answered rather than walked forever", () => {
  const kinds = kindsUnder(
    typesOf({ domain: null, one: ["page-type/two"], two: ["page-type/one"] })
  )

  expect([...kinds].sort()).toEqual(["domain"])
})

test("a domain held by two domains is drawn under each of them", () => {
  const domains = standingOf({ one: ["held"], two: ["held"], held: ["under"], under: [] })

  expect(treeLines(["one", "two"], domains, false)).toEqual([
    "one",
    "  held",
    "    under",
    "two",
    "  held",
    "    under",
  ])
})

test("a domain drawn a second time beside the first is no domain already open", () => {
  const domains = standingOf({ root: ["one", "two"], one: ["held"], two: ["held"], held: [] })

  expect(treeLines(["root"], domains, false)).toEqual([
    "root",
    "  one",
    "    held",
    "  two",
    "    held",
  ])
})

test("a domain open above the point being drawn is marked rather than drawn again", () => {
  const domains = standingOf({ root: ["held"], held: ["beside"], beside: ["held"] })

  expect(treeLines(["root"], domains, false)).toEqual([
    "root",
    "  held",
    "    beside",
    "      held  — already open above here",
  ])
})
