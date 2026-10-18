import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { generatedOver } from "akasha/change/generator/modules/change-generating/change-generating.module.code.ts"
import { type FileChange, leftAt } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  groupAt,
  groupsIn,
  type Reaching,
  readOver,
  writingIn,
  writtenOver,
} from "akasha/code/module-property-group/modules/group-writing/group-writing.change-generator.code.ts"
import { bodyIn as bodyOf } from "akasha/command/modules/change-preparing/change-preparing.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { shadowAt, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = codeRoot()

const INDEX = shadowAt(ROOT).index

const BYTES = new TextEncoder()

const MARKER = "the body the change leaves\n"

const OFF_DISK = "the body the checkout has\n"

const TURNED = `export function bodyIn(): string {\n  return ${JSON.stringify(MARKER)}\n}\n`

const COMPOSING = "composing"

const PAGE = "here/there/one.container-recipe.ts"

const GROUP = "here/there/one.container-recipe.composing.code.ts"

const WRITTEN = "here/there/Containerfile"

describe("where a page's group sits", () => {
  test("a group's code is beside the page keeping that group", () => {
    expect(groupAt(PAGE, COMPOSING)).toBe(GROUP)
  })

  test("a path that is no TypeScript file names no group", () => {
    expect(groupAt(WRITTEN, COMPOSING)).toBeNull()
  })
})

describe("the groups a file property names", () => {
  test("a group is answered with the property whose file that group writes", () => {
    const found = groupsIn(INDEX).find((one) => one.slug === COMPOSING)
    expect(found?.propertySlug).toBe("recipe")
  })

  test("a group is answered with the page types carrying that group", () => {
    const found = groupsIn(INDEX).find((one) => one.slug === COMPOSING)
    expect(found?.pageTypeSlugs).toEqual(["container-recipe"])
  })

  test("a group no file property names is not answered", () => {
    expect(groupsIn(INDEX).find((one) => one.slug === "check")).toBeUndefined()
  })
})

const NOTHING: Change = {
  root: ROOT,
  changed: [],
  before: () => null,
  after: () => null,
}

describe("reaching a group", () => {
  test("a group at no path is said rather than thrown", () => {
    expect("missing" in writingIn(NOTHING, GROUP)).toBe(true)
  })

  test("every group beside a page answers the one function a group answers", () => {
    const gone: string[] = []
    for (const group of groupsIn(INDEX)) {
      for (const pageTypeSlug of group.pageTypeSlugs) {
        for (const listed of INDEX.everyOfType(pageTypeSlug)) {
          const beside = groupAt(listed.path, group.slug)
          if (beside === null || !existsSync(join(ROOT, beside))) continue
          if ("missing" in writingIn(NOTHING, beside)) gone.push(beside)
        }
      }
    }
    expect(gone).toEqual([])
  })
})

function groupCodes(): readonly string[] {
  const found: string[] = []
  for (const group of groupsIn(INDEX)) {
    for (const pageTypeSlug of group.pageTypeSlugs) {
      for (const listed of INDEX.everyOfType(pageTypeSlug)) {
        const beside = groupAt(listed.path, group.slug)
        if (beside !== null && existsSync(join(ROOT, beside))) found.push(beside)
      }
    }
  }
  return [...found].sort()
}

const ONE = groupCodes()[0] as string

const WAS = readFileSync(join(ROOT, ONE), "utf8")

function bytesAt(path: string): Uint8Array | null {
  const full = join(ROOT, path)
  return existsSync(full) ? new Uint8Array(readFileSync(full)) : null
}

function changeTurning(at: string, body: string): Change {
  return {
    root: ROOT,
    changed: [at],
    before: (path) => bytesAt(path),
    after: (path) => (path === at ? BYTES.encode(body) : bytesAt(path)),
  }
}

const handed: Reaching = (_change, _at, body) => ({ writing: () => body ?? OFF_DISK })

describe("the body a group's code is loaded from", () => {
  test("a group is run off the body the change leaves", () => {
    const reached = writingIn(changeTurning(ONE, TURNED), ONE, TURNED)
    expect("writing" in reached ? reached.writing(ROOT) : reached.missing).toBe(MARKER)
  })

  test("a group is run off the checkout again once that body is loaded", () => {
    const reached = writingIn(NOTHING, ONE)
    expect("writing" in reached ? reached.writing(ROOT) : reached.missing).not.toBe(MARKER)
  })
})

