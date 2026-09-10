import { createHash } from "node:crypto"
import { ran } from "akasha/utils/run/running/running.module.code.ts"
import { ROOT } from "../dockerfiles/dockerfile-services/dockerfile-services.module.code.ts"
import { dockerfileFor } from "../dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts"

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

export function inputsFor(slug: string): ImageInputs {
  const dockerfile = dockerfileFor(slug)
  const copied = copiedIn(dockerfile)
  if (copied.length === 0) {
    throw new Error(`the Dockerfile for ${slug} copies nothing, so its inputs are no hash`)
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
