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
