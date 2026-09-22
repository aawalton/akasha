import { realpathSync } from "node:fs"
import { join } from "node:path"
import { loadingFrom } from "akasha/code/body/modules/commit-loading/commit-loading.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"

const HEAD = "HEAD"

const DISPATCH_AT = "agent/hook/modules/dispatch/hook-dispatch.module.code.ts"

const OPENED = `akasha/${DISPATCH_AT}`

type Running = (root: string, base: string | null) => Promise<number>

function ranIn(held: unknown): Running | null {
  if (held === null || typeof held !== "object") return null
  const found = (held as Record<string, unknown>)["ran"]
  return typeof found === "function" ? (found as Running) : null
}

async function ranFromTree(root: string): Promise<number> {
  const child = Bun.spawn([process.execPath, join(root, DISPATCH_AT)], {
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  })
  return await child.exited
}

async function booted(root: string): Promise<number> {
  const on = loadingFrom(root, HEAD)
  const running = ranIn(await import(OPENED))
  if (running === null) return await ranFromTree(root)
  return await running(root, on ? HEAD : null)
}

async function ran(): Promise<number> {
  const root = rootOf(realpathSync(import.meta.path))
  try {
    return await booted(root)
  } catch {
    return await ranFromTree(root)
  }
}

if (import.meta.main) process.exit(await ran())
