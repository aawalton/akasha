import { execFileSync } from "node:child_process"
import { onceInCall } from "../../during-call/during-call.ts"
import { PAGE_EXTENSION, type PageName, pageNameOf } from "../name/name.ts"

const BUFFER_CEILING = 64 * 1024 * 1024

export type PageFile = PageName & {
  readonly key: string
}

export class UntrackedTree extends Error {}

function listedBy(root: string, args: readonly string[]): readonly string[] {
  let listed: Buffer
  try {
    listed = execFileSync("git", ["-C", root, ...args], {
      maxBuffer: BUFFER_CEILING,
      stdio: ["ignore", "pipe", "pipe"],
    })
  } catch (thrown) {
    const said =
      thrown === null || typeof thrown !== "object"
        ? ""
        : String(Reflect.get(thrown, "stderr") ?? "").trim()
    throw new UntrackedTree(
      `git cannot say what ${root} holds${said === "" ? "" : ` — ${said}`}, so nothing here can ` +
        "list its files. Answering with no files would read as a tree naming nothing that moved, " +
        "rather than as a question that was never asked"
    )
  }
  return listed
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
}

/**
 * What git tracks under a root, worked out once for the length of a call.
 *
 * A CALL IS ONE MOMENT. Everything else held against a call — the file tree, the page type
 * registry, the shape mark — already reads the repository as it stood when the call opened, and a
 * listing that moved underneath them would describe a different repository from the one they did.
 * So holding this is the same claim those already make rather than a new one.
 *
 * WHAT IT SAVES. This spawns `git ls-files` over the whole repository, and the readouts rebuild
 * their catalog once per readout: measured on 2026-08-28, the status bar's four groups spawned it
 * 65 times in one call across two checkouts, where the call holds two answers.
 *
 * A FAILURE IS NOT HELD. `listedBy` throws where git cannot answer, and a throw leaves nothing
 * behind, so the next ask in the same call asks git again rather than inheriting a refusal.
 */
export function trackedIn(root: string, key: string | null = null): readonly string[] {
  return onceInCall(`tracked:${root}:${key ?? ""}`, () =>
    listedBy(root, key === null ? ["ls-files", "-z"] : ["ls-files", "-z", "--", key])
  )
}

export function untrackedIn(root: string, key: string): readonly string[] {
  return listedBy(root, ["ls-files", "-z", "--others", "--exclude-standard", "--", key])
}

export function specFor(type: string): string {
  return `*.${type}.${PAGE_EXTENSION}`
}

export function pagesIn(root: string, spec: string | null = null): readonly PageFile[] {
  const found: PageFile[] = []
  for (const key of trackedIn(root, spec)) {
    const named = pageNameOf(key)
    if (named === null) continue
    found.push({ key, stem: named.stem, type: named.type })
  }
  return found
}
