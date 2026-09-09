import { afterAll, expect, test } from "bun:test"
import { bodyOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import {
  bodiesIn,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  objectPut,
  removePackageManifest,
  runChange,
  waysIn,
} from "./remove-package-manifest.change-agent.code.ts"

afterAll(scratch.sweep)

const HELD = "@probe/held"

const INNER = "@probe/inner"

const HELD_MANIFEST = "akasha/held/package.json"

const INNER_MANIFEST = "akasha/held/inner/package.json"

const SIDE_MANIFEST = "akasha/side/package.json"

const OTHER_MANIFEST = "akasha/other/package.json"

const READER_CODE = "akasha/side/reader.module.code.ts"

const idAt = (one: string): string => `01a0830a-0004-7000-8000-00000000000${one}`

const HELD_BODY = `{
  "name": "${HELD}",
  "exports": {
    "./one": "./one/one.ts"
  },
  "dependencies": {
    "zod": "^4.3.6"
  }
}
`

const HELD_WANTED = `{
  "name": "${HELD}",
  "exports": {
    "./one": "./one/one.ts",
    "./inner/two": "./inner/two/two.ts"
  },
  "dependencies": {
    "zod": "^4.3.6",
    "yaml": "^2.8.1"
  }
}
`

const INNER_BODY = `{
  "name": "${INNER}",
  "exports": {
    "./two": "./two/two.ts"
  },
  "dependencies": {
    "yaml": "^2.8.1"
  }
}
`

const SIDE_BODY = `{
  "name": "@probe/side",
  "dependencies": {
    "${INNER}": "workspace:*"
  }
}
`

const SIDE_WANTED = `{
  "name": "@probe/side",
  "dependencies": {
    "${HELD}": "workspace:*"
  }
}
`

const OTHER_BODY = `{
  "name": "@probe/other",
  "dependencies": {
    "${HELD}": "workspace:*",
    "${INNER}": "workspace:*"
  }
}
`

const OTHER_WANTED = `{
  "name": "@probe/other",
  "dependencies": {
    "${HELD}": "workspace:*"
  }
}
`

const READER_CODE_BODY = `import { two } from "${INNER}/two"

export const reader = two
`

const READER_CODE_WANTED = `import { two } from "${HELD}/inner/two"

export const reader = two
`

const SPEAKING: Readonly<Record<string, string>> = {
  "akasha/text-property.page-type.ts": bodyOf({
    id: idAt("0"),
    pageTypeSlug: "page-type",
    slug: "text-property",
    extendsSlug: ["page-type/page-property"],
  }),
  "akasha/file-name.text-property.ts": bodyOf({
    id: idAt("1"),
    pageTypeSlug: "text-property",
    slug: "file-name",
    propertySlug: "file-name",
  }),
  "akasha/file-property.page-type.ts": bodyOf({
    id: idAt("2"),
    pageTypeSlug: "page-type",
    slug: "file-property",
    extendsSlug: ["page-type/page-property"],
    properties: [{ pagePropertySlug: "text-property/file-name", required: false, many: false }],
  }),
  "akasha/manifest.file-property.ts": bodyOf({
    id: idAt("3"),
    pageTypeSlug: "file-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  }),
  "akasha/workspace-package.page-type.ts": bodyOf({
    id: idAt("4"),
    pageTypeSlug: "page-type",
    slug: "workspace-package",
    extendsSlug: ["page-type/domain"],
    properties: [{ pagePropertySlug: "file-property/manifest", required: true, many: false }],
  }),
}

const PACKAGED: Readonly<Record<string, string>> = {
  "akasha/held/held.workspace-package.ts": pageOf({
    id: idAt("5"),
    pageTypeSlug: "workspace-package",
    slug: "held",
    manifest: "json",
  }),
  [HELD_MANIFEST]: HELD_BODY,
  "akasha/held/one/one.ts": "export const one = 1\n",
  "akasha/held/inner/inner.workspace-package.ts": pageOf({
    id: idAt("6"),
    pageTypeSlug: "workspace-package",
    slug: "inner",
    manifest: "json",
  }),
  [INNER_MANIFEST]: INNER_BODY,
  "akasha/held/inner/two/two.ts": "export const two = 2\n",
  "akasha/side/side.workspace-package.ts": pageOf({
    id: idAt("7"),
    pageTypeSlug: "workspace-package",
    slug: "side",
    manifest: "json",
  }),
  [SIDE_MANIFEST]: SIDE_BODY,
  "akasha/side/reader.module.ts": pageOf({
    id: idAt("8"),
    pageTypeSlug: "module",
    slug: "reader",
    code: "ts",
  }),
  [READER_CODE]: READER_CODE_BODY,
  "akasha/other/other.workspace-package.ts": pageOf({
    id: idAt("9"),
    pageTypeSlug: "workspace-package",
    slug: "other",
    manifest: "json",
  }),
  [OTHER_MANIFEST]: OTHER_BODY,
}

function world(): World {
  const root = indexedRepo({ ...SPEAKING, ...PACKAGED })
  return worldAt(root, textIn(root))
}

function folded(): ReadonlyMap<string, string | null> {
  const over = world()
  const said = removePackageManifest(over, { at: INNER_MANIFEST })
  expect(said.refused).toBe(null)
  return bodiesIn(said, over.base)
}

test("a way in opens with the folder path between the two packages", () => {
  expect(waysIn({ exports: { "./two": "./two/two.ts" } }, "inner")).toEqual([
    ["./inner/two", "./inner/two/two.ts"],
  ])
})

test("ways in stated as anything but an object of paths answer nothing", () => {
  expect(waysIn({ exports: "./two/two.ts" }, "inner")).toBe(null)
})

test("a manifest naming no ways in answers a list of none", () => {
  expect(waysIn({ name: INNER }, "inner")).toEqual([])
})

test("an object of no pairs is written as an empty object", () => {
  expect(objectPut([])).toBe("{}")
})

test("the package above takes the ways in and the dependency it does not name", () => {
  expect(folded().get(HELD_MANIFEST)).toBe(HELD_WANTED)
})

test("the manifest folded is taken away", () => {
  expect(folded().get(INNER_MANIFEST)).toBe(null)
})

test("a specifier naming the folded package names the package above and that folder", () => {
  expect(folded().get(READER_CODE)).toBe(READER_CODE_WANTED)
})

test("a manifest naming the folded package under a dependency names the package above", () => {
  expect(folded().get(SIDE_MANIFEST)).toBe(SIDE_WANTED)
})

test("a manifest already naming the package above drops the folded entry", () => {
  expect(folded().get(OTHER_MANIFEST)).toBe(OTHER_WANTED)
})

test("no page is restated here", () => {
  expect([...folded().keys()].sort()).toEqual(
    [HELD_MANIFEST, OTHER_MANIFEST, READER_CODE, SIDE_MANIFEST, INNER_MANIFEST].sort()
  )
})

test("a folder sitting under no other package is refused", () => {
  const said = removePackageManifest(world(), { at: HELD_MANIFEST })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${HELD_MANIFEST}\` sits under no other package, so no package is folded`
  )
})

test("a manifest that could not be read is refused", () => {
  const said = removePackageManifest(
    worldAt(scratch.rootFor("fold-"), () => null),
    {
      at: INNER_MANIFEST,
    }
  )
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${INNER_MANIFEST}\` could not be read`)
})

test("a call stating no path is refused by that key", () => {
  const said = runChange(world(), {})
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`at` names what this change is handed, and the arguments hold no `at`")
})

const ROOT_MANIFEST = "package.json"

const LONE = "@probe/lone"

const LONE_MANIFEST = "akasha/lone/package.json"

const NEAR_MANIFEST = "akasha/near/package.json"

const NEAR_CODE = "akasha/near/near.module.code.ts"

const FAR_MANIFEST = "akasha/far/package.json"

const FAR_CODE = "akasha/far/far.module.code.ts"

const USER_CODE = "akasha/user/user.module.code.ts"

const idTo = (one: string): string => `01a0830a-0005-7000-8000-00000000000${one}`

const ROOT_BODY = `{
  "name": "probe",
  "exports": {
    "./*": "./*"
  },
  "dependencies": {
    "zod": "^4.3.6"
  }
}
`

const ROOT_WANTED = `{
  "name": "probe",
  "exports": {
    "./*": "./*"
  },
  "dependencies": {
    "zod": "^4.3.6",
    "yaml": "^2.8.1"
  }
}
`

const LONE_BODY = `{
  "name": "${LONE}",
  "exports": {
    ".": "./lone.ts",
    "./two": "./two/two.ts"
  },
  "dependencies": {
    "yaml": "^2.8.1"
  }
}
`

const NEAR_BODY = `{
  "name": "@probe/near",
  "dependencies": {
    "${LONE}": "workspace:*",
    "zod": "^4.3.6"
  }
}
`

const NEAR_WANTED = `{
  "name": "@probe/near",
  "dependencies": {
    "zod": "^4.3.6",
    "probe": "workspace:*"
  }
}
`

const NEAR_CODE_BODY = `import { two } from "${LONE}/two"

export const near = two
`

const NEAR_CODE_WANTED = `import { two } from "probe/akasha/lone/two/two.ts"

export const near = two
`

const FAR_BODY = `{
  "name": "@probe/far",
  "dependencies": {
    "probe": "workspace:*",
    "${LONE}": "workspace:*"
  }
}
`

const FAR_WANTED = `{
  "name": "@probe/far",
  "dependencies": {
    "probe": "workspace:*"
  }
}
`

const FAR_CODE_BODY = `import { lone } from "${LONE}"

export const far = lone
`

const FAR_CODE_WANTED = `import { lone } from "probe/akasha/lone/lone.ts"

export const far = lone
`

const USER_BODY = `import { lone } from "${LONE}"
import { two } from "${LONE}/two"

export const user = [lone, two]
`

const USER_WANTED = `import { lone } from "probe/akasha/lone/lone.ts"
import { two } from "probe/akasha/lone/two/two.ts"

export const user = [lone, two]
`

const ROOTED: Readonly<Record<string, string>> = {
  [ROOT_MANIFEST]: ROOT_BODY,
  "akasha/lone/lone.workspace-package.ts": pageOf({
    id: idTo("0"),
    pageTypeSlug: "workspace-package",
    slug: "lone",
    manifest: "json",
  }),
  [LONE_MANIFEST]: LONE_BODY,
  "akasha/lone/lone.ts": "export const lone = 1\n",
  "akasha/lone/two/two.ts": "export const two = 2\n",
  "akasha/near/near.workspace-package.ts": pageOf({
    id: idTo("1"),
    pageTypeSlug: "workspace-package",
    slug: "near",
    manifest: "json",
  }),
  [NEAR_MANIFEST]: NEAR_BODY,
  "akasha/near/near.module.ts": pageOf({
    id: idTo("3"),
    pageTypeSlug: "module",
    slug: "near",
    code: "ts",
  }),
  [NEAR_CODE]: NEAR_CODE_BODY,
  "akasha/far/far.workspace-package.ts": pageOf({
    id: idTo("4"),
    pageTypeSlug: "workspace-package",
    slug: "far",
    manifest: "json",
  }),
  [FAR_MANIFEST]: FAR_BODY,
  "akasha/far/far.module.ts": pageOf({
    id: idTo("5"),
    pageTypeSlug: "module",
    slug: "far",
    code: "ts",
  }),
  [FAR_CODE]: FAR_CODE_BODY,
  "akasha/user/user.module.ts": pageOf({
    id: idTo("2"),
    pageTypeSlug: "module",
    slug: "user",
    code: "ts",
  }),
  [USER_CODE]: USER_BODY,
}

function rootWorld(): World {
  const root = indexedRepo({ ...SPEAKING, ...ROOTED })
  return worldAt(root, textIn(root))
}

function rootFolded(): ReadonlyMap<string, string | null> {
  const over = rootWorld()
  const said = removePackageManifest(over, { at: LONE_MANIFEST })
  expect(said.refused).toBe(null)
  return bodiesIn(said, over.base)
}

test("the root is the package folded into where no other package is above", () => {
  expect(rootFolded().get(LONE_MANIFEST)).toBe(null)
})

test("a fold into the root adds no way in, the root naming every file already", () => {
  expect(rootFolded().get(ROOT_MANIFEST)).toBe(ROOT_WANTED)
})

test("a specifier folded into the root names the file that specifier reached", () => {
  expect(rootFolded().get(USER_CODE)).toBe(USER_WANTED)
})

test("a manifest naming a package folded into the root drops that entry", () => {
  expect(rootFolded().get(FAR_MANIFEST)).toBe(FAR_WANTED)
})

test("a manifest holding a body this fold respells names the root instead", () => {
  expect(rootFolded().get(NEAR_MANIFEST)).toBe(NEAR_WANTED)
})

test("a manifest naming the root already is left as that manifest states it", () => {
  expect(rootFolded().get(FAR_MANIFEST)).toBe(FAR_WANTED)
})

test("a body under another package is respelled as a body under the root is", () => {
  expect(rootFolded().get(NEAR_CODE)).toBe(NEAR_CODE_WANTED)
  expect(rootFolded().get(FAR_CODE)).toBe(FAR_CODE_WANTED)
})

test("the root's own manifest is refused", () => {
  const said = removePackageManifest(rootWorld(), { at: ROOT_MANIFEST })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${ROOT_MANIFEST}\` sits under no other package, so no package is folded`
  )
})
