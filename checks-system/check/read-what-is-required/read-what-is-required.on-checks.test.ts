import { expect, mock, test } from "bun:test"
import { parseFrontmatter } from "../../../page/frontmatter.ts"
import type { AddressIndex } from "../../../page/required-reading/address-index/address-index.ts"
import type { PageAt } from "../../../page/page.ts"
import type { Act, Batch, CheckFailure, Tree } from "../check-shape.ts"

const ROOT = "/fixture"

const REPO = "akasha"

const SEAT_PAGE = `${ROOT}/agent/seat/one.seat.md`

const SILENT_SEAT_PAGE = `${ROOT}/agent/seat/two.seat.md`

const SUBAGENT_PAGE = `${ROOT}/agent/subagent/one--kid.subagent.md`

const ORPHAN_PAGE = `${ROOT}/agent/subagent/gone--kid.subagent.md`

const bodies = new Map<string, string>()

const addressed = new Map<string, PageAt>()

function fileAt(absolute: string, body: string): void {
  bodies.set(absolute, body)
}

function pageAt(type: string, slug: string, front: string): void {
  const key = `pages/${type}/${slug}.${type}.md`
  fileAt(`${ROOT}/${key}`, `---\npage-type-slug: ${type}\nslug: ${slug}\n${front}---\n`)
  addressed.set(`${type}/${slug}`, { repo: REPO, key, stem: slug, type })
}

fileAt(
  SEAT_PAGE,
  "---\npage-type-slug: seat\nid: seat-1\npersona-slug: seat-persona\n" +
    "domain-slug: domain/seat-domain\nrole-slug: seat-role\n---\n"
)
fileAt(
  SILENT_SEAT_PAGE,
  "---\npage-type-slug: seat\nid: seat-2\ndomain-slug: domain/seat-domain\n---\n"
)
fileAt(SUBAGENT_PAGE, "---\npage-type-slug: subagent\nsubagent-id: kid\n---\n")
fileAt(ORPHAN_PAGE, "---\npage-type-slug: subagent\nsubagent-id: kid\n---\n")

pageAt("domain", "seat-domain", "required-reading-slugs:\n  - domain/under-seat-domain\n")
pageAt("domain", "under-seat-domain", "")
pageAt("persona", "seat-persona", "")
pageAt("persona", "default-persona", "")
pageAt("role", "seat-role", "")
pageAt("role", "default-role", "")

const index: AddressIndex = {
  frontmatterOf: (at) => {
    const body = bodies.get(`${ROOT}/${at.key}`)
    return body === undefined ? null : parseFrontmatter(body)
  },
  domainAt: (address) => addressed.get(address) ?? null,
  pageTypeNamed: () => null,
  pageNamed: () => null,
  pagesFrom: () => [],
}

function pageFor(writer: string): string | null {
  if (writer === "seat-1") return SEAT_PAGE
  if (writer === "seat-2") return SILENT_SEAT_PAGE
  if (writer === "seat-1--kid") return SUBAGENT_PAGE
  if (writer === "gone--kid") return ORPHAN_PAGE
  return null
}

const record = await import("../../../agent/read-record.ts")
const { sameBody } = record

mock.module("../../../agent/read-record.ts", () => ({
  sameBody,
  agentPageFor: pageFor,
  readRecordFor: (writer: string) => {
    const page = pageFor(writer)
    if (page === null) return null
    return { page, at: `${page}.readings`, reading: () => null, paths: () => [] }
  },
}))

mock.module("../../../agent/required-reading/seat-defaults.ts", () => ({
  seatDefaults: () =>
    new Map([
      ["persona-slug", "default-persona"],
      ["role-slug", "default-role"],
    ]),
}))

mock.module("../../../page/required-reading/warrant/warrant.ts", () => ({
  standingHere: () => ({
    index,
    naming: [],
    rootOf: (repo: string) => (repo === REPO ? ROOT : undefined),
  }),
}))

const { readWhatIsRequiredWith } = await import("./read-what-is-required.check.code.attachment.ts")

