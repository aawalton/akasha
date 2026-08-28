import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import { treeOn } from "../../run/tree.ts"
import type { Batch, CheckFailure } from "../check-shape.ts"
import relationResolves from "./relation-resolves.check.code.attachment.ts"

const GOING = "relation-resolves-going"

const KEPT = "relation-resolves-kept"

const ABSENT = "relation-resolves-absent"

const BROKEN = "relation-resolves-broken"

const SIBLING = "relation-resolves-sibling"

const GOING_AT = `agent/seat/${GOING}.seat.md`

const KEPT_AT = `agent/seat/${KEPT}.seat.md`

const BROKEN_AT = `agent/seat/${BROKEN}.seat.md`

const NAMER_AT = "agent/seat/relation-resolves-namer.seat.md"

const MADE_AT = "agent/seat/relation-resolves-made.seat.md"

const MOVED_AT = `agent/seat/moved/${GOING}.seat.md`

const SIBLING_AT = `agent/subagent/${SIBLING}.subagent.md`

const CREATOR = "creator-name"

const PRINCIPAL = "principal-seat-name"

function seat(...keys: readonly string[]): string {
  return `---\n${["page-type-slug: seat", ...keys].join("\n")}\n---\n`
}

const UNREADABLE = "---\npage-type-slug: seat\nthis line is neither a key nor a list item\n---\n"

const SUBAGENT = "---\npage-type-slug: subagent\n---\n"

const HERE = "relation-resolves-here"

const HERE_AT = `alan/domain/${HERE}.domain.md`

const DOMAIN_PAGE = `---\npage-type-slug: domain\nslug: ${HERE}\n---\n`

const RELATIONS = join(
  execFileSync("git", ["-C", akashaRoot(), "rev-parse", "--absolute-git-dir"], { encoding: "utf8" }).trim(),
  "pages",
  "index",
  "relation"
)

type Naming = { readonly key: string; readonly target: string; readonly at: string }

type World = Readonly<Record<string, string>>

type Patch = Readonly<Record<string, string | null>>

type Ruling = { readonly root: string; readonly failures: readonly CheckFailure[] }

/**
 * The `page-type` pages the fixture pages themselves are of.
 *
 * A page states `page-type-slug` as a relation onto the `page-type` page carrying that slug, so a
 * fixture tree holding only seats and domains leaves every one of them naming a page that is not
 * there. These stand so that relation resolves here as it does in the tree, leaving each case to
 * turn on the relation it is about.
 */
const PAGE_TYPES: World = {
  "pages/page-type/page-type.page-type.md": pageTypePage("page-type"),
  "pages/page-type/seat.page-type.md": pageTypePage("seat"),
  "pages/page-type/subagent.page-type.md": pageTypePage("subagent"),
  "pages/page-type/domain.page-type.md": pageTypePage("domain"),
}

function pageTypePage(slug: string): string {
  return `---\npage-type-slug: page-type\nslug: ${slug}\n---\n`
}
function put(at: string, body: string): void {
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
}

function sidecarFor(one: Naming): string {
  return join(RELATIONS, one.key, `${one.target}.jsonl`)
}

function verdict(given: World, patch: Patch, naming: readonly Naming[] = []): Ruling {
  const world = { ...PAGE_TYPES, ...given }
  const root = mkdtempSync(join(tmpdir(), "relation-resolves-"))
  try {
    for (const [relPath, body] of Object.entries(world)) put(join(root, relPath), body)
    for (const one of naming) put(sidecarFor(one), `${JSON.stringify({ repo: "akasha", key: one.at })}\n`)
    const alive = new Set(Object.keys(world))
    const changed = new Map<string, Buffer | null>()
    const paths: string[] = []
    for (const [relPath, body] of Object.entries(patch)) {
      changed.set(join(root, relPath), body === null ? null : Buffer.from(body))
      if (body === null) alive.delete(relPath)
      else {
        alive.add(relPath)
        paths.push(join(root, relPath))
      }
    }
    const standing = [...alive].sort().map((one) => join(root, one))
    const tree = treeOn(root, changed, () => standing, () => root)
    const batch: Batch = { root, paths: paths.sort(), tree, keep: () => "" }
    const run = relationResolves.run as (given: Batch) => readonly CheckFailure[]
    return { root, failures: run(batch) }
  } finally {
    for (const one of naming) rmSync(sidecarFor(one), { force: true })
    rmSync(root, { recursive: true, force: true })
  }
}

