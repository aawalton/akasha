import { mkdirSync, realpathSync, symlinkSync } from "node:fs"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { keptAt } from "akasha/file/disk/test-fixtures/kept-scratch/kept-scratch.test-fixture.code.ts"

const ROOT = "AKASHA_ROOT"

const WHO = [
  "-c",
  "user.name=one",
  "-c",
  "user.email=one@example.com",
  "-c",
  "commit.gpgsign=false",
]

export type World = {
  readonly held: string
  readonly akasha: string
  readonly fork: string
  readonly sibling: string
  readonly inside: string
  readonly nested: string
  readonly outside: string
  readonly link: string
  readonly plain: string
  readonly gone: string
}

function repositoryAt(at: string): string {
  mkdirSync(at, { recursive: true })
  ran(["git", "init", "-q", "-b", "main", at])
  ran(["git", "-C", at, ...WHO, "commit", "-q", "--allow-empty", "-m", "one"])
  return at
}

function worldAt(): World {
  const held = realpathSync(keptAt("block-git-writes-"))
  const akasha = repositoryAt(join(held, "akasha"))
  const inside = join(akasha, "inside")
  const nested = join(akasha, ".git", "trees", "one")
  const outside = join(held, "outside")
  const link = join(held, "link-into-akasha")
  const plain = join(held, "no-repository")
  mkdirSync(inside, { recursive: true })
  mkdirSync(plain, { recursive: true })
  ran(["git", "-C", akasha, "worktree", "add", "-q", "--detach", nested])
  ran(["git", "-C", akasha, "worktree", "add", "-q", "--detach", outside])
  symlinkSync(inside, link)
  return {
    held,
    akasha,
    fork: repositoryAt(join(held, "fork")),
    sibling: repositoryAt(join(held, "akasha-something")),
    inside,
    nested,
    outside,
    link,
    plain,
    gone: join(held, "not-there"),
  }
}

export const AT = worldAt()

let stated: string | undefined

export function statingAkasha(): undefined {
  stated = process.env[ROOT]
  process.env[ROOT] = AT.akasha
  return undefined
}

export function restoringAkasha(): undefined {
  process.env[ROOT] = stated ?? ""
  return undefined
}
