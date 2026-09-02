import { basename, resolve } from "node:path"
import { digestOf, followFiles } from "../file-following/file-following.module.code.ts"
import { localClosure, REACHED_CEILING } from "../service-reaching/service-reaching.module.code.ts"
import { RESTART_EXIT } from "../unit-writing/unit-writing.module.code.ts"

const KILL_CEILING_MS = 10_000
const REFUSED_EXIT = 2
const NAMED_AT_MOST = 5
const OWN_ENTRY =
  "akasha/service-system/workstation-services/service-wrapping/service-wrapping.module.code.ts"

export type Wrapping = {
  readonly root: string
  readonly command: readonly string[]
}

export function commandIn(argv: readonly string[]): readonly string[] {
  const mark = argv.indexOf("--")
  return mark === -1 ? argv : argv.slice(mark + 1)
}

export function entryIn(command: readonly string[]): string | null {
  for (const one of command) if (one.endsWith(".ts")) return one
  return null
}

export function namedIn(moved: readonly string[], root: string): string {
  const named = moved.slice(0, NAMED_AT_MOST).map((at) => at.replace(`${root}/`, ""))
  const rest = moved.length > NAMED_AT_MOST ? ` and ${moved.length - NAMED_AT_MOST} more` : ""
  return `${named.join(", ")}${rest}`
}

export function rootOf(): string {
  const stated = process.env.AKASHA_ROOT
  return stated === undefined || stated === "" ? process.cwd() : stated
}

const CODE_FILE = /\.(ts|tsx|mts|cts)$/
const PARSE_CEILING_MS = 60_000
const PARSE_POLL_MS = 1_000

export function unparsedIn(unscanned: readonly string[]): readonly string[] {
  return unscanned.filter((at) => CODE_FILE.test(at))
}

export async function wrapping(given: Wrapping): Promise<number> {
  const entryRel = entryIn(given.command)
  if (entryRel === null) {
    process.stderr.write(
      `service-wrapping: \`${given.command.join(" ")}\` names no \`.ts\` entry to follow\n`
    )
    return REFUSED_EXIT
  }

  const root = given.root
  const says = `[wrapper ${basename(entryRel, ".ts")}]`
  const under = (at: string): string => at.replace(`${root}/`, "")

  const own = localClosure(resolve(root, OWN_ENTRY), root)
  let service = localClosure(resolve(root, entryRel), root)
  let unparsed = unparsedIn(service.unscanned)

  if (unparsed.length > 0) {
    const waitedOn = namedIn(unparsed, root)
    const seconds = PARSE_CEILING_MS / 1_000
    process.stderr.write(
      `${says} ${waitedOn} does not parse, so it is waited on for up to ${seconds}s\n`
    )
    const until = Date.now() + PARSE_CEILING_MS
    while (unparsed.length > 0 && Date.now() < until) {
      await Bun.sleep(PARSE_POLL_MS)
      service = localClosure(resolve(root, entryRel), root)
      unparsed = unparsedIn(service.unscanned)
    }
    process.stderr.write(
      unparsed.length === 0
        ? `${says} ${waitedOn} parses now, so what it imports is followed\n`
        : `${says} ${waitedOn} still does not parse, so it is run on as it is\n`
    )
  }

  for (const at of service.unscanned) {
    process.stderr.write(
      `${says} ${under(at)} could not be scanned, so what it imports is not followed\n`
    )
  }
  for (const one of service.unresolved) {
    process.stderr.write(
      `${says} ${under(one.file)} imports \`${one.path}\`, which resolves to no file, so nothing behind it is followed\n`
    )
  }
  if (service.stopped) {
    process.stderr.write(
      `${says} stopped at ${REACHED_CEILING} file(s), which is the ceiling; what stands past it is not followed\n`
    )
  }

  const reached = new Set<string>([...own.files, ...service.files])
  const before = digestOf(reached)

  const child = Bun.spawn([...given.command], {
    cwd: root,
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  })

  let restarting = false
  process.stdout.write(`${says} following ${reached.size} file(s)\n`)

  const following = followFiles(
    reached,
    (moved) => {
      if (restarting) return
      restarting = true
      process.stderr.write(
        `${says} ${namedIn(moved, root)} moved; restarting so it runs on what stands\n`
      )
      following.stop()
      child.kill("SIGTERM")
      setTimeout(() => child.kill("SIGKILL"), KILL_CEILING_MS)
    },
    undefined,
    before
  )

  for (const at of following.unfollowed) {
    process.stderr.write(
      `${says} ${under(at)} could not be watched, so what stands in it is not followed\n`
    )
  }

  for (const signal of ["SIGTERM", "SIGINT"] as const) {
    process.on(signal, () => {
      following.stop()
      child.kill(signal)
    })
  }

  const code = await child.exited
  return restarting ? RESTART_EXIT : code
}

if (import.meta.main) {
  const command = commandIn(process.argv.slice(2))
  if (command.length === 0) {
    process.stderr.write("service-wrapping: name the command to run, after `--`\n")
    process.exit(REFUSED_EXIT)
  }
  process.exit(await wrapping({ root: rootOf(), command }))
}
