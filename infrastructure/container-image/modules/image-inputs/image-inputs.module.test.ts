import { afterAll, expect, test } from "bun:test"
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  stampIn,
  treeIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import { buildOf } from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import {
  copiedIn,
  driftedIn,
  inAWorkTree,
  inputsFor,
} from "akasha/infrastructure/container-image/modules/image-inputs/image-inputs.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const PROXY = buildOf("auth-proxy")

const KEPT = "kept.txt"

const AT_ONE = "one\n"

const AT_TWO = "two\n"

const TAG_LENGTH = 12

const COPIES_KEPT = {
  slug: "copies-kept",
  repository: "cluster/copies-kept",
  context: "",
  recipe: "Dockerfile",
  dockerfile: ["FROM alpine:3.21", `COPY --link ${KEPT} ./`, ""].join("\n"),
}

const SCRATCH = mkdtempSync("/var/tmp/image-inputs-")

afterAll(() => rmSync(SCRATCH, { recursive: true, force: true }))

function repoMade(name: string): string {
  const root = join(SCRATCH, name)
  mkdirSync(root, { recursive: true })
  said(root, ["init", "--quiet"])
  said(root, ["config", "user.email", "held@akasha"])
  said(root, ["config", "user.name", "held"])
  said(root, ["config", "commit.gpgsign", "false"])
  return root
}

function committed(root: string, text: string, name: string): string {
  writeFileSync(join(root, KEPT), text)
  said(root, ["add", "--", KEPT])
  said(root, ["commit", "--quiet", "-m", name, "--", KEPT])
  return said(root, ["rev-parse", "HEAD"]).trim()
}

function exportedAt(root: string, kind: string, text: string): string {
  const at = treeIn(root, kind)
  if (at === null) throw new Error(`git names no folder under ${root}`)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, KEPT), text)
  return at
}

function hashAt(root: string, commit: string): string {
  const summed = createHash("sha256")
  summed.update(COPIES_KEPT.dockerfile)
  summed.update(said(root, ["ls-tree", "-r", commit, "--", KEPT]))
  return summed.digest("hex").slice(0, TAG_LENGTH)
}

const CHECKOUT = repoMade("checkout")

const ONE = committed(CHECKOUT, AT_ONE, "one")

const TWO = committed(CHECKOUT, AT_TWO, "two")

const AT_ONE_HASH = hashAt(CHECKOUT, ONE)

const AT_TWO_HASH = hashAt(CHECKOUT, TWO)

const PINNED = exportedAt(CHECKOUT, "pinned", AT_ONE)

const UNSTAMPED = exportedAt(CHECKOUT, "unstamped", AT_TWO)

const BLANK = exportedAt(CHECKOUT, "blank", AT_TWO)

const SHUT = exportedAt(CHECKOUT, "shut", AT_TWO)

writeFileSync(stampIn(PINNED), `${ONE}\n`)

writeFileSync(stampIn(BLANK), "  \n")

mkdirSync(stampIn(SHUT))

const COPIES_NOTHING = {
  slug: "copies-nothing",
  repository: "cluster/copies-nothing",
  context: "",
  recipe: "Dockerfile",
  dockerfile: ["FROM alpine:3.21", "RUN apk add --no-cache jq", ""].join("\n"),
}

const SAMPLE = [
  "FROM oven/bun AS build",
  "COPY --link bun.lock ./",
  "COPY --link one/two ./one/two",
  "FROM oven/bun",
  "COPY --link --from=build /workspace/one/two ./one/two",
  'CMD ["bun"]',
].join("\n")

test("what the context is copied from is read off the Dockerfile", () => {
  expect(copiedIn(SAMPLE)).toEqual(["bun.lock", "one/two"])
})

test("a path a second stage copies is left out", () => {
  expect(copiedIn(SAMPLE)).not.toContain("/workspace/one/two")
})

test("the authenticating proxy's inputs hash to twelve hex characters", () => {
  expect(inputsFor(PROXY).hash).toMatch(/^[0-9a-f]{12}$/)
})

test("the same inputs hash the same twice over", () => {
  expect(inputsFor(PROXY).hash).toBe(inputsFor(PROXY).hash)
})

test("what the proxy is built from carries the lockfile and its own folder", () => {
  const copied = inputsFor(PROXY).copied
  expect(copied).toContain("bun.lock")
  expect(copied).toContain("infrastructure/network/auth-proxy")
})

test("a Dockerfile copying nothing hashes on its own text", () => {
  expect(inputsFor(COPIES_NOTHING).hash).toMatch(/^[0-9a-f]{12}$/)
})

test("a Dockerfile copying nothing names no input", () => {
  expect(inputsFor(COPIES_NOTHING).copied).toEqual([])
})

test("two Dockerfiles copying nothing hash apart where their text differs", () => {
  const other = { ...COPIES_NOTHING, dockerfile: `${COPIES_NOTHING.dockerfile}RUN apk add curl\n` }
  expect(inputsFor(other).hash).not.toBe(inputsFor(COPIES_NOTHING).hash)
})

test("an image copying nothing drifts in nothing", () => {
  expect(driftedIn([])).toEqual([])
})

test("a checkout is a work tree", () => {
  expect(inAWorkTree(akashaRoot())).toBe(true)
})

test("the folder git keeps a checkout's own records in is no work tree", () => {
  expect(inAWorkTree(join(akashaRoot(), ".git"))).toBe(false)
})

test("a folder that is no work tree drifts in nothing", () => {
  expect(driftedIn(["bun.lock"], join(akashaRoot(), ".git"))).toEqual([])
})

test("a tree pinned at a commit is read at that commit", () => {
  expect(inputsFor(COPIES_KEPT, PINNED).hash).toBe(AT_ONE_HASH)
})

test("a tree pinned at a commit is not read at the head its checkout is at", () => {
  expect(inputsFor(COPIES_KEPT, PINNED).hash).not.toBe(AT_TWO_HASH)
})

test("the two commits hash apart, so reading the wrong one shows", () => {
  expect(ONE).not.toBe(TWO)
  expect(AT_ONE_HASH).not.toBe(AT_TWO_HASH)
})

test("a pinned tree is no work tree, and the head it falls through to is its checkout's", () => {
  expect(inAWorkTree(PINNED)).toBe(false)
  expect(said(PINNED, ["rev-parse", "HEAD"]).trim()).toBe(TWO)
})

test("a checkout with no stamp is read at its own head", () => {
  expect(existsSync(stampIn(CHECKOUT))).toBe(false)
  expect(inputsFor(COPIES_KEPT, CHECKOUT).hash).toBe(AT_TWO_HASH)
})

test("a tree with no stamp is read at its own head", () => {
  expect(inputsFor(COPIES_KEPT, UNSTAMPED).hash).toBe(AT_TWO_HASH)
})

test("a stamp holding nothing is read at the folder's own head", () => {
  expect(inputsFor(COPIES_KEPT, BLANK).hash).toBe(AT_TWO_HASH)
})

test("a stamp nothing can read is read at the folder's own head", () => {
  expect(inputsFor(COPIES_KEPT, SHUT).hash).toBe(AT_TWO_HASH)
})

test("an image copying nothing is answered where no git would answer at all", () => {
  const nowhere = join(SCRATCH, "no-repository")
  mkdirSync(nowhere, { recursive: true })
  expect(inputsFor(COPIES_NOTHING, nowhere).hash).toBe(inputsFor(COPIES_NOTHING).hash)
})
