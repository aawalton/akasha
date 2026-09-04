import { expect, test } from "bun:test"
import { manifest } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import {
  bodyRespeltIn,
  manifestRespeltIn,
  namedAs,
  packageRespelt,
  packageSaying,
  packagingFor,
  renamingOver,
  respeltIn,
} from "./package-renaming.module.code.ts"

const WAS = "@akasha/held"

const NOW = "@akasha/kept"

const AT = "akasha/held/package.json"

function manifests(...pairs: readonly (readonly [string, string])[]): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [path, text] of pairs) found.set(path, text)
  return found
}

test("a name on its own is the name it becomes", () => {
  expect(namedAs(WAS, WAS, NOW)).toBe(NOW)
})

test("a way in past the name keeps the tail it carries", () => {
  expect(namedAs(`${WAS}/one`, WAS, NOW)).toBe(`${NOW}/one`)
})

test("a name this one only opens is left alone", () => {
  expect(namedAs("@akasha/held-fast", WAS, NOW)).toBeNull()
})

test("a name under another scope is left alone", () => {
  expect(namedAs("@other/held", WAS, NOW)).toBeNull()
})

test("the manifest calling the package is the one found", () => {
  const said = packagingFor(manifests([AT, manifest(WAS)]), WAS, NOW)
  expect("refused" in said ? null : said.packaging.at).toBe(AT)
})

test("the folder is read off the manifest that names it", () => {
  const said = packagingFor(manifests([AT, manifest(WAS)]), WAS, NOW)
  expect("refused" in said ? null : said.packaging.folder).toBe("akasha/held")
})

test("a name no manifest carries is refused", () => {
  const said = packagingFor(manifests([AT, manifest("@akasha/other")]), WAS, NOW)
  expect("refused" in said ? said.refused : "").toContain("no manifest")
})

test("a name another package already carries is refused", () => {
  const said = packagingFor(
    manifests([AT, manifest(WAS)], ["akasha/kept/package.json", manifest(NOW)]),
    WAS,
    NOW
  )
  expect("refused" in said ? said.refused : "").toContain("already carries")
})

test("renaming a package to the name it has is refused", () => {
  const said = packagingFor(manifests([AT, manifest(WAS)]), WAS, WAS)
  expect("refused" in said ? said.refused : "").toContain("already carries")
})

test("an import naming the package is respelled", () => {
  const text = `import { one } from "${WAS}/one"\n`
  expect(bodyRespeltIn("akasha/x/x.ts", text, WAS, NOW)).toBe(`import { one } from "${NOW}/one"\n`)
})

test("a plain string naming the package is respelled too", () => {
  const text = `export const said = "${WAS}"\n`
  expect(bodyRespeltIn("akasha/x/x.ts", text, WAS, NOW)).toBe(`export const said = "${NOW}"\n`)
})

test("a string only opening with the name is left alone", () => {
  const text = `export const said = "@akasha/held-fast"\n`
  expect(bodyRespeltIn("akasha/x/x.ts", text, WAS, NOW)).toBeNull()
})

test("a body naming it nowhere is left alone", () => {
  expect(bodyRespeltIn("akasha/x/x.ts", "export const one = 1\n", WAS, NOW)).toBeNull()
})

test("a manifest states the name it becomes", () => {
  expect(manifestRespeltIn(manifest(WAS), WAS, NOW)).toBe(manifest(NOW))
})

test("a dependency naming the package is respelled by its key", () => {
  const text = `{\n  "dependencies": {\n    "${WAS}": "workspace:*"\n  }\n}\n`
  expect(manifestRespeltIn(text, WAS, NOW)).toBe(
    `{\n  "dependencies": {\n    "${NOW}": "workspace:*"\n  }\n}\n`
  )
})

test("what a manifest says besides the name is kept byte for byte", () => {
  const text = `{\n  "name": "${WAS}",\n  "private": true,\n  "odd":   3\n}\n`
  expect(manifestRespeltIn(text, WAS, NOW)).toBe(
    `{\n  "name": "${NOW}",\n  "private": true,\n  "odd":   3\n}\n`
  )
})

