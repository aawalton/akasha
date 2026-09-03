import { said as gitIn } from "@akasha/git/git-running"
import { bytesOf } from "@akasha/testing-system/bodying"
import { put } from "@akasha/testing-system/putting"
import { bodyIn, givenIn, repoAt } from "../../asking/asking.module.test-fixtures.ts"
import type { Answer } from "../../calling/calling.module.code.ts"
import { blobIdOf, recordRead } from "../../reading/reading.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { write } from "./write.command.code.ts"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const scratch = scratchWorld()

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-write-"), named)
}

export function wroteAt(root: string, path: string, said: readonly string[] = []): Answer {
  return write(["--file-path", path, "--content-file", bodyIn(root), ...said], givenIn(root))
}

export function removed(root: string, path: string): Answer {
  return write(["--remove", path], givenIn(root))
}

export function wroteAndRemoved(root: string, path: string, gone: string): Answer {
  return write(
    ["--file-path", path, "--content-file", bodyIn(root), "--remove", gone],
    givenIn(root)
  )
}

export function alsoCommitted(root: string, path: string, body: string): string {
  put(root, path, body)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "beside"])
  return path
}

export function readAs(root: string, path: string, body: string): undefined {
  recordRead(root, AGENT, { path, oid: blobIdOf(bytesOf(body)), seenAt: 1, mechanicalOid: null })
}
