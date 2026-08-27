import { describe, expect, test } from "bun:test"
import { parseProjectWorktreeSeq, projectWorktreePath, treeSeqOfProject } from "./worktree-paths"

const tree = (seq: number) => treeSeqOfProject({ seq, parentSeq: null })

const BASE = "/home/walton/worktrees"

describe("projectWorktreePath", () => {
  test("a project's worktree is the seq directly under the base", () => {
    expect(projectWorktreePath(BASE, tree(16450))).toBe("/home/walton/worktrees/16450")
  })

  test("round-trips through the parser", () => {
    expect(parseProjectWorktreeSeq(projectWorktreePath(BASE, tree(16450)), BASE)).toBe(tree(16450))
  })
})

describe("parseProjectWorktreeSeq", () => {
  test("reads the seq back out", () => {
    expect(parseProjectWorktreeSeq(`${BASE}/16277`, BASE)).toBe(tree(16277))
  })

  test("rejects a path outside the base", () => {
    expect(parseProjectWorktreeSeq("/home/walton/projects/16277", BASE)).toBeNull()
  })

  test("rejects a non-numeric leaf", () => {
    expect(parseProjectWorktreeSeq(`${BASE}/14571-eval`, BASE)).toBeNull()
  })

  test("rejects a nested path below the seq", () => {
    expect(parseProjectWorktreeSeq(`${BASE}/16277/worktree`, BASE)).toBeNull()
  })

  test("rejects the base itself", () => {
    expect(parseProjectWorktreeSeq(BASE, BASE)).toBeNull()
  })

  test("rejects a sibling base sharing a prefix", () => {
    expect(parseProjectWorktreeSeq("/home/walton/worktrees-old/16277", BASE)).toBeNull()
  })

  test("rejects zero and negative seqs", () => {
    expect(parseProjectWorktreeSeq(`${BASE}/0`, BASE)).toBeNull()
    expect(parseProjectWorktreeSeq(`${BASE}/-4`, BASE)).toBeNull()
  })

  test("treats the base as literal text, not a pattern", () => {
    expect(
      parseProjectWorktreeSeq("/home/walton/wXrktrees/16277", "/home/walton/w.rktrees")
    ).toBeNull()
  })
})
