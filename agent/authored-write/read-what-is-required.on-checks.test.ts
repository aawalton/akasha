import { expect, mock, test } from "bun:test"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import type { AddressIndex } from "../../page/required-reading/address-index/address-index.ts"
import type { PageAt } from "../../page/page.ts"

const ROOT = "/fixture"

const REPO = "akasha"

const SEAT_PAGE = `${ROOT}/agent/seat/one.seat.md`

const SILENT_SEAT_PAGE = `${ROOT}/agent/seat/two.seat.md`

const UNREADABLE_SEAT_PAGE = `${ROOT}/agent/seat/three.seat.md`

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
  if (writer === "seat-3") return UNREADABLE_SEAT_PAGE
  if (writer === "seat-1--kid") return SUBAGENT_PAGE
  if (writer === "gone--kid") return ORPHAN_PAGE
  return null
}

const record = await import("../read-record.ts")
const { sameBody } = record

mock.module("../read-record.ts", () => ({
  sameBody,
  agentPageFor: pageFor,
  readRecordFor: (writer: string) => {
    const page = pageFor(writer)
    if (page === null) return null
    return { page, at: `${page}.readings`, reading: () => null, paths: () => [] }
  },
}))

mock.module("../../page/required-reading/warrant/warrant.ts", () => ({
  standingHere: () => ({
    index,
    naming: [],
    rootOf: (repo: string) => (repo === REPO ? ROOT : undefined),
  }),
}))

const { unreadForSeatWith } = await import("./read-what-is-required.ts")

const unreadForSeat = unreadForSeatWith(
  (root, relPath) => bodies.get(`${root}/${relPath}`) ?? null,
  new Map([
    ["persona-slug", "default-persona"],
    ["role-slug", "default-role"],
  ])
)

function named(said: readonly string[]): readonly string[] {
  return [...said.map((one) => one.split("`")[1] ?? "")].sort()
}

test("a seat is judged on what its own page declares", () => {
  expect(named(unreadForSeat("seat-1"))).toEqual([
    "pages/domain/seat-domain.domain.md",
    "pages/domain/under-seat-domain.domain.md",
    "pages/persona/seat-persona.persona.md",
    "pages/role/seat-role.role.md",
  ])
})

test("a seat leaving an attribute unsaid is judged on the default that stands for it", () => {
  expect(named(unreadForSeat("seat-2"))).toEqual([
    "pages/domain/seat-domain.domain.md",
    "pages/domain/under-seat-domain.domain.md",
    "pages/persona/default-persona.persona.md",
    "pages/role/default-role.role.md",
  ])
})

test("a default never stands over an attribute the seat states for itself", () => {
  const said = named(unreadForSeat("seat-1"))
  expect(said).not.toContain("pages/persona/default-persona.persona.md")
  expect(said).not.toContain("pages/role/default-role.role.md")
})

test("a subagent is judged on its seat's domain, the default persona and the default role", () => {
  expect(named(unreadForSeat("seat-1--kid"))).toEqual([
    "pages/domain/seat-domain.domain.md",
    "pages/domain/under-seat-domain.domain.md",
    "pages/persona/default-persona.persona.md",
    "pages/role/default-role.role.md",
  ])
})

test("a subagent is judged on nothing its own page declares", () => {
  const said = named(unreadForSeat("seat-1--kid"))
  expect(said).not.toContain("pages/persona/seat-persona.persona.md")
  expect(said).not.toContain("pages/role/seat-role.role.md")
})

test("a subagent owes what its seat owes for the seat's domain", () => {
  const seat = named(unreadForSeat("seat-1")).filter((one) => one.startsWith("pages/domain/"))
  const kid = named(unreadForSeat("seat-1--kid")).filter((one) => one.startsWith("pages/domain/"))
  expect(kid).toEqual(seat)
})

test("a seat silent on its attributes owes exactly what its subagent owes", () => {
  expect(named(unreadForSeat("seat-2"))).toEqual(named(unreadForSeat("seat-1--kid")))
})

test("the refusal names the seat's page, for a seat and for its subagent alike", () => {
  for (const writer of ["seat-1", "seat-1--kid"]) {
    for (const line of unreadForSeat(writer)) expect(line.startsWith(`${SEAT_PAGE} — `)).toBe(true)
  }
})

test("a writer with no page at all is refused once", () => {
  const said = unreadForSeat("nobody")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("nobody")
})

test("a subagent whose seat has no page is refused, and the refusal names the seat", () => {
  const said = unreadForSeat("gone--kid")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`gone`")
})

test("a write nothing identifies the writer of is refused", () => {
  expect(unreadForSeat(null)).toHaveLength(1)
})

test("a seat page that will not read refuses the write rather than owing nothing", () => {
  const said = unreadForSeat("seat-3")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(UNREADABLE_SEAT_PAGE)
  expect(said[0]).toContain("COULD NOT BE READ")
})