test("a way in the manifest states by a dot alone is left as it is", () => {
  const text = `{\n  "name": "${WAS}",\n  "exports": {\n    "./one": "./one/one.ts"\n  }\n}\n`
  const said = manifestRespeltIn(text, WAS, NOW)
  expect(said).toContain('"./one": "./one/one.ts"')
})

test("a path that is neither code nor a manifest is left alone", () => {
  expect(respeltIn("akasha/x/x.md", `naming ${WAS}\n`, WAS, NOW)).toBeNull()
})

test("a manifest is respelled as a manifest rather than as code", () => {
  const text = `{\n  "name": "${WAS}"\n}\n`
  expect(respeltIn(AT, text, WAS, NOW)).toBe(`{\n  "name": "${NOW}"\n}\n`)
})

test("what is rewritten is found by path and holds its new text", () => {
  const one = { was: WAS, now: NOW, at: AT, folder: "akasha/held" }
  const bodies: Readonly<Record<string, string>> = {
    [AT]: manifest(WAS),
    "akasha/x/x.ts": `import { one } from "${WAS}/one"\n`,
    "akasha/y/y.ts": "export const two = 2\n",
  }
  const said = renamingOver(one, Object.keys(bodies), (path) => bodies[path] ?? null)
  expect([...said.keys()]).toEqual([AT, "akasha/x/x.ts"])
})

test("a rename touching nothing rewrites nothing", () => {
  const one = { was: WAS, now: NOW, at: AT, folder: "akasha/held" }
  expect(renamingOver(one, ["akasha/y/y.ts"], () => "export const two = 2\n").size).toBe(0)
})

const PACKAGING = { was: WAS, now: NOW, at: AT, folder: "akasha/held" }

test("an import outside the akasha folder naming the package is respelled", () => {
  const text = `import { one } from "${WAS}/one"\n`
  expect(packageRespelt(text, WAS, NOW)).toBe(`import { one } from "${NOW}/one"\n`)
})

test("a manifest key naming the package is respelled outside the akasha folder", () => {
  const text = `{\n  "dependencies": {\n    "${WAS}": "workspace:*"\n  }\n}\n`
  expect(packageRespelt(text, WAS, NOW)).toBe(
    `{\n  "dependencies": {\n    "${NOW}": "workspace:*"\n  }\n}\n`
  )
})

test("a lockfile entry naming the package is respelled", () => {
  const text = `  "${WAS}": ["${WAS}@workspace:akasha/held", {}, ""],\n`
  expect(packageRespelt(text, WAS, NOW)).toBe(
    `  "${NOW}": ["${NOW}@workspace:akasha/held", {}, ""],\n`
  )
})

test("a longer package name this one only opens is left alone", () => {
  expect(packageRespelt(`"${WAS}-fast" "${WAS}"`, WAS, NOW)).toBe(`"${WAS}-fast" "${NOW}"`)
})

test("the folder a lockfile files a workspace under is left alone", () => {
  const text = `    "akasha/held": {\n      "name": "${WAS}"\n    }\n`
  expect(packageRespelt(text, WAS, NOW)).toBe(
    `    "akasha/held": {\n      "name": "${NOW}"\n    }\n`
  )
})

test("an answer says how many files the index does not carry were respelled", () => {
  const said = packageSaying(PACKAGING, new Map(), ["tools/lib/held.ts"], true)
  expect(said.join("\n")).toContain(
    "1 file naming the package the index does not carry would be respelled"
  )
})

test("an answer naming no further file says so", () => {
  const said = packageSaying(PACKAGING, new Map(), [], false)
  expect(said).toContain("no further file named the package")
})

test("an answer says the files outside the akasha folder were looked for", () => {
  const said = packageSaying(PACKAGING, new Map(), [], true)
  expect(said.join("\n")).toContain("found by searching what git tracks")
})
