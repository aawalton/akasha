import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import type { Value } from "../formula/formula.ts"
import type { Declared } from "../query/query.ts"
import type { Repo } from "../read/address.ts"
import { type Putting, type Written, putPage, takePage } from "./land.ts"
import { type Answer, type Asked, type Lands, landingHere, useLanding } from "./landing.ts"

const MARK = String.fromCharCode(96)

const TMP = "/var/tmp/land-"

const REPO = "akasha"

const AT = "pages/domain/thing.domain.md"

const SHOT = "pages/domain/thing.domain.png"

const ROWS = "pages/domain/thing.domain.rows.jsonl"

const LATE = "pages/domain/thing.domain.rows.uncommitted.jsonl"

const DECLARED: Declared = {
  properties: {
    title: { type: { kind: "text" } },
    slug: { type: { kind: "text" } },
    settled: { type: { kind: "boolean" } },
    "sequence-slugs": { type: { kind: "list", of: "text" } },
  },
  beyond: {},
}

const text = (held: string): Value => ({ kind: "text", text: held })

const ABSENT: Value = { kind: "absent" }

const NOW = 4328719365

const HALF = (): number => 0.5

const ZERO = (): number => 0

const MINTED = "00010203-0405-7080-8080-808080808080"

const MINTED_AT_ONE = "00000000-0001-7000-8000-000000000000"

const FRESH_BODY = "\n# Definition\n\n- **Thing** — a thing standing on its own.\n"

const freshWith = (id: string): string =>
  `---\npage-type-slug: domain\nid: ${id}\ntitle: Thing\nslug: thing\n---\n${FRESH_BODY}`

const STOOD_ID = "287ec2ff-cd1d-5c3a-97d9-8fea6a6a90ca"

const STOOD_BODY = "\n# Definition\n\n- **Thing** — what stood here first.\n"

const AFTER_BODY = "\n# Definition\n\n- **Thing** — what came after.\n"

const TAIL = "sequence-slugs:\n  - domain/one\n  - domain/two\n---\n"

const OLD_HEAD = `---\npage-type-slug: domain\nid: ${STOOD_ID}\ntitle: Old\nsettled: true\n${TAIL}`

const NEW_HEAD = `---\npage-type-slug: domain\nid: ${STOOD_ID}\ntitle: New\nsettled: true\n${TAIL}`

const BARE_HEAD = `---\npage-type-slug: domain\nid: ${STOOD_ID}\ntitle: Old\n${TAIL}`

const STOOD = OLD_HEAD + STOOD_BODY

const LISTED = "---\n- one\n- two\n---\n"

const LANDED: Answer = { wrote: [], gone: [], sha: null }

let asking: Asked[] = []

let answering: Answer = LANDED

const fake: Lands = (asked) => {
  asking.push(asked)
  return answering
}

const faked = (): void => {
  asking = []
  answering = LANDED
  useLanding(fake)
}

const only = (): Asked => {
  const first = asking[0]
  if (first === undefined || asking.length !== 1) {
    throw new Error(`the landing was asked ${asking.length} times, not once`)
  }
  return first
}

const whyOf = (written: Written): string => {
  if (written.kind !== "refused") throw new Error(`the write landed at ${written.at}`)
  return written.why
}

let roots: string[] = []

const rootWith = (files: Readonly<Record<string, string>>): string => {
  const root = mkdtempSync(TMP)
  roots.push(root)
  for (const [at, held] of Object.entries(files)) {
    const full = `${root}/${at}`
    mkdirSync(full.slice(0, full.lastIndexOf("/")), { recursive: true })
    writeFileSync(full, held)
  }
  return root
}

const repoAt = (root: string): Repo => ({ repo: REPO, root })

const putting = (
  root: string,
  setting: Readonly<Record<string, Value>>,
  body: string | null
): Putting => ({
  repo: repoAt(root),
  at: AT,
  pageType: "domain",
  declared: DECLARED,
  setting,
  body,
  by: null,
  now: NOW,
  random: HALF,
})

afterEach(() => {
  for (const root of roots) rmSync(root, { recursive: true, force: true })
  roots = []
})

describe("what a write does before an app states its landing", () => {
  it("refuses, saying an app states its landing at boot, and puts nothing on disk", () => {
    expect(landingHere()).toBeNull()
    const root = rootWith({})
    const written = putPage(putting(root, { title: text("Thing") }, FRESH_BODY))
    expect(whyOf(written)).toContain("an app states its landing once at boot")
    expect(existsSync(`${root}/${AT}`)).toBe(false)
  })
})

