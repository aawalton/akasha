import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { stampIn } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import type { ImageBuild } from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"

const COPY_AT = "COPY "
const FROM_FLAG = "--from="
const FLAG_AT = "--"
const CARRIED_ON = /\\\n/g
const TAG_LENGTH = 12

export interface ImageInputs {
  readonly dockerfile: string
  readonly copied: readonly string[]
  readonly hash: string
}

export function copiedIn(dockerfile: string): readonly string[] {
  const found = new Set<string>()
  for (const line of dockerfile.replace(CARRIED_ON, " ").split("\n")) {
    if (!line.startsWith(COPY_AT)) continue
    const words = line.slice(COPY_AT.length).trim().split(/\s+/)
    if (words.some((one) => one.startsWith(FROM_FLAG))) continue
    const named = words.filter((one) => !one.startsWith(FLAG_AT))
    for (const source of named.slice(0, -1)) found.add(source)
  }
  return [...found].sort()
}

function gitIn(argv: readonly string[], codeAt: string): string {
  const done = ran(["git", "-C", codeAt, ...argv])
  if (done.code !== 0) {
    throw new Error(`git ${argv.join(" ")} in ${codeAt} exited ${done.code}: ${done.err.trim()}`)
  }
  return done.out
}

function pinnedIn(codeAt: string): string | null {
  let held: string
  try {
    held = readFileSync(stampIn(codeAt), "utf8")
  } catch {
    return null
  }
  const one = held.trim()
  return one === "" ? null : one
}

function listedFor(copied: readonly string[], codeAt: string): string {
  if (copied.length === 0) return ""
  return gitIn(["ls-tree", "-r", pinnedIn(codeAt) ?? "HEAD", "--", ...copied], codeAt)
}

export function inputsFor(build: ImageBuild, codeAt: string = ROOT): ImageInputs {
  const dockerfile = build.dockerfile
  const copied = copiedIn(dockerfile).map((one) => join(build.context, one))
  const summed = createHash("sha256")
  summed.update(dockerfile)
  summed.update(listedFor(copied, codeAt))
  return { dockerfile, copied, hash: summed.digest("hex").slice(0, TAG_LENGTH) }
}

export function inAWorkTree(codeAt: string): boolean {
  const done = ran(["git", "-C", codeAt, "rev-parse", "--is-inside-work-tree"])
  return done.code === 0 && done.out.trim() === "true"
}

export function driftedIn(copied: readonly string[], codeAt: string = ROOT): readonly string[] {
  if (copied.length === 0) return []
  if (!inAWorkTree(codeAt)) return []
  const said = gitIn(["status", "--porcelain", "--", ...copied], codeAt)
  return said
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.slice(3))
}
