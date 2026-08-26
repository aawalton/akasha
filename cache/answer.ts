import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { type Key, pathOf } from "./key.ts"

const ANSWERS = "answers"

export function answersAt(root: string): string {
  const dir = execFileSync("git", ["-C", root, "rev-parse", "--absolute-git-dir"], {
    encoding: "utf8",
  }).trim()
  return join(dir, ANSWERS)
}

export function answerAt(at: string, key: Key): unknown {
  const file = join(at, pathOf(key))
  if (!existsSync(file)) return null
  return JSON.parse(readFileSync(file, "utf8"))
}

export function keepAnswer(at: string, key: Key, answer: unknown): void {
  const file = join(at, pathOf(key))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(answer))
}

export function sweep(at: string, kind: string, name: string, keeping: string): void {
  const under = join(at, kind, name)
  if (!existsSync(under)) return
  for (const mark of readdirSync(under)) {
    if (mark === keeping) continue
    rmSync(join(under, mark), { recursive: true, force: true })
  }
}
