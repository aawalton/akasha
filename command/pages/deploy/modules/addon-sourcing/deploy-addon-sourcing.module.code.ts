import { createHash } from "node:crypto"
import { relative } from "node:path"
import { testNamed } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import {
  readingAt,
  underFolder,
} from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import { ADDON_BUILD_REL_ROOT } from "akasha/temper/addon/build/modules/addon-compiler-config/addon-compiler-config.module.code.ts"
import { compilerPackage } from "akasha/temper/addon/build/modules/lua-build-command/lua-build-command.module.code.ts"
import { listAllAddons } from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"

const APART = "\0"

const TAB = "\t"

const BLOB_AT = 2

const TEMPER_HEAD = "temper/"

const DECLARED = ".type-declaration.d.ts"

const CODE = ".ts"

const SETTINGS = ["tsconfig.base.json", "bun.lock"]

function blobsAt(root: string, commit: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of said(root, ["ls-tree", "-r", "-z", commit]).split(APART)) {
    const at = one.indexOf(TAB)
    if (at < 0) continue
    found.set(one.slice(at + 1), one.slice(0, at).split(" ")[BLOB_AT] ?? "")
  }
  return found
}

function notATest(path: string): boolean {
  return !testNamed(path)
}

function addonSourcesAt(root: string, commit: string): readonly string[] {
  const reading = readingAt(root, commit)
  const tracked = reading.tracked
  const addons = listAllAddons({ repoRoot: root }).flatMap((one) =>
    underFolder(tracked, relative(root, one.dir))
  )
  const code = addons.filter((one) => one.endsWith(CODE) && notATest(one))
  const held = [
    ...addons,
    ...tracked.filter((one) => one.startsWith(TEMPER_HEAD) && one.endsWith(DECLARED)),
    ...underFolder(tracked, ADDON_BUILD_REL_ROOT).filter(notATest),
    ...underFolder(tracked, compilerPackage()).filter(notATest),
    ...SETTINGS,
    ...reading.over(code, notATest),
  ]
  return [...new Set(held)].sort()
}

export function addonSourceHash(root: string, commit: string): string {
  const blobs = blobsAt(root, commit)
  const lines = addonSourcesAt(root, commit).map((one) => `${one}${TAB}${blobs.get(one) ?? ""}`)
  return createHash("sha256").update(lines.join("\n")).digest("hex")
}
