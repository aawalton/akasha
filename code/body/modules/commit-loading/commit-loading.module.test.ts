import { afterAll, expect, test } from "bun:test"
import { mkdirSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { loadingFrom } from "akasha/code/body/modules/commit-loading/commit-loading.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { readingEnded } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"

const MODULE_AT = new URL("./commit-loading.module.code.ts", import.meta.url).pathname

const PACKAGE = '{"name":"akasha","type":"module","exports":{"./*":"./*"}}\n'

const COMMITTED = 'export const one = "committed"\n'

const scratch = scratchWorld()

afterAll(() => {
  readingEnded()
  scratch.sweep()
})

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-commit-loading-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  writeFileSync(join(root, "package.json"), PACKAGE)
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  mkdirSync(join(root, "node_modules"), { recursive: true })
  symlinkSync(root, join(root, "node_modules", "akasha"))
  return root
}

function loadedIn(root: string, at: string): string {
  const body =
    `import { loadingFrom } from ${JSON.stringify(MODULE_AT)}\n` +
    `loadingFrom(${JSON.stringify(root)}, "HEAD")\n` +
    `const held = await import(${JSON.stringify(at)})\n` +
    "console.log(held.one)\n"
  const done = ran(["bun", "-e", body], { cwd: root })
  if (done.code !== 0) throw new Error(`\`${at}\` would not load — ${done.err.trim()}`)
  return done.out.trim()
}

test("a module is loaded from the body the commit holds rather than the body on disk", () => {
  const root = repoWith({ "held/one.ts": COMMITTED })
  writeFileSync(join(root, "held/one.ts"), 'export const one = "changed on disk"\n')
  expect(loadedIn(root, "akasha/held/one.ts")).toBe("committed")
})

test("a module the commit holds and the checkout no longer holds is loaded all the same", () => {
  const root = repoWith({ "held/one.ts": COMMITTED })
  unlinkSync(join(root, "held/one.ts"))
  expect(loadedIn(root, "akasha/held/one.ts")).toBe("committed")
})

test("a module the commit does not hold is loaded from the checkout", () => {
  const root = repoWith({ "held/one.ts": COMMITTED })
  writeFileSync(join(root, "held/two.ts"), 'export const one = "uncommitted"\n')
  expect(loadedIn(root, "akasha/held/two.ts")).toBe("uncommitted")
})

test("a base naming no commit puts no loader in place", () => {
  expect(loadingFrom(repoWith({ "held/one.ts": COMMITTED }), "0".repeat(40))).toBe(false)
})
