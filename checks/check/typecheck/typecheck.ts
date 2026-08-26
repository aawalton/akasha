import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import type { Check, CheckFailure, Tree } from "../check-shape.ts"
import { carriesCode, outwardOf, specifiersIn, targetOf } from "../../imports/imports.ts"

const SCRATCH = "/var/tmp"

const BUILD_INFO = ".tsbuildinfo"

const DIAGNOSTIC = /^(.+?)\((\d+),\d+\): error (TS\d+: .*)$/

export const ABSENT =
  "no `tsc` with `@types/bun` beside it is reachable — run `bun install` in this repository"

type Instrument = {
  readonly tsc: string
  readonly typeRoot: string
}

function tscAt(root: string): string | null {
  const here = `${root}/node_modules/typescript/bin/tsc`
  if (existsSync(here)) return here
  const installed = `${process.env.HOME ?? "/nonexistent"}/.bun/bin/tsc`
  if (existsSync(installed)) return installed
  return Bun.which("tsc")
}

function instrument(root: string): Instrument | null {
  const found = tscAt(root)
  if (found === null || !existsSync(found)) return null
  const segments = realpathSync(found).split("/")
  const at = segments.lastIndexOf("node_modules")
  if (at === -1) return null
  const typeRoot = `${segments.slice(0, at + 1).join("/")}/@types`
  return existsSync(`${typeRoot}/bun`) ? { tsc: realpathSync(found), typeRoot } : null
}

function reaching(tree: Tree, seeds: ReadonlySet<string>): ReadonlySet<string> {
  const importedBy = new Map<string, string[]>()
  for (const path of tree.paths()) {
    if (!carriesCode(path)) continue
    const body = tree.at(path)
    if (body === null) continue
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      const target = targetOf(tree.root, path, specifier)
      if (target === null) continue
      importedBy.set(target, [...(importedBy.get(target) ?? []), path])
    }
  }
  const reached = new Set(seeds)
  const pending = [...seeds]
  while (pending.length > 0) {
    const one = pending.pop() as string
    for (const importer of importedBy.get(one) ?? []) {
      if (reached.has(importer)) continue
      reached.add(importer)
      pending.push(importer)
    }
  }
  return reached
}

function tsconfigFor(dir: string, typeRoot: string, buildInfo: string): string {
  const at = mkdtempSync(`${SCRATCH}/typecheck-`)
  writeFileSync(
    `${at}/tsconfig.json`,
    JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        module: "preserve",
        moduleResolution: "bundler",
        target: "esnext",
        lib: ["esnext"],
        allowImportingTsExtensions: true,
        skipLibCheck: true,
        types: ["bun"],
        typeRoots: [typeRoot],
        incremental: true,
        tsBuildInfoFile: buildInfo,
      },
      include: [`${dir}/**/*.ts`],
      exclude: [`${dir}/**/node_modules`],
    })
  )
  return at
}

function reachingOut(tree: Tree, paths: Iterable<string>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const path of paths) {
    if (!carriesCode(path)) continue
    const body = tree.at(path)
    if (body === null) continue
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      if (outwardOf(tree.root, path, specifier) === null) continue
      found.add(path)
      break
    }
  }
  return found
}

export const typecheck: Check = {
  slug: "typecheck",
  needs: "tree",
  run: ({ paths, tree, keep }) => {
    const subjects = paths.filter((one) => one.endsWith(".ts"))
    if (subjects.length === 0) return []
    const found = instrument(tree.root)
    if (found === null) return [{ path: tree.root, reason: ABSENT }]

    const dir = tree.dir()
    const buildInfo = `${keep()}/${BUILD_INFO}`
    const config = tsconfigFor(dir, found.typeRoot, buildInfo)
    const ran = Bun.spawnSync({
      cmd: [process.execPath, found.tsc, "--noEmit", "--pretty", "false", "-p", `${config}/tsconfig.json`],
      cwd: dir,
      stdout: "pipe",
      stderr: "pipe",
    })
    rmSync(config, { recursive: true, force: true })
    const output = `${ran.stdout.toString()}${ran.stderr.toString()}`

    const failures: CheckFailure[] = []
    const scope = reaching(tree, new Set(subjects))
    const outward = reachingOut(tree, scope)
    let seen = 0
    for (const line of output.split("\n")) {
      const match = DIAGNOSTIC.exec(line)
      if (match === null) continue
      const [, where, at, text] = match
      if (where === undefined || at === undefined || text === undefined) continue
      seen += 1
      const path = resolve(tree.root, relative(dir, resolve(dir, where)))
      if (!scope.has(path)) continue
      if (outward.has(path)) continue
      failures.push({ path, reason: `line ${at}: ${text}` })
    }
    if (seen === 0 && ran.exitCode !== 0) {
      const said = output.trim().split("\n")[0] ?? "nothing"
      return [{ path: tree.root, reason: `tsc exited ${ran.exitCode} without a diagnostic: ${said}` }]
    }
    return failures
  },
}

export default typecheck
