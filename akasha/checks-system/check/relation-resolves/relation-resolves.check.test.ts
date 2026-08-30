import { afterAll, expect, test } from "bun:test"
import {
  knownIn,
  type Shaped,
} from "../../../pages-system/indexes/reaching/reaching.module.code.ts"
import {
  type Shadow,
  shadowAt,
  shadowFor,
} from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Judged, Change } from "../../judging/judging.module.code.ts"
import {
  danglingIn,
  mortalityIn,
  namersOf,
  pageTypeOf,
  relationProperties,
  relationResolves,
} from "./relation-resolves.check.code.ts"
import {
  A,
  A_ID,
  D,
  D_ID,
  E,
  E_ID,
  NOWHERE_ID,
  naming,
  note,
  OTHER,
  OTHER_ID,
  over,
  rooted,
  S,
  S_ID,
  scratch,
  spark,
  standing,
  stating,
  T,
  T_ID,
} from "./relation-resolves.check.test-fixtures.ts"

afterAll(scratch.sweep)

function knowing(shadow: Shadow, root: string): Shaped {
  return knownIn(shadow.reading, root, shadow.pageOf)
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return relationResolves(change, cast.shadow)
}

test("a page naming a page the index already carries is let through", () => {
  const root = rooted()
  expect(judged(over(root, [A], note(', domainSlug: "domain/d"')))).toEqual([])
})

test("a page naming a slug that reaches nothing is refused, and the refusal names the property", () => {
  const root = rooted()
  expect(judged(over(root, [A], note(', domainSlug: "domain/gone"')))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `gone`" },
  ])
})

test("a bare name is looked for under every page type admitting the target", () => {
  const root = rooted()
  expect(judged(over(root, [A], note(', domainSlug: "d"')))).toEqual([])
  expect(judged(over(root, [A], note(', domainSlug: "nope"')))).toEqual([
    {
      path: A,
      reason: "states `domain-slug`, and no page admitting `domain` carries the slug `nope`",
    },
  ])
})

test("an id reaching no page is refused, and an id reaching one is let through", () => {
  const root = rooted()
  expect(judged(over(root, [A], note(`, domainSlug: "${D_ID}"`)))).toEqual([])
  expect(judged(over(root, [A], note(`, domainSlug: "${NOWHERE_ID}"`)))).toEqual([
    { path: A, reason: `states \`domain-slug\`, and no page carries the id \`${NOWHERE_ID}\`` },
  ])
})

test("an id reaches a page the change carries, and reaches nothing it takes away", () => {
  const root = rooted()
  const both = { ...note(`, domainSlug: "${E_ID}"`), [E]: stating(E_ID, "e", "domain") }
  expect(judged(over(root, [A, E], both))).toEqual([])
  const taken = { ...note(`, domainSlug: "${D_ID}"`), [D]: null }
  expect(judged(over(root, [A, D], taken))).toEqual([
    { path: A, reason: `states \`domain-slug\`, and no page carries the id \`${D_ID}\`` },
  ])
})

test("the page type a page states is a relation like any other", () => {
  const root = rooted()
  const bodies = { [A]: stating(A_ID, "a", "typo") }
  expect(judged(over(root, [A], bodies))).toEqual([
    {
      path: A,
      reason: "states `page-type-slug`, and no page admitting `page-type` carries the slug `typo`",
    },
  ])
})

test("every name a property carries many of is judged, not only the first", () => {
  const root = rooted()
  const said = judged(over(root, [A], note(', partSlugs: ["domain/d", "domain/gone"]')))
  expect(said).toEqual([
    { path: A, reason: "states `part-slugs`, and no `domain` carries the slug `gone`" },
  ])
})

test("a property the schema does not call a relation is never resolved", () => {
  const root = rooted()
  expect(judged(over(root, [A], note(', definition: "domain/gone"')))).toEqual([])
})

test("a page and the page it names land together when the change carries both", () => {
  const root = rooted()
  const bodies = {
    ...note(', domainSlug: "domain/e"'),
    [E]: stating(E_ID, "e", "domain"),
  }
  expect(judged(over(root, [A, E], bodies))).toEqual([])
  expect(judged(over(root, [A], note(', domainSlug: "domain/e"')))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `e`" },
  ])
})

test("a change taking away a page refuses the page still naming it, though the change never names it", () => {
  const root = rooted()
  naming(root, D_ID, "domain-slug", A_ID, A)
  standing(root, A, A_ID, "note", "a")
  const bodies = { ...note(', domainSlug: "domain/d"'), [D]: null }
  expect(judged(over(root, [D], bodies))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `d`" },
  ])
})

