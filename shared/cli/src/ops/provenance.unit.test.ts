import { describe, expect, it } from "bun:test"
import { type CheckoutProvenance, formatProvenance } from "./provenance"

const RESOLVED: CheckoutProvenance = {
  kind: "resolved",
  checkout: "/var/home/walton/worktrees/16044",
  commit: "a962386ac1496d71ed654e02f7b22623d0d06b98",
  committedAt: "2026-07-28T00:12:00Z",
  branch: "project-16044",
  dirty: false,
}

describe("formatProvenance — resolved", () => {
  it("emits the five facts as TSV, one per line, in a fixed order", () => {
    expect(formatProvenance(RESOLVED)).toBe(
      [
        "checkout\t/var/home/walton/worktrees/16044",
        "commit\ta962386ac1496d71ed654e02f7b22623d0d06b98",
        "committedAt\t2026-07-28T00:12:00Z",
        "branch\tproject-16044",
        "dirty\tno",
      ].join("\n")
    )
  })

  it("renders a detached HEAD as (detached) rather than git's literal HEAD", () => {
    const out = formatProvenance({ ...RESOLVED, branch: null })
    expect(out).toContain("branch\t(detached)")
    expect(out).not.toContain("branch\tHEAD")
  })

  it("renders a modified working tree as dirty yes", () => {
    expect(formatProvenance({ ...RESOLVED, dirty: true })).toContain("dirty\tyes")
  })
})

describe("formatProvenance — unattributable", () => {
  const unattributable: CheckoutProvenance = {
    kind: "unattributable",
    checkout: "/var/tmp/extracted",
    reason: "not a git checkout",
  }

  it("still names the checkout, because the path is known without git", () => {
    expect(formatProvenance(unattributable)).toContain("checkout\t/var/tmp/extracted")
  })

  it("says why there is no commit instead of omitting the line", () => {
    expect(formatProvenance(unattributable)).toContain("commit\t(unavailable: not a git checkout)")
  })

  it("emits nothing downstream of the commit it could not establish", () => {
    const out = formatProvenance(unattributable)
    expect(out.split("\n")).toHaveLength(2)
    expect(out).not.toContain("committedAt")
    expect(out).not.toContain("branch")
    expect(out).not.toContain("dirty")
  })
})