/**
 * The fixture files stand in a map, and the check is handed the reader that reaches them.
 *
 * NOT `mock.module` ON `page/text/text.ts`. That call is process-global and mutates the namespace
 * object in place, and `mock.restore()` leaves the replacement standing, so mocking that module here
 * left every other test file in the same run reading its fixtures through this stub and finding
 * nothing. Handing the reader to the check keeps the substitution inside this file.
 */
const readWhatIsRequired = readWhatIsRequiredWith(
  (root, relPath) => bodies.get(`${root}/${relPath}`) ?? null
)

const tree: Tree = {
  root: ROOT,
  at: () => null,
  paths: () => [],
  gone: () => [],
  goneElsewhere: () => [],
  repointedElsewhere: () => new Map(),
  dir: () => ROOT,
}

const batch: Batch = { root: ROOT, paths: [`${ROOT}/one.ts`], tree, keep: () => ROOT }

function verdict(writer: string | null): readonly CheckFailure[] {
  const check = readWhatIsRequired
  if (check.needs !== "tree") throw new Error("this check is written to be handed a tree")
  if (check.needsAuthor !== true) throw new Error("this check is written to be handed its author")
  const act: Act = { writer, before: tree }
  return check.run(batch, act)
}

function named(failures: readonly CheckFailure[]): readonly string[] {
  return [...failures.map((one) => one.reason.split("`")[1] ?? "")].sort()
}

test("a seat is judged on what its own page declares", () => {
  expect(named(verdict("seat-1"))).toEqual([
    "pages/domain/seat-domain.domain.md",
    "pages/domain/under-seat-domain.domain.md",
    "pages/persona/seat-persona.persona.md",
    "pages/role/seat-role.role.md",
  ])
})

test("a seat leaving an attribute unsaid is judged on the default that stands for it", () => {
  expect(named(verdict("seat-2"))).toEqual([
    "pages/domain/seat-domain.domain.md",
    "pages/domain/under-seat-domain.domain.md",
    "pages/persona/default-persona.persona.md",
    "pages/role/default-role.role.md",
  ])
})

test("a default never stands over an attribute the seat states for itself", () => {
  const said = named(verdict("seat-1"))
  expect(said).not.toContain("pages/persona/default-persona.persona.md")
  expect(said).not.toContain("pages/role/default-role.role.md")
})

test("a subagent is judged on its seat's domain, the default persona and the default role", () => {
  expect(named(verdict("seat-1--kid"))).toEqual([
    "pages/domain/seat-domain.domain.md",
    "pages/domain/under-seat-domain.domain.md",
    "pages/persona/default-persona.persona.md",
    "pages/role/default-role.role.md",
  ])
})

test("a subagent is judged on nothing its own page declares", () => {
  const said = named(verdict("seat-1--kid"))
  expect(said).not.toContain("pages/persona/seat-persona.persona.md")
  expect(said).not.toContain("pages/role/seat-role.role.md")
})

test("a subagent owes what its seat owes for the seat's domain", () => {
  const seat = named(verdict("seat-1")).filter((one) => one.startsWith("pages/domain/"))
  const kid = named(verdict("seat-1--kid")).filter((one) => one.startsWith("pages/domain/"))
  expect(kid).toEqual(seat)
})

test("a seat silent on its attributes owes exactly what its subagent owes", () => {
  expect(named(verdict("seat-2"))).toEqual(named(verdict("seat-1--kid")))
})

test("the refusal names the seat's page, for a seat and for its subagent alike", () => {
  expect([...new Set(verdict("seat-1").map((one) => one.path))]).toEqual([SEAT_PAGE])
  expect([...new Set(verdict("seat-1--kid").map((one) => one.path))]).toEqual([SEAT_PAGE])
})

test("a writer with no page at all is refused once", () => {
  const failures = verdict("nobody")
  expect(failures).toHaveLength(1)
  expect(failures[0]?.reason).toContain("nobody")
})

test("a subagent whose seat has no page is refused, and the refusal names the seat", () => {
  const failures = verdict("gone--kid")
  expect(failures).toHaveLength(1)
  expect(failures[0]?.reason).toContain("`gone`")
})

test("a write nothing identifies the writer of is refused", () => {
  expect(verdict(null)).toHaveLength(1)
})
