export const summary = "List the tracked files under one section of a repository"

import { execFileSync } from "node:child_process"
import { resolve } from "node:path"

export const help = {
  description:
    "Print every tracked file under a section, spelled from the repository root and in the order git holds them. An untracked or ignored file is not listed.",
  positionals: [
    {
      name: "root",
      description: "The section to list. Defaults to the working directory.",
    },
  ],
}

export default async function list(argv: readonly string[]): Promise<void> {
  const at = resolve(argv[0] ?? ".")
  let printed: string
  try {
    printed = execFileSync("git", ["-C", at, "ls-files", "--full-name"], { encoding: "utf8" })
  } catch {
    throw new Error(`${at} is not inside a git repository, so nothing under it is tracked`)
  }
  const paths = printed.split("\n").filter((one) => one !== "")
  if (paths.length === 0) throw new Error(`${at} holds no tracked file`)
  for (const path of paths) console.log(path)
}
