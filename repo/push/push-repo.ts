import { git } from "@akasha/git/git-capping"
import { pushBranch, remoteOf } from "@akasha/git/git-pushing"
import { releasePushLock, takePushLock, writePushState } from "./push.ts"

const PUSH_CEILING_MS = 120_000

const RETRY_PAUSE_MS = 2_000

const ROUNDS = 8

const HELP = `bun ~/repos/akasha/repo/push/push-repo.ts — carry this repository's commits to its remote

The gated write commands hand off to this and return, because a write is durable at its
commit and nothing an agent runs should wait on a remote. It is started detached, so its
output goes nowhere: what it leaves behind is \`harness-push.state\` in the git common
directory, which the next gated write reads and reports.

ONE PUSHER PER REPOSITORY. A second one started while the first is working exits at once
rather than queueing, because the one already pushing re-reads HEAD after each round and
carries whatever landed while it worked. That is also why a push that fails is not the
last word: the next write hands off again.

The ceiling here is ${PUSH_CEILING_MS / 1000}s rather than the 10s a gated write allows itself, since
nothing is waiting on this one and a server-side hook can hold a push open for far longer
than a person would sit through.

Usage:
  bun ~/repos/akasha/repo/push/push-repo.ts [--root <path>]

Flags:
  --root <path>  The checkout to push. Defaults to the working directory.
  --help         This.

Exit codes:
  0  the remote holds this branch, or another pusher already has it
  1  the push failed twice; the reason stands in harness-push.state
`

function parse(argv: readonly string[]): string {
  let root = process.cwd()
  for (let at = 0; at < argv.length; at++) {
    const arg = argv[at]
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(HELP)
      process.exit(0)
    }
    if (arg === "--root") {
      const value = argv[at + 1]
      if (value === undefined) {
        process.stderr.write("--root takes a path\n")
        process.exit(1)
      }
      root = value
      at++
      continue
    }
    process.stderr.write(`\`${arg}\` is not an argument this takes — run it with --help\n`)
    process.exit(1)
  }
  return root
}

function nowIso(): string {
  return new Date().toISOString()
}

async function carry(root: string): Promise<number> {
  const remote = remoteOf(root)
  if (remote === null) return 0
  for (let round = 0; round < ROUNDS; round++) {
    const head = git(root, ["rev-parse", "HEAD"])
    if (head.code !== 0) {
      writePushState(root, {
        at: nowIso(),
        sha: null,
        ok: false,
        reason: `could not read HEAD: ${head.stderr}`,
        remote,
      })
      return 1
    }
    let outcome = pushBranch(root, PUSH_CEILING_MS)
    if (outcome.failed) {
      await Bun.sleep(RETRY_PAUSE_MS)
      outcome = pushBranch(root, PUSH_CEILING_MS)
    }
    if (outcome.failed) {
      writePushState(root, {
        at: nowIso(),
        sha: head.stdout,
        ok: false,
        reason: outcome.reason,
        remote,
      })
      return 1
    }
    writePushState(root, { at: nowIso(), sha: head.stdout, ok: true, reason: null, remote })
    const now = git(root, ["rev-parse", "HEAD"])
    if (now.code !== 0 || now.stdout === head.stdout) return 0
  }
  return 0
}

async function main(): Promise<void> {
  const root = parse(process.argv.slice(2))
  if (!takePushLock(root)) return
  let code = 0
  try {
    code = await carry(root)
  } finally {
    releasePushLock(root)
  }
  process.exit(code)
}

if (import.meta.main) await main()
