import { createHash } from "node:crypto"
import { join } from "node:path"
import { ROOT } from "akasha/infrastructure/container-image/dockerfiles/dockerfile-services/dockerfile-services.module.code.ts"
import type { ImageBuild } from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const COPY_AT = "COPY "
const FROM_FLAG = "--from="
const FLAG_AT = "--"
const TAG_LENGTH = 12

export interface ImageInputs {
  readonly dockerfile: string
  readonly copied: readonly string[]
  readonly hash: string
}

export function copiedIn(dockerfile: string): readonly string[] {
  const found = new Set<string>()
  for (const line of dockerfile.split("\n")) {
    if (!line.startsWith(COPY_AT)) continue
    const words = line.slice(COPY_AT.length).trim().split(/\s+/)
    if (words.some((one) => one.startsWith(FROM_FLAG))) continue
    const source = words.find((one) => !one.startsWith(FLAG_AT))
    if (source !== undefined) found.add(source)
  }
  return [...found].sort()
}

function gitIn(argv: readonly string[]): string {
  const done = ran(["git", "-C", ROOT, ...argv])
  if (done.code !== 0) {
    throw new Error(`git ${argv.join(" ")} in ${ROOT} exited ${done.code}: ${done.err.trim()}`)
  }
  return done.out
}

export function inputsFor(build: ImageBuild): ImageInputs {
  const dockerfile = build.dockerfile
  const copied = copiedIn(dockerfile).map((one) => join(build.context, one))
  if (copied.length === 0) {
    throw new Error(`the Dockerfile for ${build.slug} copies nothing, so its inputs are no hash`)
  }
  const listed = gitIn(["ls-tree", "-r", "HEAD", "--", ...copied])
  const summed = createHash("sha256")
  summed.update(dockerfile)
  summed.update(listed)
  return { dockerfile, copied, hash: summed.digest("hex").slice(0, TAG_LENGTH) }
}

export function driftedIn(copied: readonly string[]): readonly string[] {
  const said = gitIn(["status", "--porcelain", "--", ...copied])
  return said
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.slice(3))
}