describe("what a put hands the landing where no page stands", () => {
  beforeEach(faked)

  it("hands over the composed page at the path asked for, with nothing to remove", () => {
    const root = rootWith({})
    putPage(putting(root, { title: text("Thing"), slug: text("thing") }, FRESH_BODY))
    expect(only()).toEqual({
      repo: REPO,
      root,
      message: `domain: write ${AT}`,
      entries: [{ relPath: AT, body: freshWith(MINTED) }],
      removing: [],
    })
  })

  it("mints the id from the moment and the numbers the caller passed", () => {
    const root = rootWith({})
    putPage({
      ...putting(root, { title: text("Thing"), slug: text("thing") }, FRESH_BODY),
      now: 1,
      random: ZERO,
    })
    expect(only().entries).toEqual([{ relPath: AT, body: freshWith(MINTED_AT_ONE) }])
  })

  it("hands the caller back what the landing answered", () => {
    const root = rootWith({})
    answering = { wrote: [AT], gone: [], sha: "5eb63bbb" }
    expect(putPage(putting(root, { title: text("Thing") }, FRESH_BODY))).toEqual({
      kind: "written",
      at: AT,
      wrote: [AT],
      gone: [],
      sha: "5eb63bbb",
    })
  })

  it("hands the caller back the landing's refusal as the write's own", () => {
    const root = rootWith({})
    answering = { refused: "the tree moved under this write" }
    expect(putPage(putting(root, { title: text("Thing") }, FRESH_BODY))).toEqual({
      kind: "refused",
      why: "the tree moved under this write",
    })
  })
})

describe("what a put keeps of the page already there", () => {
  beforeEach(faked)

  it("composes the page byte for byte where nothing is set and no body is given", () => {
    const root = rootWith({ [AT]: STOOD })
    putPage(putting(root, {}, null))
    expect(only().entries).toEqual([{ relPath: AT, body: STOOD }])
  })

  it("keeps the id and the keys never set, changing only the key the caller set", () => {
    const root = rootWith({ [AT]: STOOD })
    putPage(putting(root, { title: text("New") }, null))
    expect(only().entries).toEqual([{ relPath: AT, body: NEW_HEAD + STOOD_BODY }])
  })

  it("takes away the key the caller set to absent, leaving its neighbours standing", () => {
    const root = rootWith({ [AT]: STOOD })
    putPage(putting(root, { settled: ABSENT }, null))
    expect(only().entries).toEqual([{ relPath: AT, body: BARE_HEAD + STOOD_BODY }])
  })

  it("puts the body given in the place of the body already there", () => {
    const root = rootWith({ [AT]: STOOD })
    putPage(putting(root, {}, AFTER_BODY))
    expect(only().entries).toEqual([{ relPath: AT, body: OLD_HEAD + AFTER_BODY }])
  })
})

describe("what a put refuses without landing anything", () => {
  beforeEach(faked)

  it("refuses a key the page type never declared", () => {
    const root = rootWith({ [AT]: STOOD })
    const written = putPage(putting(root, { colour: text("red") }, null))
    expect(whyOf(written)).toContain("colour")
    expect(asking).toEqual([])
  })

  it("refuses a value kept in a way the key was not declared for", () => {
    const root = rootWith({ [AT]: STOOD })
    const written = putPage(putting(root, { settled: text("yes") }, null))
    expect(whyOf(written)).toBe(`${MARK}settled${MARK} is declared boolean and was given text`)
    expect(asking).toEqual([])
  })

  it("refuses to write over a page whose frontmatter is not a set of keys", () => {
    const root = rootWith({ [AT]: LISTED })
    const written = putPage(putting(root, { title: text("New") }, null))
    expect(whyOf(written)).toContain("nothing may be written over a page that cannot be read")
    expect(whyOf(written)).toContain("not a set of keys")
    expect(asking).toEqual([])
    expect(readFileSync(`${root}/${AT}`, "utf8")).toBe(LISTED)
  })
})

describe("what a take hands the landing", () => {
  beforeEach(faked)

  it("removes the page and every file beside it in one landing", () => {
    const root = rootWith({
      [AT]: STOOD,
      [ROWS]: '{"seq":1}\n',
      [LATE]: '{"seq":2}\n',
      [SHOT]: "no picture, only bytes",
    })
    takePage({ repo: repoAt(root), at: AT, by: null })
    expect(only()).toEqual({
      repo: REPO,
      root,
      message: `domain: take ${AT}`,
      entries: [],
      removing: [AT, SHOT, ROWS, LATE],
    })
  })

  it("refuses where no page stands, saying there is nothing to take away", () => {
    const root = rootWith({})
    const written = takePage({ repo: repoAt(root), at: AT, by: null })
    expect(whyOf(written)).toContain("there is nothing to take away")
    expect(asking).toEqual([])
  })
})

describe("what the landing is told the commit is for", () => {
  beforeEach(faked)

  it("names the page type and the path", () => {
    const root = rootWith({})
    putPage(putting(root, { title: text("Thing") }, FRESH_BODY))
    expect(only().message).toBe("domain: write pages/domain/thing.domain.md")
  })

  it("names the writer after the path where one is given", () => {
    const root = rootWith({})
    putPage({ ...putting(root, { title: text("Thing") }, FRESH_BODY), by: "Alan" })
    expect(only().message).toBe("domain: write pages/domain/thing.domain.md for Alan")
  })
})
