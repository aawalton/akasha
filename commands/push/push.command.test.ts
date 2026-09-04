import { afterAll, test as check, expect } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { ran } from "@akasha/utils-run/running"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { push } from "./push.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function gitIn(root: string, args: readonly string[]): string {
  return ran(["git", "-C", root, ...args]).out.trim()
}

function committed(root: string, name: string): undefined {
  writeFileSync(join(root, name), `${name}\n`)
  gitIn(root, ["add", name])
  gitIn(root, ["commit", "-m", name])
}

function checkout(): string {
  const root = scratch.rootFor("akasha-push-")
  gitIn(root, ["init", "--initial-branch=main"])
  gitIn(root, ["config", "user.email", "one@example.com"])
  gitIn(root, ["config", "user.name", "One"])
  committed(root, "one.txt")
  return root
}

function remoted(root: string): string {
  const bare = scratch.rootFor("akasha-push-remote-")
  ran(["git", "init", "--bare", "--initial-branch=main", bare])
  gitIn(root, ["remote", "add", "origin", bare])
  gitIn(root, ["fetch", "origin"])
  return bare
}

function given(root: string): Given {
  return { root, calledAs: "akasha push", from: root, writer: null, agentId: null }
}

check("an argument naming what is carried is refused, and nothing is carried", () => {
  const root = checkout()
  const bare = remoted(root)
  const said = push(["origin", "main"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--dry-run")
  expect(gitIn(bare, ["rev-list", "--count", "--all"])).toBe("0")
})

check("a checkout naming no remote is refused rather than reported as done", () => {
  const root = checkout()
  const said = push([], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("no remote")
})

check("a HEAD on no branch is refused", () => {
  const root = checkout()
  remoted(root)
  gitIn(root, ["checkout", "--detach"])
  const said = push([], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("no branch")
})

check("`--dry-run` reads how far ahead the branch is and carries nothing", () => {
  const root = checkout()
  const bare = remoted(root)
  const said = push(["--dry-run"], given(root))
  expect(said.code).toBe(0)
  expect(said.report[0]).toContain("would be carried")
  expect(gitIn(bare, ["rev-list", "--count", "--all"])).toBe("0")
})

check("a push carries the branch this checkout is on to the remote", () => {
  const root = checkout()
  const bare = remoted(root)
  expect(push([], given(root)).code).toBe(0)
  expect(gitIn(bare, ["rev-list", "--count", "main"])).toBe("1")
})

check("a remote that has moved ahead refuses the push and keeps what it carries", () => {
  const root = checkout()
  const bare = remoted(root)
  expect(push([], given(root)).code).toBe(0)

  const other = scratch.rootFor("akasha-push-other-")
  ran(["git", "clone", bare, other])
  gitIn(other, ["config", "user.email", "two@example.com"])
  gitIn(other, ["config", "user.name", "Two"])
  committed(other, "two.txt")
  gitIn(other, ["push", "origin", "main"])
  const carried = gitIn(bare, ["rev-parse", "main"])
  expect(gitIn(bare, ["rev-list", "--count", "main"])).toBe("2")

  committed(root, "three.txt")
  const said = push([], given(root))
  expect(said.code).toBe(1)
  expect(gitIn(bare, ["rev-parse", "main"])).toBe(carried)
})