const said = (ruling: Ruling): string => ruling.failures.map((one) => one.reason).join("\n")

const namesGoing: Naming = { key: CREATOR, target: `${GOING}.seat`, at: NAMER_AT }

test("a removal stranding a namer the index reaches is refused, naming the relation and the value", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat(`${CREATOR}: ${GOING}`) }
  const ruling = verdict(world, { [GOING_AT]: null }, [namesGoing])
  expect(ruling.failures).toHaveLength(1)
  expect(ruling.failures[0]!.path).toBe(join(ruling.root, NAMER_AT))
  expect(ruling.failures[0]!.reason).toContain(`\`${CREATOR}\` names \`${GOING}\``)
  expect(ruling.failures[0]!.reason).toContain(`\`${GOING_AT}\` is the page that carries it`)
})

test("a removal no page names is not refused, though the index reaches the page judged", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat("errand: nothing") }
  expect(verdict(world, { [GOING_AT]: null }, [namesGoing]).failures).toEqual([])
})

test("a removal taking its only namer away in the same call is not refused", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat(`${CREATOR}: ${GOING}`) }
  const patch = { [GOING_AT]: null, [NAMER_AT]: null }
  expect(verdict(world, patch, [namesGoing]).failures).toEqual([])
})

test("a removal whose namer the same call edits to stop naming it is not refused", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat(`${CREATOR}: ${GOING}`) }
  const patch = { [GOING_AT]: null, [NAMER_AT]: seat("errand: nothing") }
  expect(verdict(world, patch).failures).toEqual([])
})

test("a removal whose namer the same call lands still naming it is refused, no index entry reaching it", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat(`${CREATOR}: ${GOING}`) }
  const patch = { [GOING_AT]: null, [NAMER_AT]: seat(`${CREATOR}: ${GOING}`, "errand: nothing") }
  const ruling = verdict(world, patch)
  expect(ruling.failures).toHaveLength(1)
  expect(ruling.failures[0]!.path).toBe(join(ruling.root, NAMER_AT))
})

test("a page the same call creates naming the value going is refused at both ends", () => {
  const patch = { [GOING_AT]: null, [MADE_AT]: seat(`${CREATOR}: ${GOING}`) }
  const ruling = verdict({ [GOING_AT]: seat() }, patch)
  expect(ruling.failures).toHaveLength(2)
  expect(ruling.failures.every((one) => one.path === join(ruling.root, MADE_AT))).toBe(true)
  expect(said(ruling)).toContain(`no \`seat\` page carries that slug`)
  expect(said(ruling)).toContain(`\`${GOING_AT}\` is the page that carries it`)
})

test("a removal the same call repoints the relation away from is not refused", () => {
  const world = { [GOING_AT]: seat(), [KEPT_AT]: seat(), [NAMER_AT]: seat(`${CREATOR}: ${GOING}`) }
  const patch = { [GOING_AT]: null, [NAMER_AT]: seat(`${CREATOR}: ${KEPT}`) }
  expect(verdict(world, patch, [namesGoing]).failures).toEqual([])
})

test("a removal whose value a page the same call creates still carries is not refused", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat(`${CREATOR}: ${GOING}`) }
  const patch = { [GOING_AT]: null, [MOVED_AT]: seat() }
  expect(verdict(world, patch, [namesGoing]).failures).toEqual([])
})

test("a relation that may be gone is outside the removal end", () => {
  const world = { [GOING_AT]: seat(), [NAMER_AT]: seat(`${PRINCIPAL}: ${GOING}`) }
  const naming: Naming = { key: PRINCIPAL, target: `${GOING}.seat`, at: NAMER_AT }
  expect(verdict(world, { [GOING_AT]: null }, [naming]).failures).toEqual([])
})