test("a change taking away the page and the page naming it together is silent", () => {
  const root = rooted()
  naming(root, D_ID, "domain-slug", A_ID, A)
  standing(root, A, A_ID, "note", "a")
  expect(judged(over(root, [D, A], { [A]: null, [D]: null }))).toEqual([])
})

test("a change taking away a page nothing names is silent", () => {
  const root = rooted()
  standing(root, OTHER, OTHER_ID, "domain", "other")
  expect(judged(over(root, [OTHER], { [OTHER]: null }))).toEqual([])
})

test("a name narrowing to more than one page is refused, not taken as reached", () => {
  const root = rooted()
  standing(root, OTHER, OTHER_ID, "domain", "d")
  expect(judged(over(root, [A], note(', domainSlug: "domain/d"')))).toEqual([
    {
      path: A,
      reason: `states \`domain-slug\`, and \`domain/d\` narrows to 2 pages and must name its page type — ${D}, ${OTHER}`,
    },
  ])
})

test("a change rewriting a page's slug takes the old slug away with it", () => {
  const root = rooted()
  const bodies = {
    ...note(', domainSlug: "domain/d"'),
    [D]: stating(D_ID, "renamed", "domain"),
  }
  expect(judged(over(root, [A, D], bodies))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `d`" },
  ])
})

test("a change naming no page and taking nothing away asks the index nothing", () => {
  const root = rooted()
  expect(judged(over(root, ["akasha/t/loose.txt"], { "akasha/t/loose.txt": "held" }))).toEqual([])
})

test("which properties are relations is read from the schema in the index", () => {
  const root = rooted()
  const shadow = shadowAt(root)
  expect(relationProperties(shadow, knowing(shadow, root))).toEqual([
    "domain-slug",
    "page-type-slug",
    "part-slugs",
    "spark-slug",
  ])
})

test("the pages to judge for a page taken away are the ones the reverse edges name", () => {
  const root = rooted()
  naming(root, D_ID, "domain-slug", A_ID, A)
  standing(root, A, A_ID, "note", "a")
  const change = over(root, [D], { [D]: null })
  expect(namersOf(change, ["domain-slug", "part-slugs"])).toEqual([A])
  expect(namersOf(over(root, [D], { [D]: "held" }), ["domain-slug"])).toEqual([])
})

test("a refusal is laid on the page that names, and one is raised for each name", () => {
  const root = rooted()
  const shadow = shadowAt(root)
  const known = knowing(shadow, root)
  const value = { pageTypeSlug: "note", partSlugs: ["gone", "away"] }
  expect(danglingIn(A, value, known, mortalityIn(shadow, known)).map((one) => one.reason)).toEqual([
    "states `part-slugs`, and no page admitting `domain` carries the slug `gone`",
    "states `part-slugs`, and no page admitting `domain` carries the slug `away`",
  ])
})

test("a relation nested in a record is judged, and the refusal names the record and the field", () => {
  const root = rooted()
  const shadow = shadowAt(root)
  const known = knowing(shadow, root)
  const value = { pageTypeSlug: "note", marks: [{ domainSlug: "domain/gone" }] }
  expect(danglingIn(A, value, known, mortalityIn(shadow, known)).map((one) => one.reason)).toEqual([
    "states `marks domain-slug`, and no `domain` carries the slug `gone`",
  ])
})

test("one name repeated across a record's entries is judged once", () => {
  const root = rooted()
  const shadow = shadowAt(root)
  const known = knowing(shadow, root)
  const value = {
    pageTypeSlug: "note",
    marks: [{ domainSlug: "domain/gone" }, { domainSlug: "domain/gone" }],
  }
  expect(danglingIn(A, value, known, mortalityIn(shadow, known)).map((one) => one.reason)).toEqual([
    "states `marks domain-slug`, and no `domain` carries the slug `gone`",
  ])
})

test("a field the record does not declare, and a record deeper than one, are left alone", () => {
  const root = rooted()
  const shadow = shadowAt(root)
  const known = knowing(shadow, root)
  const value = {
    pageTypeSlug: "note",
    marks: [{ partSlugs: ["gone"], deeper: [{ domainSlug: "domain/gone" }] }],
  }
  expect(danglingIn(A, value, known, mortalityIn(shadow, known))).toEqual([])
})

const NOT_MORTAL = "states `spark-slug`, and a page that is not mortal cannot name a mortal `spark`"

const REACHED_MORTAL =
  "states `domain-slug`, and a page that is not mortal cannot name a mortal `spark`"

test("a page that is not mortal naming a mortal page type is refused, reached or not", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  expect(judged(over(root, [A], note(', sparkSlug: "spark/s"')))).toEqual([
    { path: A, reason: NOT_MORTAL },
  ])
  expect(judged(over(root, [A], note(', sparkSlug: "spark/gone"')))).toEqual([
    { path: A, reason: NOT_MORTAL },
  ])
})

