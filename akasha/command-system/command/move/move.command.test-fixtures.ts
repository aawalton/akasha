import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { warrantsStanding } from "../../../context-system/warranting/warranting.module.test-fixtures.ts"
import {
  importFiled,
  pathFiled,
  rebuiltIn,
  relationFiled,
  stampedIn,
} from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { declaringUnder } from "../../../testing-system/declaring/declaring.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import { admitting } from "../../../testing-system/minting/minting.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import type { Given } from "../../calling/calling.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { blobIdOf, recordRead } from "../../reading/reading.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"

const TREE = "akasha"

export const HELD = "akasha/one/held.module.ts"

export const THREE = "akasha/three/held.module.ts"

export const DEEP = "akasha/one/deep/held.module.ts"

export const PAIR = ["--from", HELD, "--to", THREE]

export const PAGE = `export const held = {
  id: "01a04bed-1450-7000-8000-00000000aaaa",
  pageTypeSlug: "module",
  slug: "held",
  definition: "a page carried across a move",
}
`

export const CODE = `import ts from "typescript"
import { other } from "../two/other.module.code.ts"

export const held = { ts, other }
`

export const OTHER = `export const other = 1\n`

export const HOLDER = "akasha/one/held.module.code.ts"

export const TARGET = "akasha/two/other.module.code.ts"

export const ARRIVES = "akasha/four/other.module.code.ts"

export const DEEPER = "akasha/one/deep/held.module.code.ts"

export const NAMER = "akasha/five/namer.module.code.ts"

export const SPELLS = `export const at = "akasha/two/other.module.code.ts"\n`

export const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

export const RENAME = ["--from", HELD, "--to", "akasha/one/other.module.ts"]

export const READER = "akasha/elsewhere/reader.module.ts"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const UNSAID = "akasha/one/held.module.uncommitted.ts"

export const UNSAID_AT = "akasha/three/held.module.uncommitted.ts"

export const VALUES = `export const held = { title: "unsaid" }\n`

export const SECOND = "akasha/two/other.module.ts"

export const SECOND_AT = "akasha/four/other.module.ts"

export const SECOND_UNSAID = "akasha/two/other.module.uncommitted.ts"

export const SECOND_UNSAID_AT = "akasha/four/other.module.uncommitted.ts"

export const SECOND_PAGE = `export const other = {
  id: "01a04bed-1450-7000-8000-00000000eeee",
  pageTypeSlug: "module",
  slug: "other",
  definition: "a second page carried across a move",
}
`

export const BOTH = [...PAIR, "--from", SECOND, "--to", SECOND_AT]

export const NESTED = [
  "--from",
  HELD,
  "--to",
  `${SECOND_UNSAID_AT}/held.module.ts`,
  "--from",
  SECOND,
  "--to",
  SECOND_AT,
]

export const VOCABULARY: readonly string[] = Object.keys(declaringUnder(TREE))

export const scratch = scratchWorld()

export const git = gitIn

export function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-move-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries({ ...declaringUnder(TREE), ...named })) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "akasha/admits.check*\n")
  admitting(root)
  return root
}

export function rebuilt(root: string): string {
  rebuiltIn(root, TREE)
  admitting(root)
  return root
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha move", from: root, writer: null, agentId: null }
}

export const head = baseOf

export function importing(root: string, target: string, importers: readonly string[]): undefined {
  importFiled(
    root,
    target,
    importers.map((path) => ({ path }))
  )
  stampedIn(root, { commit: head(root), tree: TREE, settled: [] })
}

export function claiming(root: string, path: string, ids: readonly string[]): undefined {
  pathFiled(
    root,
    path,
    ids.map((id) => ({ path, id }))
  )
}

export function naming(root: string, id: string): undefined {
  relationFiled(root, id, "required-reading-slugs", AAAA, [{ path: READER }])
}

export function heldPage(): string {
  return repoWith({ [HELD]: PAGE })
}

export function heldIndexed(): string {
  return rebuilt(heldPage())
}

export function oneUnsaid(): string {
  const root = heldIndexed()
  put(root, UNSAID, VALUES)
  return root
}

export function twoUnsaid(): string {
  const root = rebuilt(repoWith({ [HELD]: PAGE, [SECOND]: SECOND_PAGE }))
  put(root, UNSAID, VALUES)
  put(root, SECOND_UNSAID, VALUES)
  return root
}

export function held(root: string, path: string, body: string): undefined {
  warrantsStanding(root, ["file-itself"])
  recordRead(root, AGENT, {
    path,
    oid: blobIdOf(new TextEncoder().encode(body)),
    seenAt: 1,
    mechanicalOid: null,
  })
}
