import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bytesOf } from "../../../testing-system/bodying.module.code.ts"
import type { Answer, Given } from "../../calling.module.code.ts"
import { blobIdOf } from "../../reading.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import { readWith, tellingWith } from "./read.command.code.ts"

export const CALLED_AS = "akasha read"

export const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

export const HELD = "akasha/one/held.ts"

export const MANY = 12

const EACH = 40

export const scratch = scratchWorld()

export function rootWith(
  named: readonly { readonly at: string; readonly body: string | Uint8Array }[]
): string {
  const root = scratch.rootFor("akasha-read-")
  for (const one of named) {
    const at = join(root, one.at)
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    writeFileSync(at, one.body)
  }
  return root
}

export function givenAt(root: string) {
  return { root, calledAs: CALLED_AS, from: root, writer: null, agentId: null }
}

export function givenFor(root: string) {
  return { root, calledAs: CALLED_AS, from: root, writer: null, agentId: AGENT }
}

export const bodyOf = bytesOf

export function read(argv: readonly string[], given: Given): Answer {
  return readWith(argv, given, null)
}

export function manyFiles(): readonly { readonly at: string; readonly body: string }[] {
  const made: { readonly at: string; readonly body: string }[] = []
  for (let one = 0; one < MANY; one += 1) {
    const line = `${"x".repeat(70)}\n`
    made.push({ at: `akasha/many/file-${one}.ts`, body: line.repeat(EACH) })
  }
  return made
}

export function namingAll(): readonly string[] {
  const said: string[] = []
  for (let one = 0; one < MANY; one += 1) said.push("--file-path", `akasha/many/file-${one}.ts`)
  return said
}

export function lettered(many: number): string {
  const said: string[] = []
  for (let one = 0; one < many; one += 1) said.push(`line ${one} ${"x".repeat(60)}`)
  return `${said.join("\n")}\n`
}

export function telling(was: Uint8Array | null, now: string): readonly string[] {
  const bytes = bodyOf(now)
  const seen = { path: HELD, oid: blobIdOf(was ?? bodyOf("elsewhere\n")), seenAt: 1 }
  return tellingWith(HELD, bytes, blobIdOf(bytes), seen, was)
}
