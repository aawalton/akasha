import { describe, expect, test } from "bun:test"
import {
  scanPorcelainStatusBoundary,
  scanPorcelainStatusBoundaryText,
} from "./porcelain-status-boundary.ts"

const scan = (src: string) => scanPorcelainStatusBoundary("a.ts", src)

describe("clause 1 — a git status invocation may not spell a machine-format flag", () => {
  test("fires on the argv shape every corrupted parser used", () => {
    const v = scan(`const r = await runGit(["status", "--porcelain"], root)`)
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("unsanctioned-flag")
  })

  test("fires when the flags are spread across lines, as a formatted argv is", () => {
    const v = scan(`runGitCapture(root, [
      "status",
      "--porcelain",
      "--untracked-files=all",
    ])`)
    expect(v).toHaveLength(1)
  })

  test("fires on a spawn that names the binary separately", () => {
    expect(scan(`spawnSync("git", ["status", "--porcelain"], opts)`)).toHaveLength(1)
    expect(scan(`runCmd(["git", "status", "--short"], root)`)).toHaveLength(1)
  })

  test("fires on porcelain=v2, which dodges the trim rather than removing it", () => {
    expect(scan(`await runGit(["status", "--porcelain=v2"], root)`)).toHaveLength(1)
  })

  test("fires on every version suffix git parses, not only the `v` ones", () => {
    expect(scan(`await runGit(["status", "--porcelain=1"], root)`)).toHaveLength(1)
    expect(scan(`await runGit(["status", "--porcelain=2"], root)`)).toHaveLength(1)
    expect(scan('const s = `git -C "${root}" status --porcelain=1`')).toHaveLength(1)
  })

  test("fires on an abbreviated long flag, which git resolves to the full one", () => {
    expect(scan(`await runGit(["status", "--por"], root)`)).toHaveLength(1)
    expect(scan(`await runGit(["status", "--po=2"], root)`)).toHaveLength(1)
    expect(scan(`await runGit(["status", "--shor"], root)`)).toHaveLength(1)
    expect(scan('const s = `git -C "${root}" status --por`')).toHaveLength(1)
  })

  test("fires on a short flag bundled with others, which git also accepts", () => {
    expect(scan(`await runGit(["status", "-sb"], root)`)).toHaveLength(1)
    expect(scan(`await runGit(["status", "-zs"], root)`)).toHaveLength(1)
  })

  test("ignores a status read whose flags are not a machine format", () => {
    expect(scan(`await runGit(["status", "--long"], root)`)).toEqual([])
    expect(scan(`await runGit(["status", "--no-porcelain"], root)`)).toEqual([])
    expect(scan(`await runGit(["status", "-b", "-z"], root)`)).toEqual([])
    expect(scan(`await runGit(["status", "--untracked-files=all"], root)`)).toEqual([])
  })

  test("ignores a machine-format flag belonging to a later command on the line", () => {
    expect(scanPorcelainStatusBoundaryText("s.sh", "git status && git diff --short")).toEqual([])
  })

  test("fires on a shell string built for a remote host", () => {
    const v = scan('const s = `git -C "${root}" status --porcelain`')
    expect(v).toHaveLength(1)
  })

  test("fires on a tagged-template shell invocation", () => {
    const v = scan("const r = await $`git -C ${root} status --porcelain`.quiet()")
    expect(v).toHaveLength(1)
  })

  test("ignores --porcelain on commands that are not status", () => {
    expect(scan(`await runGit(["push", "--porcelain", "origin"], root)`)).toEqual([])
    expect(scan(`await runGit(["worktree", "list", "--porcelain"], root)`)).toEqual([])
  })

  test("ignores a status read with no machine-format flag", () => {
    expect(scan(`await runGit(["status"], root)`)).toEqual([])
  })

  test("ignores an unrelated array that happens to hold the word status", () => {
    expect(scan(`const cols = ["status", "path", "seq"]`)).toEqual([])
  })

  test("passes the sanctioned acquisition", () => {
    const v = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const r = await runGitRaw([...PORCELAIN_STATUS_ARGS], root)
      const parsed = parsePorcelainStatusZ(r.stdout)
    `)
    expect(v).toEqual([])
  })

  test("passes a caller that goes through the effectful reader", () => {
    const v = scan(`
      import { readPorcelainStatus } from "@infra/git-cli/lib/porcelain-status"
      const r = await readPorcelainStatus(root, { untrackedFiles: "no" })
    `)
    expect(v).toEqual([])
  })
})

describe("clause 2 — the sanctioned argv may not be taken without the boundary parse", () => {
  test("fires when a caller uses the argv and then hand-rolls the offsets", () => {
    const v = scan(`
      import { PORCELAIN_STATUS_ARGS } from "@infra/git-porcelain/parse-status"
      const r = await runGit([...PORCELAIN_STATUS_ARGS], root)
      const paths = r.stdout.split("\\n").map((l) => l.slice(3))
    `)
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("argv-without-parse")
  })

  test("does not fire when the parse is reached", () => {
    const v = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const r = await runGitRaw([...PORCELAIN_STATUS_ARGS], root)
      if (parsePorcelainStatusZ(r.stdout).ok) return
    `)
    expect(v).toEqual([])
  })

  test("fires on the acquisition even where the file names a parser for something else", () => {
    const v = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      export const reparse = (s: string) => parsePorcelainStatusZ(s)
      const r = await runGit([...PORCELAIN_STATUS_ARGS], root)
      const paths = r.stdout.split("\\0").map((l) => l.slice(3))
    `)
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("argv-without-parse")
    expect(v[0]?.line).toBe(4)
  })

  test("follows the argv through a local alias to the call that reads it", () => {
    const unparsed = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      export const reparse = (s: string) => parsePorcelainStatusZ(s)
      const args = [...PORCELAIN_STATUS_ARGS]
      const r = await runGit(args, root)
      const paths = r.stdout.slice(3)
    `)
    expect(unparsed).toHaveLength(1)

    const parsed = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const args = [...PORCELAIN_STATUS_ARGS]
      args.push("--untracked-files=no")
      const result = await runGitRaw(args, root)
      const parsed = parsePorcelainStatusZ(result.stdout)
    `)
    expect(parsed).toEqual([])
  })

  test("follows the result through the shapes callers actually use", () => {
    const destructured = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const { stdout, status } = runCapture(root, "git", [...PORCELAIN_STATUS_ARGS])
      const parsed = parsePorcelainStatusZ(stdout)
    `)
    expect(destructured).toEqual([])

    const chained = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const status = await $\`git -C \${root} \${PORCELAIN_STATUS_ARGS}\`.quiet().nothrow()
      const parsed = parsePorcelainStatusZ(status.stdout.toString())
    `)
    expect(chained).toEqual([])

    const unbound = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const parsed = parsePorcelainStatusZ((await runGitRaw([...PORCELAIN_STATUS_ARGS], root)).stdout)
    `)
    expect(unbound).toEqual([])
  })

  test("fires on a destructured or chained result that reaches no parse", () => {
    expect(
      scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      export const reparse = (s: string) => parsePorcelainStatusZ(s)
      const { stdout } = runCapture(root, "git", [...PORCELAIN_STATUS_ARGS])
      const paths = stdout.split("\\0").map((l) => l.slice(3))
    `)
    ).toHaveLength(1)

    expect(
      scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      export const reparse = (s: string) => parsePorcelainStatusZ(s)
      const out = await $\`git -C \${root} \${PORCELAIN_STATUS_ARGS}\`.quiet().nothrow()
      const paths = out.stdout.toString().slice(3)
    `)
    ).toHaveLength(1)
  })

  test("a parse of something else does not absolve the acquisition beside it", () => {
    const v = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      const cached = await readFile(cachePath)
      parsePorcelainStatusZ(cached)
      const r = await runGitRaw([...PORCELAIN_STATUS_ARGS], root)
      const paths = r.stdout.slice(3)
    `)
    expect(v).toHaveLength(1)
  })

  test("falls back to the file for an argv that leaves as text", () => {
    const withParser = scan(`
      import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
      export const script = \`git -C "$HOME/code" \${PORCELAIN_STATUS_ARGS.join(" ")}\`
      export const read = (out: string) => parsePorcelainStatusZ(out)
    `)
    expect(withParser).toEqual([])

    const withoutParser = scan(`
      import { PORCELAIN_STATUS_ARGS } from "@infra/git-porcelain/parse-status"
      export const script = \`git -C "$HOME/code" \${PORCELAIN_STATUS_ARGS.join(" ")}\`
    `)
    expect(withoutParser).toHaveLength(1)
    expect(withoutParser[0]?.kind).toBe("argv-without-parse")
  })
})

describe("shell-script scan", () => {
  test("fires on a status read in a .sh file", () => {
    const v = scanPorcelainStatusBoundaryText(
      "s.sh",
      ["#!/usr/bin/env bash", 'if [ -n "$(git status --porcelain)" ]; then', "  exit 1", "fi"].join(
        "\n"
      )
    )
    expect(v).toHaveLength(1)
    expect(v[0]?.line).toBe(2)
  })

  test("ignores a shell script that reads status without a machine format", () => {
    expect(scanPorcelainStatusBoundaryText("s.sh", "git status")).toEqual([])
  })
})