test("a mortal page naming a page that reaches nothing is silent", () => {
  const root = rooted()
  expect(judged(over(root, [S], spark(', domainSlug: "domain/gone"')))).toEqual([])
})

test("a mortal page naming a mortal page that reaches nothing is silent", () => {
  const root = rooted()
  expect(judged(over(root, [S], spark(', sparkSlug: "spark/gone"')))).toEqual([])
})

test("a change taking a mortal page away is silent though a page still names it", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  naming(root, S_ID, "spark-slug", T_ID, T)
  standing(root, T, T_ID, "spark", "t")
  const bodies = { [T]: stating(T_ID, "t", "spark", ', sparkSlug: "spark/s"'), [S]: null }
  expect(judged(over(root, [S], bodies))).toEqual([])
})

function reaching(root: string, stated: string): readonly Judged[] {
  return judged(over(root, [A], note(stated)))
}

const REFUSING = [{ path: A, reason: REACHED_MORTAL }]

test("a target that is not mortal is refused for the mortal page the name reaches", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  expect(reaching(root, ', domainSlug: "spark/s"')).toEqual(REFUSING)
  expect(reaching(root, ', domainSlug: "s"')).toEqual(REFUSING)
  expect(reaching(root, `, domainSlug: "${S_ID}"`)).toEqual(REFUSING)
  expect(reaching(root, ', domainSlug: "domain/d"')).toEqual([])
})

test("a mortal page the change itself carries is read for its page type too", () => {
  const root = rooted()
  const bodies = { ...note(', domainSlug: "spark/s"'), [S]: stating(S_ID, "s", "spark") }
  expect(judged(over(root, [A, S], bodies))).toEqual(REFUSING)
})

test("every name a property carries many of reaching a mortal page is refused, one refusal each", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  standing(root, T, T_ID, "spark", "t")
  const said = reaching(root, ', partSlugs: ["spark/s", "spark/t"]')
  const one = "states `part-slugs`, and a page that is not mortal cannot name a mortal `spark`"
  expect(said).toEqual([
    { path: A, reason: one },
    { path: A, reason: one },
  ])
})

test("a mortal page reaching a mortal page through a target that is not is silent", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  const bodies = { [T]: stating(T_ID, "t", "spark", ', domainSlug: "spark/s"') }
  expect(judged(over(root, [T], bodies))).toEqual([])
})

test("a name reaching nothing under a target that is not mortal is a plain dangle", () => {
  const root = rooted()
  expect(reaching(root, ', domainSlug: "spark/gone"')).toEqual([
    { path: A, reason: "states `domain-slug`, and no `spark` carries the slug `gone`" },
  ])
})

test("the page type of a reached page is read from its path, not from a page load", () => {
  expect(pageTypeOf("akasha/t/s.spark.ts")).toBe("spark")
  expect(pageTypeOf("akasha/t/held.ts")).toBe(null)
})

test("the check reads the index under the root it was given, and no other", () => {
  const named = rooted()
  const bare = rooted(false)
  const bodies = note(', domainSlug: "domain/d"')
  expect(judged(over(named, [A], bodies))).toEqual([])
  expect(judged(over(bare, [A], bodies))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `d`" },
  ])
})

const P = "akasha/t/probe.page-type.ts"

const P_ID = "01a04d99-71ca-7e06-8000-00000000000b"

const X = "akasha/t/x.probe.ts"

const X_ID = "01a04d99-71ca-7e06-8000-00000000000c"

const R = "akasha/t/held.relation-property.ts"

const R_ID = "01a04d99-71ca-7e06-8000-00000000000d"

test("a page type the change introduces admits a page named through it", () => {
  const root = rooted()
  const bodies = {
    [P]: stating(P_ID, "probe", "page-type", ', extendsSlug: "page-type/domain"'),
    [X]: stating(X_ID, "x", "probe"),
    [A]: stating(A_ID, "a", "note", ', domainSlug: "probe/x"'),
  }
  expect(judged(over(root, [P, X, A], bodies))).toEqual([])
})

test("a relation property the change introduces is judged rather than passed over", () => {
  const root = rooted()
  const bodies = {
    [R]: stating(R_ID, "held", "relation-property", ', targetPageTypeSlug: "page-type/domain"'),
    [A]: stating(A_ID, "a", "note", ', held: "domain/gone"'),
  }
  expect(judged(over(root, [R, A], bodies))).toEqual([
    { path: A, reason: "states `held`, and no `domain` carries the slug `gone`" },
  ])
})
