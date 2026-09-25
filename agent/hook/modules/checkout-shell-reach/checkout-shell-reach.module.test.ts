import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Shown,
  shellShows,
} from "akasha/agent/hook/modules/checkout-shell-reach/checkout-shell-reach.module.code.ts"
import { insideOf } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "one/held.ts"

const INDEXED = join(INDEX_AT, "one.jsonl")

function worldAt(): string {
  const root = realpathSync(scratch.rootFor("checkout-shell-"))
  for (const at of [HELD, INDEXED, "one/other.ts"]) {
    mkdirSync(join(root, at, ".."), { recursive: true })
    writeFileSync(join(root, at), "needle\n")
  }
  return root
}

function awayAt(): string {
  const away = realpathSync(scratch.rootFor("checkout-shell-away-"))
  writeFileSync(join(away, "held.ts"), "needle\n")
  return away
}

function shows(command: string, root: string, from: string = root): Shown | null {
  return shellShows(command, from, root, (at) => insideOf(join(root, INDEX_AT), at))
}

test("a reader naming a file inside the checkout shows its body", () => {
  const root = worldAt()
  for (const said of [
    `cat ${HELD}`,
    `head -n 5 ${HELD}`,
    `tail ${HELD}`,
    `sed -n 1,5p ${HELD}`,
    `less ${HELD}`,
    `cat < ${HELD}`,
    `bash -c 'cat ${HELD}'`,
  ]) {
    expect(shows(said, root)).toEqual({ how: "read", by: expect.any(String), at: join(root, HELD) })
  }
})

test("a reader is judged by where its path lands, from wherever the call runs", () => {
  const root = worldAt()
  const away = awayAt()
  expect(shows(`cat ${join(root, HELD)}`, root, away)?.at).toBe(join(root, HELD))
  expect(shows("cd one && cat held.ts", root)?.at).toBe(join(root, HELD))
  expect(shows("cat one/*.ts", root)?.how).toBe("read")
})

test("a search showing lines inside the checkout is a search", () => {
  const root = worldAt()
  for (const said of [
    "rg needle",
    "rg needle one",
    "grep -rn needle .",
    `grep needle ${HELD}`,
    "git grep needle",
  ]) {
    expect(shows(said, root)?.how).toBe("search")
  }
})

test("a search showing only paths, and one reading what it is fed, show nothing", () => {
  const root = worldAt()
  for (const said of [
    "rg -l needle",
    "rg --files",
    "rg -c needle one",
    `grep -l needle ${HELD}`,
    "grep -rl needle .",
    "git grep -l needle",
    "grep needle",
    "echo needle | grep needle",
  ]) {
    expect(shows(said, root)).toBeNull()
  }
})

test("paths and counts, and git's state and history, show no body", () => {
  const root = worldAt()
  for (const said of [
    "ls one",
    `wc -l ${HELD}`,
    "find . -name '*.ts'",
    "git status",
    "git log",
    "git log -p",
    "git show",
    "git diff --stat",
    "git diff HEAD~1 HEAD",
    "git diff main...other",
    `git show HEAD~1:${HELD}`,
  ]) {
    expect(shows(said, root)).toBeNull()
  }
})

test("git showing a checkout file's body at HEAD, in the index or in the tree is a read", () => {
  const root = worldAt()
  expect(shows(`git show HEAD:${HELD}`, root)?.at).toBe(join(root, HELD))
  expect(shows(`git show :${HELD}`, root)?.how).toBe("read")
  expect(shows(`git cat-file -p HEAD:${HELD}`, root)?.how).toBe("read")
  expect(shows(`git blame ${HELD}`, root)?.at).toBe(join(root, HELD))
  expect(shows("git diff", root)?.how).toBe("read")
  expect(shows("git diff HEAD", root)?.how).toBe("read")
  expect(shows(`git diff -- ${HELD}`, root)?.at).toBe(join(root, HELD))
})

test("a reader fed names by a search over the checkout shows their bodies", () => {
  const root = worldAt()
  expect(shows("rg -l needle | xargs cat", root)?.how).toBe("read")
  expect(shows(`rg -l needle ${awayAt()} | xargs cat`, root)).toBeNull()
})

test("reads outside the checkout, of the index, and akasha's own calls show nothing", () => {
  const root = worldAt()
  const away = awayAt()
  for (const said of [
    `cat ${join(away, "held.ts")}`,
    `rg needle ${away}`,
    `cat ${INDEXED}`,
    `akasha read --file-path ${HELD}`,
    "akasha search needle",
    `cat > ${HELD} <<'EOF'`,
  ]) {
    expect(shows(said, root)).toBeNull()
  }
})

test("a search over a folder holding the checkout reaches it", () => {
  const root = worldAt()
  expect(shows(`rg needle ${join(root, "..")}`, root)?.how).toBe("search")
})
