import { expect, test } from "bun:test"
import {
  creditedIn,
  declaringIn,
  type Named,
  ownerOf,
  packageOf,
  type Reach,
  reachFrom,
  reachIn,
  styleReachIn,
  typesFor,
  typesTargetOf,
  unnamedIn,
  unreachedIn,
} from "./manifest-names-what-is-reached.code-check.code.ts"

const FOLDER = "akasha/one-system"

const AT = `${FOLDER}/one/one.module.code.ts`

const MANIFEST = `${FOLDER}/package.json`

const TSCONFIG = "tsconfig.json"

const CONFIG = "capacitor.config.json"

const STYLE_AT = `${FOLDER}/one/one.stylesheet.styles.css`

const NOTHING: Reach = { packages: new Set(), protocols: new Set() }

function reaching(...every: readonly string[]): Reach {
  return { packages: new Set(every), protocols: new Set() }
}

function thereOf(...every: readonly string[]): (named: string) => boolean {
  return (named) => every.includes(named)
}

function named(held: Record<string, unknown>): Named {
  const said = declaringIn(FOLDER, MANIFEST, JSON.stringify(held))
  if (said === null) throw new Error("the manifest would not parse")
  return said
}

const ALONE: ReadonlyMap<string, Named> = new Map()

const NONE: ReadonlySet<string> = new Set()

test("a bare specifier is the package it names", () => {
  expect(packageOf(AT, "typescript")).toBe("typescript")
  expect(packageOf(AT, "typescript/lib/typescript.js")).toBe("typescript")
})

test("a scoped specifier is the scope and the slug past it", () => {
  expect(packageOf(AT, "@akasha/indexes")).toBe("@akasha/indexes")
  expect(packageOf(AT, "@akasha/indexes/shape")).toBe("@akasha/indexes")
})

test("a specifier naming a path reaches no package", () => {
  expect(packageOf(AT, "./two.module.code.ts")).toBe(null)
  expect(packageOf(AT, "../two/two.module.code.ts")).toBe(null)
  expect(packageOf(AT, "/two/two.module.code.ts")).toBe(null)
})

test("a specifier naming a protocol reaches no package", () => {
  expect(packageOf(AT, "node:fs")).toBe(null)
  expect(packageOf(AT, "bun:test")).toBe(null)
})

test("a bare specifier naming a builtin of the runtime reaches no package", () => {
  expect(packageOf(AT, "fs")).toBe(null)
  expect(packageOf(AT, "path")).toBe(null)
  expect(packageOf(AT, "module")).toBe(null)
  expect(packageOf(AT, "bun")).toBe(null)
})

test("a scope carrying no slug names no package", () => {
  expect(packageOf(AT, "@akasha")).toBe(null)
  expect(packageOf(AT, "@")).toBe(null)
})

test("every way TypeScript names a module is read as a reach", () => {
  const body = [
    'import ts from "typescript"',
    'export { one } from "zod"',
    'const two = import("valibot")',
    'const three = require("arktype")',
    'type Four = import("effect").Effect',
  ].join("\n")
  expect(reachIn(AT, body).packages).toEqual(
    new Set(["typescript", "zod", "valibot", "arktype", "effect"])
  )
})

test("a specifier spelt inside a string a body holds reaches nothing", () => {
  const body = "const said = 'import { one } from \"@shared/pages-query\"'\n"
  expect(reachIn(AT, body).packages).toEqual(new Set())
})

test("a specifier spelt inside a template a body holds reaches nothing", () => {
  const body = 'const said = `import { readingIn } from "@akasha/indexes"`\n'
  expect(reachIn(AT, body).packages).toEqual(new Set())
})

test("a type-only import is a reach", () => {
  expect(reachIn(AT, 'import type { One } from "zod"\n').packages).toEqual(new Set(["zod"]))
})

test("the protocols a body names are answered apart from the packages", () => {
  const found = reachIn(AT, 'import { one } from "node:fs"\nimport { two } from "bun:test"\n')
  expect(found.packages).toEqual(new Set())
  expect(found.protocols).toEqual(new Set(["node:fs", "bun:test"]))
})

test("a dependency is a name the manifest states under any of its dependency fields", () => {
  const held = named({
    dependencies: { one: "1" },
    devDependencies: { two: "2" },
    peerDependencies: { three: "3" },
    optionalDependencies: { four: "4" },
  })
  expect([...held.declared]).toEqual([
    ["one", "dependencies"],
    ["two", "devDependencies"],
    ["three", "peerDependencies"],
    ["four", "optionalDependencies"],
  ])
  expect(held.peers).toEqual(new Set(["three"]))
})