test("a write declaring a relation naming no bearer is refused, naming the relation and the target", () => {
  const ruling = verdict({}, { [MADE_AT]: seat(`${CREATOR}: ${ABSENT}`) })
  expect(ruling.failures).toHaveLength(1)
  expect(ruling.failures[0]!.path).toBe(join(ruling.root, MADE_AT))
  expect(ruling.failures[0]!.reason).toContain(`\`${CREATOR}\` names \`${ABSENT}\``)
  expect(ruling.failures[0]!.reason).toContain("no `seat` page carries that slug")
})

test("a write declaring a relation naming a page that stands is not refused", () => {
  expect(verdict({ [KEPT_AT]: seat() }, { [MADE_AT]: seat(`${CREATOR}: ${KEPT}`) }).failures).toEqual([])
})

test("a value only a page of another page type carries does not answer the relation", () => {
  const ruling = verdict({ [SIBLING_AT]: SUBAGENT }, { [MADE_AT]: seat(`${CREATOR}: ${SIBLING}`) })
  expect(ruling.failures).toHaveLength(1)
  expect(ruling.failures[0]!.reason).toContain("no `seat` page carries that slug")
})

test("an address resolves where a page of the page type it names carries the slug it states", () => {
  const patch = { [MADE_AT]: seat(`domain-slug: domain/${HERE}`) }
  expect(verdict({ [HERE_AT]: DOMAIN_PAGE }, patch).failures).toEqual([])
})

test("an address is refused where the value is the bare slug, which names no page type", () => {
  const ruling = verdict({ [HERE_AT]: DOMAIN_PAGE }, { [MADE_AT]: seat(`domain-slug: ${HERE}`) })
  expect(ruling.failures).toHaveLength(1)
  expect(ruling.failures[0]!.reason).toContain(`\`domain-slug\` names \`${HERE}\``)
  expect(ruling.failures[0]!.reason).toContain("no page under `domain` carries that page type and slug")
})

test("two pages landing in one call resolve against each other, neither being on disk yet", () => {
  const patch = { [MADE_AT]: seat(`${CREATOR}: ${KEPT}`), [KEPT_AT]: seat() }
  expect(verdict({}, patch).failures).toEqual([])
})

test("the same write without its sibling is refused, so the pass is the sibling's doing", () => {
  expect(verdict({}, { [MADE_AT]: seat(`${CREATOR}: ${KEPT}`) }).failures).toHaveLength(1)
})

test("a relation already standing in the text on disk is not asked again", () => {
  const world = { [MADE_AT]: seat(`${CREATOR}: ${ABSENT}`, "errand: before") }
  const patch = { [MADE_AT]: seat(`${CREATOR}: ${ABSENT}`, "errand: after") }
  expect(verdict(world, patch).failures).toEqual([])
})

test("the same relation newly declared on that page is asked and refused", () => {
  const world = { [MADE_AT]: seat("errand: before") }
  const patch = { [MADE_AT]: seat(`${CREATOR}: ${ABSENT}`, "errand: after") }
  expect(verdict(world, patch).failures).toHaveLength(1)
})

test("a relation that may be gone is outside the write end", () => {
  expect(verdict({}, { [MADE_AT]: seat(`${PRINCIPAL}: ${ABSENT}`) }).failures).toEqual([])
})

test("a page naming nothing under any relation is not refused", () => {
  expect(verdict({}, { [MADE_AT]: seat("errand: nothing") }).failures).toEqual([])
})

test("a file that is no page is not judged", () => {
  expect(verdict({}, { "checks/thing.ts": "export const thing = 1\n" }).failures).toEqual([])
})

test("a bearer whose frontmatter does not read is named as unread rather than counted absent", () => {
  const ruling = verdict({ [BROKEN_AT]: UNREADABLE }, { [MADE_AT]: seat(`${CREATOR}: ${BROKEN}`) })
  expect(ruling.failures).toHaveLength(2)
  expect(said(ruling)).toContain("could not be read")
  expect(said(ruling)).toContain(BROKEN_AT)
})
