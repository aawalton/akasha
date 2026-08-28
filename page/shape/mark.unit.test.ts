import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import { CODE_DIRS, CODE_SEEDS } from "./mark.ts"
import { HERE } from "../../repo/roots/roots.ts"

const IMPORT = /(?:^|\n)\s*(?:import|export)[\s\S]*?from\s+"([^"]+)"/g

interface Closure {
  readonly reached: ReadonlySet<string>
}

function closureFrom(root: string, seeds: readonly string[]): Closure {
  const reached = new Set<string>()
  const queue = [...seeds]
  while (queue.length > 0) {
    const rel = queue.pop()
    if (rel === undefined || reached.has(rel)) continue
    reached.add(rel)
    const path = resolve(root, rel)
    if (!existsSync(path)) continue
    for (const match of readFileSync(path, "utf8").matchAll(IMPORT)) {
      const spec = match[1] ?? ""
      if (!spec.startsWith(".")) continue
      queue.push(relative(root, resolve(dirname(path), spec)))
    }
  }
  return { reached }
}

function git(root: string, args: readonly string[]): number {
  const done = Bun.spawnSync(["git", ...args], { cwd: root, timeout: 10_000 })
  return done.exitCode ?? -1
}

describe("the mark names the code that works out the answer", () => {
  const { reached } = closureFrom(HERE, CODE_SEEDS)
  const covered = (at: string): boolean => CODE_DIRS.some((dir) => at.startsWith(`${dir}/`))

  test("every file the answer is worked out from is hashed into the mark", () => {
    expect([...reached].filter((at) => !covered(at)).sort()).toEqual([])
  })

  test("the answer reaches no code outside this repository", () => {
    expect([...reached].filter((at) => at.startsWith("../")).sort()).toEqual([])
  })

  test("every declared folder stands and is recorded, so none is left out of the ground", () => {
    expect(CODE_DIRS.filter((at) => !existsSync(resolve(HERE, at)))).toEqual([])
    expect(CODE_DIRS.filter((at) => git(HERE, ["rev-parse", "-q", "--verify", `HEAD:${at}`]) !== 0)).toEqual([])
  })

  test("the seeds stand, so the walk is over the answer code and not over nothing", () => {
    expect(CODE_SEEDS.filter((at) => !existsSync(resolve(HERE, at)))).toEqual([])
    expect(reached.size).toBeGreaterThan(CODE_SEEDS.length)
  })
})