test("a manifest that will not parse leaves its package unjudged", () => {
  expect(declaringIn(FOLDER, MANIFEST, "{ this is not json\n")).toBe(null)
})

test("a package whose manifest calls it nothing is named by its folder", () => {
  expect(named({}).called).toBe(FOLDER)
})

test("the words a script spells are the commands the package runs", () => {
  const held = named({ scripts: { cap: "cap", add: "bash one/two.sh add" } })
  expect(held.commands).toEqual(new Set(["cap", "bash", "one/two.sh", "add"]))
})

test("a package reached and named is let through", () => {
  const held = named({ name: "@akasha/one", dependencies: { zod: "^4" } })
  expect(unnamedIn(held, NONE, reaching("zod"))).toEqual([])
})

test("a package reached and not named is refused, naming the package and the manifest's name", () => {
  const held = named({ name: "@akasha/one" })
  const said = unnamedIn(held, NONE, reaching("zod"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`zod`")
  expect(said[0]).toContain("@akasha/one")
  expect(said[0]).toContain("does not name")
})

test("a reach at a package the akasha folder itself holds is let through", () => {
  const held = named({ name: "@akasha/one" })
  expect(unnamedIn(held, new Set(["@akasha/two"]), reaching("@akasha/two"))).toEqual([])
})

test("a package reached is named by the `@types` package standing for it", () => {
  const held = named({ name: "@akasha/one", devDependencies: { "@types/node-fetch": "1" } })
  expect(unnamedIn(held, NONE, reaching("node-fetch"))).toEqual([])
})

test("the `@types` name of a scoped package parts its scope from its slug by two lows", () => {
  expect(typesFor("node-fetch")).toBe("@types/node-fetch")
  expect(typesFor("@one/two")).toBe("@types/one__two")
  expect(typesTargetOf("@types/node-fetch")).toBe("node-fetch")
  expect(typesTargetOf("@types/one__two")).toBe("@one/two")
})

test("a dependency reached is let through", () => {
  const held = named({ name: "@akasha/one", dependencies: { zod: "^4" } })
  expect(unreachedIn(held, ALONE, reaching("zod"), thereOf(), null)).toEqual([])
})

test("a dependency reached by nothing is refused, naming the dependency and its field", () => {
  const held = named({ name: "@akasha/one", dependencies: { zod: "^4" } })
  const said = unreachedIn(held, ALONE, NOTHING, thereOf(), null)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`zod`")
  expect(said[0]).toContain("`dependencies`")
  expect(said[0]).toContain("nothing it holds reaches")
})

test("a dependency stated as a peer alone is not judged for going unreached", () => {
  const held = named({ name: "@akasha/one", peerDependencies: { zod: "^4" } })
  expect(unreachedIn(held, ALONE, NOTHING, thereOf(), null)).toEqual([])
})

test("a dependency naming a package the akasha folder itself holds is let through", () => {
  const held = named({ name: "@akasha/one", dependencies: { "@akasha/two": "workspace:*" } })
  const byName = new Map([["@akasha/two", named({ name: "@akasha/two" })]])
  expect(unreachedIn(held, byName, NOTHING, thereOf(), null)).toEqual([])
})

test("a dependency a package states as a peer of its own is reached by whoever installs it", () => {
  const held = named({
    name: "@akasha/one",
    dependencies: { zod: "^4" },
    peerDependencies: { zod: "^4" },
  })
  expect(creditedIn("zod", held, ALONE, NOTHING, thereOf(), null)).toBe(true)
})

test("a dependency another package beside it states as a peer is reached by that package", () => {
  const held = named({ name: "@akasha/one", dependencies: { "@akasha/two": "1", zod: "^4" } })
  const byName = new Map([
    ["@akasha/two", named({ name: "@akasha/two", peerDependencies: { zod: "^4" } })],
  ])
  expect(creditedIn("zod", held, byName, NOTHING, thereOf(), null)).toBe(true)
})

test("a dependency a script names as a command is reached by that script", () => {
  const held = named({
    name: "@akasha/one",
    devDependencies: { biome: "1" },
    scripts: { fix: "biome check" },
  })
  expect(unreachedIn(held, ALONE, NOTHING, thereOf(), null)).toEqual([])
})

test("`typescript` is reached by a `tsconfig.json` standing in the package's folder", () => {
  const held = named({ name: "@akasha/one", devDependencies: { typescript: "5.9.3" } })
  expect(creditedIn("typescript", held, ALONE, NOTHING, thereOf(), null)).toBe(false)
  expect(creditedIn("typescript", held, ALONE, NOTHING, thereOf(TSCONFIG), null)).toBe(true)
})

test("`@types/bun` is reached by a `bun:` specifier", () => {
  const held = named({ name: "@akasha/one", devDependencies: { "@types/bun": "1" } })
  const reach: Reach = { packages: new Set(), protocols: new Set(["bun:test"]) }
  expect(creditedIn("@types/bun", held, ALONE, NOTHING, thereOf(), null)).toBe(false)
  expect(creditedIn("@types/bun", held, ALONE, reach, thereOf(), null)).toBe(true)
})

test("`@types/node` is reached by a `node:` specifier", () => {
  const held = named({ name: "@akasha/one", devDependencies: { "@types/node": "1" } })
  const reach: Reach = { packages: new Set(), protocols: new Set(["node:fs"]) }
  expect(creditedIn("@types/node", held, ALONE, reach, thereOf(), null)).toBe(true)
})

test("an `@types` package is reached by the package it stands for", () => {
  const held = named({ name: "@akasha/one", devDependencies: { "@types/one__two": "1" } })
  expect(creditedIn("@types/one__two", held, ALONE, reaching("@one/two"), thereOf(), null)).toBe(
    true
  )
})

test("an `@types` package is reached by the package it stands for standing beside it", () => {
  const held = named({
    name: "@akasha/one",
    dependencies: { "node-fetch": "1" },
    devDependencies: { "@types/node-fetch": "1" },
  })
  expect(creditedIn("@types/node-fetch", held, ALONE, NOTHING, thereOf(), null)).toBe(true)
})

test("a `@capacitor` dependency is reached by the `capacitor-config` standing in the folder", () => {
  const held = named({
    name: "@one/native-shell",
    dependencies: { "@capacitor/core": "^8" },
    devDependencies: { "@capacitor/cli": "^8" },
  })
  expect(unreachedIn(held, ALONE, NOTHING, thereOf(CONFIG), CONFIG)).toEqual([])
  expect(unreachedIn(held, ALONE, NOTHING, thereOf(), CONFIG)).toHaveLength(2)
})

test("an index naming no `capacitor-config` credits nothing by one", () => {
  const held = named({ name: "@one/native-shell", dependencies: { "@capacitor/core": "^8" } })
  expect(unreachedIn(held, ALONE, NOTHING, thereOf(CONFIG), null)).toHaveLength(1)
})

test("a file is judged against the innermost package whose folder holds it", () => {
  const folders = ["akasha/code-system", "akasha/code-system/ios-app/ios-apps/one"]
  expect(ownerOf(folders, "akasha/code-system/two/two.module.code.ts")).toBe("akasha/code-system")
  expect(ownerOf(folders, "akasha/code-system/ios-app/ios-apps/one/three.ts")).toBe(
    "akasha/code-system/ios-app/ios-apps/one"
  )
})

test("a file standing under no package is passed over", () => {
  expect(ownerOf(["akasha/one-system"], "akasha/two-system/two.module.code.ts")).toBe(null)
  expect(ownerOf(["akasha/one-system"], "akasha/one-system")).toBe(null)
})

test("a stylesheet names a module by an `@import`", () => {
  const found = styleReachIn(STYLE_AT, '@import "@fontsource-variable/geist-mono";\n')
  expect(found.packages).toEqual(new Set(["@fontsource-variable/geist-mono"]))
})

test("a stylesheet names a module by a `url()`", () => {
  const body = 'src: url("@fontsource-variable/geist/files/geist-latin-wght-normal.woff2");\n'
  expect(styleReachIn(STYLE_AT, body).packages).toEqual(new Set(["@fontsource-variable/geist"]))
})

test("a stylesheet reaching a sibling by a relative path reaches no package", () => {
  expect(styleReachIn(STYLE_AT, '@import "./tokens.css";\n').packages).toEqual(new Set())
})

test("a url naming a scheme or a fragment reaches no package", () => {
  const body = 'src: url("data:font/woff2;base64,AAA");\n  fill: url("#glyph");\n'
  expect(styleReachIn(STYLE_AT, body).packages).toEqual(new Set())
})

test("a body read as a stylesheet is scanned and a body read as code is parsed", () => {
  expect(reachFrom(STYLE_AT, '@import "zod";\n').packages).toEqual(new Set(["zod"]))
  expect(reachFrom(AT, 'import one from "zod"\n').packages).toEqual(new Set(["zod"]))
})
