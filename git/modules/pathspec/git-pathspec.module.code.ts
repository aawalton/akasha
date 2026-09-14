import { git, ranGit as ran } from "akasha/git/modules/capping/git-capping.module.code.ts"

const ROOT = "."

export function gitIgnoring(root: string, paths: readonly string[]): ReadonlySet<string> | null {
  if (paths.length === 0) return new Set()
  const proc = ran(root, ["check-ignore", "--stdin", "-z"], {
    input: new TextEncoder().encode(paths.join("\0")),
  })
  if (proc.code !== 0 && proc.code !== 1) return null
  return new Set(
    new TextDecoder()
      .decode(proc.stdout)
      .split("\0")
      .filter((one) => one !== "")
  )
}

function listedUnder(
  root: string,
  folder: string,
  asked: readonly string[]
): readonly string[] | null {
  const got = git(root, ["ls-files", "-z", ...asked, "--", folder === "" ? ROOT : folder])
  if (got.code !== 0) return null
  return got.stdout.split("\0").filter((one) => one !== "")
}

export function trackedUnder(root: string, folder: string): readonly string[] | null {
  return listedUnder(root, folder, ["--cached"])
}

export function ignoredUnder(root: string, folder: string): readonly string[] | null {
  return listedUnder(root, folder, ["--others", "--ignored", "--exclude-standard"])
}