describe("whether a path moved what the last run read", () => {
  const read = new Set(["page-type/shell-script/slug", "code/one.shell-script.ts"])

  test("a path the last run read is read", () => {
    expect(readOver(read, "code/one.shell-script.ts")).toBe(true)
  })

  test("a path under a folder the last run listed is read", () => {
    expect(readOver(read, "page-type/shell-script/slug/two.jsonl")).toBe(true)
  })

  test("an index path is read as the index names it", () => {
    const at = join(indexNamed(), "page-type/shell-script/slug/two.jsonl")
    expect(readOver(read, at)).toBe(true)
  })

  test("a path the last run read nothing of is not read", () => {
    const at = join(indexNamed(), "page-type/agent-message/slug/message-0.jsonl")
    expect(readOver(read, "agent/message/pages/message-0.agent-message.ts")).toBe(false)
    expect(readOver(read, at)).toBe(false)
  })
})

describe("a change to a group's own code", () => {
  const change = changeTurning(ONE, TURNED)
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const written = writtenOver(change, cast.shadow, cast.reading, handed)

  test("the file that group writes is composed from the body the change leaves", () => {
    expect(written.edits.filter((one) => bodyOf(one) === TURNED)).toHaveLength(1)
  })

  test("no file is composed from the body the checkout has at that path", () => {
    expect(written.edits.filter((one) => bodyOf(one) === WAS)).toEqual([])
  })

  test("a group the change leaves alone is handed no body", () => {
    const rest = written.edits.filter((one) => bodyOf(one) !== TURNED)
    expect(rest.length).toBeGreaterThan(0)
    expect(rest.every((one) => bodyOf(one) === OFF_DISK)).toBe(true)
  })
})

const ADDED_AT = "code/ios-component/pages/group-writing-probe"

const ADDED = `${ADDED_AT}/group-writing-probe.ios-component.ts`

const ADDED_SWIFT = `${ADDED_AT}/group-writing-probe.ios-component.swift.swift`

const PROGRAM = "code/ios-program/pages/alanwalton-widget/alanwalton-widget.ios-program.ts"

const SCRIPT =
  "code/ios-harness/scripts/render-harness-run/render-harness-run.shell-script.shell.sh"

const LISTS = "  components: [\n"

const MINTING_THEN_WRITING: ReadonlySet<string> = new Set(["value-minting", "group-writing"])

const IDLESS = `import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const groupWritingProbe = {
  type: "page-type/ios-component",
  slug: "group-writing-probe",
  definition: "a component a change adds",
  swift: "swift",
} as const satisfies IosComponent
`

function changeOver(held: ReadonlyMap<string, string>): Change {
  return {
    root: ROOT,
    changed: [...held.keys()],
    before: bytesAt,
    after: (path) => {
      const body = held.get(path)
      return body === undefined ? bytesAt(path) : BYTES.encode(body)
    },
  }
}

function writtenIn(one: FileChange): string | null {
  if ("content" in one) return one.content
  return "contentTo" in one ? one.contentTo : null
}

describe("a page the change adds, stating no id of its own", () => {
  const held = new Map([
    [ADDED, IDLESS],
    [ADDED_SWIFT, "// a component a change adds\n"],
    [
      PROGRAM,
      readFileSync(join(ROOT, PROGRAM), "utf8").replace(
        LISTS,
        `${LISTS}    "ios-component/group-writing-probe",\n`
      ),
    ],
  ])
  const ran = generatedOver(
    changeOver(held),
    (made) => {
      const more = new Map(held)
      for (const one of made) {
        const body = writtenIn(one)
        if (body !== null) more.set(leftAt(one), body)
      }
      return changeOver(more)
    },
    MINTING_THEN_WRITING
  )

  test("a group reads that page in the landing adding it, once its id is minted", () => {
    const script = ran.edits.find((one) => leftAt(one) === SCRIPT)
    expect(script === undefined ? null : writtenIn(script)).toContain(ADDED_SWIFT)
  })
})
