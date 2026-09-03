import { existsSync, readFileSync, realpathSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { told } from "@akasha/git/git-running"
import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@akasha/git/porcelain-status"
import { z } from "zod"

export type CheckoutProvenance =
  | {
      readonly kind: "resolved"
      readonly checkout: string
      readonly commit: string
      readonly committedAt: string
      readonly branch: string | null
      readonly dirty: boolean
    }
  | {
      readonly kind: "unattributable"
      readonly checkout: string
      readonly reason: string
    }

export type RunningCheckout =
  | Omit<Extract<CheckoutProvenance, { kind: "resolved" }>, "committedAt" | "dirty">
  | Extract<CheckoutProvenance, { kind: "unattributable" }>

export function formatProvenance(provenance: CheckoutProvenance): string {
  if (provenance.kind === "unattributable") {
    return [`checkout\t${provenance.checkout}`, `commit\t(unavailable: ${provenance.reason})`].join(
      "\n"
    )
  }
  return [
    `checkout\t${provenance.checkout}`,
    `commit\t${provenance.commit}`,
    `committedAt\t${provenance.committedAt}`,
    `branch\t${provenance.branch ?? "(detached)"}`,
    `dirty\t${provenance.dirty ? "yes" : "no"}`,
  ].join("\n")
}

export function readRunningCheckoutProvenance(): CheckoutProvenance {
  return readCheckoutProvenanceAt(dirname(fileURLToPath(import.meta.url)))
}

export function readRunningCheckout(): RunningCheckout {
  return resolveCheckoutAt(dirname(fileURLToPath(import.meta.url)))
}

function resolveCheckoutAt(anchorDir: string): RunningCheckout {
  const anchor = realpathSync(anchorDir)
  const checkout = findCheckoutRoot(anchor)
  if (checkout === null) {
    return {
      kind: "unattributable",
      checkout: anchor,
      reason: "no checkout root (a package.json declaring workspaces) above this path",
    }
  }

  const revParse = told(checkout, ["rev-parse", "--show-toplevel", "HEAD", "--abbrev-ref", "HEAD"])
  if (revParse === null) {
    return { kind: "unattributable", checkout, reason: "not a git checkout" }
  }
  const [toplevel, commit, ref] = revParse.trim().split("\n")
  if (toplevel === undefined || commit === undefined || ref === undefined) {
    return { kind: "unattributable", checkout, reason: "git returned an unreadable rev-parse" }
  }
  const describedTree = realpathSync(toplevel)
  if (describedTree !== checkout) {
    return {
      kind: "unattributable",
      checkout,
      reason: `git describes a different tree: ${describedTree}`,
    }
  }
  return { kind: "resolved", checkout, commit, branch: ref === "HEAD" ? null : ref }
}

export function readCheckoutProvenanceAt(anchorDir: string): CheckoutProvenance {
  const running = resolveCheckoutAt(anchorDir)
  if (running.kind === "unattributable") return running
  const { checkout, commit, branch } = running

  const committedAt = told(checkout, ["log", "-1", "--format=%cI", "HEAD"])
  if (committedAt === null) {
    return { kind: "unattributable", checkout, reason: "git has no commit at HEAD" }
  }
  const status = told(checkout, [...PORCELAIN_STATUS_ARGS])
  if (status === null) {
    return {
      kind: "unattributable",
      checkout,
      reason: "working tree unreadable, so this commit may not describe the code",
    }
  }
  const parsed = parsePorcelainStatusZ(status)
  if (!parsed.ok) {
    return {
      kind: "unattributable",
      checkout,
      reason: "working tree status was unreadable, so this commit may not describe the code",
    }
  }

  return {
    kind: "resolved",
    checkout,
    commit,
    committedAt: committedAt.trim(),
    branch,
    dirty: parsed.entries.length > 0,
  }
}

const manifestSchema = z.object({ workspaces: z.array(z.string()).optional() }).loose()

function findCheckoutRoot(startDir: string): string | null {
  let dir = startDir
  for (;;) {
    if (declaresWorkspaces(join(dir, "package.json"))) return dir
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

function declaresWorkspaces(manifestPath: string): boolean {
  if (!existsSync(manifestPath)) return false
  try {
    return manifestSchema.parse(JSON.parse(readFileSync(manifestPath, "utf8"))).workspaces != null
  } catch {
    return false
  }
}
