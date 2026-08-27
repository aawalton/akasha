export const summary = "Ripgrep over one repository or all of them"

import { spawn } from "node:child_process"
import { resolveRoots } from "../../../repo/roots/roots.ts"
import { SEARCH_HELP } from "../../../agent/search-help.ts"
import {
  admits,
  type Budget,
  fresh,
  listed,
  parse,
  type Place,
  pointed,
  reach,
  REPOS_NAMED,
  RG_DEFAULTS,
} from "../../../agent/search-run.ts"

const HELP_FLAGS: readonly string[] = ["--help", "-h"]

const RIPGREP_REFUSED = 2

let closed = false

process.stdout.on("error", (err: Error & { code?: string }) => {
  if (err.code === "EPIPE") closed = true
})

function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
}

function operational(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(3)
}

async function ripgrep(): Promise<string> {
  try {
    return (await import("@vscode/ripgrep")).rgPath
  } catch {
    return operational(
      "`@vscode/ripgrep` resolves to nothing from this repo, so there is no ripgrep here to run — " +
        "`bun install` in the akasha repo puts it back"
    )
  }
}

function runOne(rg: string, place: Place, rest: readonly string[], budget: Budget): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const child = spawn(rg, [...RG_DEFAULTS, ...rest, place.at], {
      stdio: ["ignore", "pipe", "inherit"],
      cwd: place.from,
    })
    let carry = ""
    const take = (text: string): void => {
      if (closed) {
        child.kill("SIGTERM")
        return
      }
      if (budget.stopped) return
      carry += text
      for (let at = carry.indexOf("\n"); at !== -1; at = carry.indexOf("\n")) {
        const line = carry.slice(0, at)
        carry = carry.slice(at + 1)
        if (!admits(budget, line)) {
          child.kill("SIGTERM")
          return
        }
        process.stdout.write(`${line}\n`)
      }
    }
    child.stdout?.on("data", (chunk: Buffer) => {
      take(chunk.toString())
    })
    child.on("error", (err: Error) => {
      reject(err)
    })
    child.on("close", (code) => {
      if (!closed && !budget.stopped && carry !== "" && admits(budget, carry))
        process.stdout.write(`${carry}\n`)
      resolve(code ?? 0)
    })
  })
}

function trailer(
  budget: Budget,
  reached: readonly string[],
  missed: readonly string[],
  refused: boolean
): readonly string[] {
  const unreached = missed.length === 0 ? [] : [`search: never looked at ${listed(missed)}`]
  if (budget.stopped) {
    return [
      `search: stopped at ${budget.lines} line(s), which is the ceiling this prints to, so what stands ` +
        "above is the front of the answer rather than the answer",
      ...unreached,
      "search: narrow it with a glob (-g), a file type (-t), a path or --repo, and run it again",
    ]
  }
  if (refused) {
    return [`search: ripgrep refused what it was given, above, so ${listed(reached)} was left unsearched`, ...unreached]
  }
  if (budget.lines === 0) return [`search: nothing matched in ${listed(reached)}`]
  return [`search: ${budget.lines} line(s) from ${listed(reached)}`]
}

export const help = {
  description: SEARCH_HELP,
  positionals: [
    {
      name: "pattern",
      description: "Ripgrep's own pattern. Absent only where `-e` or `-f` supplies one.",
    },
    {
      name: "path",
      required: false,
      variadic: true,
      description: "Search here instead of the repositories. Refused alongside `--repo`.",
    },
  ],
  flags: [
    {
      name: "--repo",
      argLabel: "<name>",
      valueShape: "token" as const,
      repeat: true,
      description:
        `Which repository to search: ${REPOS_NAMED}. Defaults to every one of them that is ` +
        "on disk. Refused alongside a path.",
    },
  ],
  exits: [
    { code: 0, meaning: "the search ran, whether or not anything matched" },
    { code: 1, meaning: "input error, or ripgrep refused the pattern or a flag it was given" },
    { code: 3, meaning: "ripgrep could not be run" },
  ],
}

export default async function search(argv: readonly string[]): Promise<void> {
  if (argv.some((one) => HELP_FLAGS.includes(one))) return
  const parsed = parse(argv)
  if (!parsed.ok) fail(parsed.why)
  if (parsed.rest.length === 0) {
    fail("nothing was given to search for — the first argument is ripgrep's pattern")
  }
  const { searching, absent } =
    parsed.paths.length > 0 ? pointed(parsed.paths) : reach(parsed.repos, resolveRoots())
  if (searching.length === 0) {
    fail(`${listed(absent)} names nothing on disk here, so there is nothing to search`)
  }

  const rg = await ripgrep()
  const budget = fresh()
  const reached: string[] = []
  let refused = false
  for (const one of searching) {
    if (budget.stopped || closed) break
    reached.push(one.name)
    let code = 0
    try {
      code = await runOne(rg, one, parsed.rest, budget)
    } catch (err) {
      operational(`${rg} could not be run: ${err instanceof Error ? err.message : String(err)}`)
    }
    if (code === RIPGREP_REFUSED) {
      refused = true
      break
    }
  }

  const missed = searching.filter((one) => !reached.includes(one.name)).map((one) => one.name)
  const asked = parsed.repos.length > 0 || parsed.paths.length > 0
  const report = [
    ...trailer(budget, reached, missed, refused),
    ...(asked && absent.length > 0
      ? [`search: ${listed(absent)} was asked for and stands nowhere on disk here`]
      : []),
  ]
  process.stderr.write(`${report.join("\n")}\n`)
  if (refused) process.exitCode = 1
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.some((one) => HELP_FLAGS.includes(one))) {
    process.stdout.write(
      "This is the search command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops search --help`.\n"
    )
  } else {
    await search(own)
  }
}
