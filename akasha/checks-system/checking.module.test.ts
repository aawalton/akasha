import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Leaving } from "../write-system/landing.module.code.ts"
import { corpusIn } from "../write-system/corpus.module.code.ts"
import type { Body, Gathered, Whole } from "./checking.module.code.ts"
import { checksIn, judgingBy, wholeOf } from "./checking.module.code.ts"

const SPINE = [
  { at: "page.page-type.ts", value: { extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "domain.page-type.ts", value: { extendsSlug: "page" } },
  { at: "module.page-type.ts", value: { extendsSlug: "domain" } },
  { at: "check.page-type.ts", value: { extendsSlug: "module" } },
]

let count = 0

function stage(): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-checking-${count}-`)
  for (const one of SPINE) {
    const named = one.at.split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    writeFileSync(`${root}/${one.at}`, `export const ${key} = ${JSON.stringify({ slug: named, ...one.value })}\n`)
  }
  return root
}

function plant(root: string, slug: string, needs: string, code: string): void {
  const key = slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())
  writeFileSync(
    `${root}/${slug}.check.ts`,
    `export const ${key} = ${JSON.stringify({ slug, pageTypeSlug: "check", needs, code: "ts" })}\n`
  )
  writeFileSync(`${root}/${slug}.check.code.ts`, code)
}

function corpusAt(root: string) {
  const corpus = corpusIn(root)
  if ("refused" in corpus) throw new Error(corpus.refused)
  return corpus
}

function leavingOver(root: string, changed: Readonly<Record<string, string | null>>): Leaving {
  return {
    root,
    changed: Object.keys(changed).map((one) => `${root}/${one}`),
    at: (path) => {
      const named = path.slice(root.length + 1)
      if (named in changed) {
        const body = changed[named]
        return body === null || body === undefined ? null : Buffer.from(body, "utf8")
      }
      try {
        return require("node:fs").readFileSync(path) as Uint8Array
      } catch {
        return null
      }
    },
  }
}

test("a check is found by its page type, and its code is reached by the name its slug spells", () => {
  const root = stage()
  plant(root, "no-shouting", "file", "export function noShouting() { return [] }\n")
  const found = checksIn(corpusAt(root))
  expect(found.map((one) => one.slug)).toEqual(["no-shouting"])
  expect(found[0]?.needs).toBe("file")
  rmSync(root, { recursive: true })
})

test("a digit in a slug joins the name its code is reached by, so `version-7` is `Version7`", () => {
  const root = stage()
  plant(root, "uuid-version-7", "file", "export function uuidVersion7() { return [] }\nexport const held = 1\n")
  expect(checksIn(corpusAt(root)).map((one) => one.slug)).toEqual(["uuid-version-7"])
  rmSync(root, { recursive: true })
})

test("a check page whose code answers to nothing runnable refuses rather than being skipped", () => {
  const root = stage()
  plant(root, "no-shouting", "file", "export const notAFunction = 1\n")
  expect(() => checksIn(corpusAt(root))).toThrow(/answers to nothing that can be run/)
  rmSync(root, { recursive: true })
})

test("a check page stating no needs refuses, because a runner cannot guess what to hand it", () => {
  const root = stage()
  writeFileSync(
    `${root}/no-shouting.check.ts`,
    `export const noShouting = ${JSON.stringify({ slug: "no-shouting", pageTypeSlug: "check" })}\n`
  )
  writeFileSync(`${root}/no-shouting.check.code.ts`, "export function noShouting() { return [] }\n")
  expect(() => checksIn(corpusAt(root))).toThrow(/states no `needs`/)
  rmSync(root, { recursive: true })
})

test("the tree a check is shown carries the creation, drops the removal and holds the new body", () => {
  const root = stage()
  mkdirSync(`${root}/held`, { recursive: true })
  writeFileSync(`${root}/held/stays.txt`, "one")
  writeFileSync(`${root}/held/goes.txt`, "two")
  writeFileSync(`${root}/held/moves.txt`, "before")
  const whole = wholeOf(
    leavingOver(root, {
      "held/goes.txt": null,
      "held/moves.txt": "after",
      "held/arrives.txt": "new",
    })
  )
  const named = whole.paths.map((one) => one.slice(root.length + 1)).filter((one) => one.startsWith("held/"))
  expect(named).toEqual(["held/arrives.txt", "held/moves.txt", "held/stays.txt"])
  expect(new TextDecoder().decode(whole.at(`${root}/held/moves.txt`) ?? new Uint8Array())).toBe("after")
  expect(whole.at(`${root}/held/goes.txt`)).toBeNull()
  rmSync(root, { recursive: true })
})

test("a tree kept for a check holds the change, and is the same folder on a second ask", () => {
  const root = stage()
  mkdirSync(`${root}/held`, { recursive: true })
  writeFileSync(`${root}/held/stays.txt`, "one")
  writeFileSync(`${root}/held/goes.txt`, "two")
  const whole = wholeOf(leavingOver(root, { "held/goes.txt": null, "held/arrives.txt": "new" }))
  const kept = whole.keep()
  expect(readFileSync(`${kept}/held/stays.txt`, "utf8")).toBe("one")
  expect(readFileSync(`${kept}/held/arrives.txt`, "utf8")).toBe("new")
  expect(existsSync(`${kept}/held/goes.txt`)).toBe(false)
  expect(whole.keep()).toBe(kept)
  rmSync(kept, { recursive: true })
  rmSync(root, { recursive: true })
})

test("a check needing a file is run over what the change touched, never over the rest of the tree", () => {
  const root = stage()
  writeFileSync(`${root}/untouched.txt`, "quiet")
  const seen: string[] = []
  const one: Gathered = {
    slug: "watching",
    needs: "file",
    run: (given: Body) => {
      seen.push(given.path.slice(root.length + 1))
      return []
    },
  }
  judgingBy([one]).over(leavingOver(root, { "touched.txt": "loud" }))
  expect(seen).toEqual(["touched.txt"])
  rmSync(root, { recursive: true })
})

test("a check needing the tree is handed every path the change would leave", () => {
  const root = stage()
  writeFileSync(`${root}/untouched.txt`, "quiet")
  let held: Whole | null = null
  const one: Gathered = {
    slug: "watching",
    needs: "tree",
    run: (given: Whole) => {
      held = given
      return []
    },
  }
  judgingBy([one]).over(leavingOver(root, { "touched.txt": "loud" }))
  const named = (held as Whole | null)?.paths.map((at) => at.slice(root.length + 1)) ?? []
  expect(named).toContain("untouched.txt")
  expect(named).toContain("touched.txt")
  rmSync(root, { recursive: true })
})

test("a check that threw refuses the change it could not judge, rather than escaping the run", () => {
  const root = stage()
  const one: Gathered = {
    slug: "falls-over",
    needs: "file",
    run: () => {
      throw new Error("no ground under me")
    },
  }
  const said = judgingBy([one]).over(leavingOver(root, { "touched.txt": "loud" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`falls-over` threw")
  expect(said[0]?.reason).toContain("no ground under me")
  rmSync(root, { recursive: true })
})

test("what a change is judged by is named, so an ungated door cannot look like a gated one", () => {
  const every: readonly Gathered[] = [
    { slug: "one", needs: "path", run: () => [] },
    { slug: "two", needs: "tree", run: () => [] },
  ]
  expect(judgingBy(every).named).toEqual(["one", "two"])
  expect(judgingBy([]).named).toEqual([])
})

test("a reason a check gives is kept against the file it was given", () => {
  const root = stage()
  const one: Gathered = {
    slug: "no-shouting",
    needs: "file",
    run: () => ["the body shouts"],
  }
  const said = judgingBy([one]).over(leavingOver(root, { "touched.txt": "LOUD" }))
  expect(said).toEqual([{ path: `${root}/touched.txt`, reason: "the body shouts" }])
  rmSync(root, { recursive: true })
})
