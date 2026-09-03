import { spawn } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  formatProvenance,
  readRunningCheckoutProvenance,
} from "@akasha/checkout-version/provenance"
import {
  EXIT,
  exitCodeForThrowable,
  InputError,
  OperationalError,
} from "@akasha/errors-core/exit-code"
import { normalizeThrowable } from "@akasha/errors-core/throwable-normalizing"
import { everyOfType } from "@akasha/indexes"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import type {
  CommandDocument,
  CommandHelp,
  CommandModule,
  HelpEnvVar,
  HelpExit,
  HelpPositional,
} from "../command-declaring/command-declaring.module.code.ts"
import { HELP_FLAGS, VERSION_FLAG } from "../command-declaring/command-declaring.module.code.ts"
import { expandProseRoutes } from "../prose-routing/prose-routing.module.code.ts"

const PAGE_TYPE = "ops-command"

const HELP_FILE = "ops-help"

const OPS_PATH = "opsPath"

const OPS_ENTRY_FILE = "opsEntryFile"

const OPS_HELP = "opsHelp"

const SLUG = "slug"

const DEFINITION = "definition"

const NAME = "ops"

const HELP_TIMEOUT_MS = 10_000

const NAMED_AT_MOST = 3

// THE ONE TEST THAT SAYS WHERE A COMMAND RUNS. A file declaring a default export is a command
// body: the dispatcher imports it and calls it, so what it writes goes to this process's own
// streams and what it throws reaches the exit code through `exitCodeForThrowable` here. A file
// declaring none is a program: it is spawned with `stdio: "inherit"` and its own exit code is
// passed back. Read off the text rather than by importing, because importing a program to ask
// whether it is one runs everything at its top level.
const RUNS_HERE = /^export default\b/m

export const UNCLASSIFIED_EXIT_HELP: HelpExit = {
  code: EXIT.UNCLASSIFIED,
  meaning:
    "unclassified error: the command threw something the CLI could not classify, so nothing is " +
    "established about what went wrong — not a caller mistake, and not a failure this command " +
    "knows how to have. An unhandled defect. Inherited by every ops command.",
}

interface ErrorEmitter {
  readonly on: (event: "error", listener: (err: NodeJS.ErrnoException) => void) => unknown
}

export function isClosedConsumerWrite(thrown: unknown): boolean {
  return thrown instanceof Error && "code" in thrown && thrown.code === "EPIPE"
}

export function ignoreClosedConsumerWrites(streams: readonly ErrorEmitter[]): undefined {
  for (const stream of streams) {
    stream.on("error", (thrown) => {
      if (isClosedConsumerWrite(thrown)) return
      throw thrown
    })
  }
}

export function provenanceLine(): string {
  return formatProvenance(readRunningCheckoutProvenance())
}

function proseFor(root: string, path: string, held: string | null): string {
  if (held === null || held === "") return ""
  const beside = besideAt(path, HELP_FILE, held)
  if (beside === null) return ""
  const at = join(root, beside)
  if (!existsSync(at)) return ""
  return readFileSync(at, "utf8").trim()
}

/**
 * The ops commands, read off the `ops-command` pages that hold them.
 *
 * This is the whole list. Until 2026-09-03 a second list stood beside it: `tools/ops/declared.ts`
 * walked `tools/commands` and made a command of every file it found, so a file put under that
 * folder became a command with no page anywhere naming it, and a file taken from it dropped a
 * command with nothing to say so. The two agreed exactly — 15 files, 15 pages — when the scan was
 * retired, so retiring it took no command away.
 */
export function opsDocumentsIn(root: string = akashaRoot()): readonly CommandDocument[] {
  const found: CommandDocument[] = []
  for (const one of everyOfType(root, PAGE_TYPE)) {
    const value = valueAt(one.path, root)
    if (value === null) continue
    const invocation = textAt(value, OPS_PATH)
    if (invocation === null || invocation === "") continue
    const help = proseFor(root, one.path, textAt(value, OPS_HELP))
    found.push({
      slug: textAt(value, SLUG) ?? "",
      path: invocation.split(" ").filter((word) => word !== ""),
      entryFile: textAt(value, OPS_ENTRY_FILE) ?? "",
      summary: textAt(value, DEFINITION) ?? "",
      ...(help === "" ? {} : { help }),
    })
  }
  return [...found].sort((one, other) =>
    one.slug < other.slug ? -1 : one.slug > other.slug ? 1 : 0
  )
}

export interface OpsMatch {
  readonly document: CommandDocument
  readonly rest: readonly string[]
}

export function opsMatchIn(
  documents: readonly CommandDocument[],
  tokens: readonly string[]
): OpsMatch | null {
  const candidates = [...documents].sort((one, other) => other.path.length - one.path.length)
  for (const one of candidates) {
    if (one.path.length > tokens.length) continue
    if (one.path.every((part, at) => tokens[at] === part)) {
      return { document: one, rest: tokens.slice(one.path.length) }
    }
  }
  return null
}

export function opsUnder(
  documents: readonly CommandDocument[],
  prefix: readonly string[]
): readonly CommandDocument[] {
  return documents.filter(
    (one) => one.path.length >= prefix.length && prefix.every((part, at) => one.path[at] === part)
  )
}

export function opsPrefixIn(argv: readonly string[]): readonly string[] {
  const prefix: string[] = []
  for (const one of argv) {
    if (HELP_FLAGS.includes(one)) break
    prefix.push(one)
  }
  return prefix
}

export function opsKnownPrefix(
  documents: readonly CommandDocument[],
  prefix: readonly string[]
): readonly string[] {
  for (let take = prefix.length - 1; take > 0; take -= 1) {
    const shorter = prefix.slice(0, take)
    if (opsUnder(documents, shorter).length > 0) return shorter
  }
  return []
}

export function opsListing(
  prefix: readonly string[],
  documents: readonly CommandDocument[]
): string {
  const header =
    prefix.length === 0
      ? `Usage: ${NAME} <command> [flags]`
      : `Usage: ${NAME} ${prefix.join(" ")} <command> [flags]`
  const width = Math.max(0, ...documents.map((one) => one.path.join(" ").length))
  const lines: string[] = [header, "", "Commands:"]
  for (const one of documents) {
    lines.push(`  ${one.path.join(" ").padEnd(width)}  ${one.summary}`)
  }
  lines.push("")
  lines.push(`Run \`${NAME} <command> --help\` for usage of a specific command.`)
  if (prefix.length === 0) {
    lines.push(`Run \`${NAME} --version\` for the checkout and commit answering this invocation.`)
  }
  return lines.join("\n")
}

export function opsEntryAt(root: string, document: CommandDocument): string | null {
  const at = join(root, document.entryFile)
  return existsSync(at) ? at : null
}

export function opsMissingEntryText(root: string, document: CommandDocument): string {
  return (
    `${document.entryFile} is not there under ${root}, so \`${NAME} ${document.path.join(" ")}\` ` +
    `reaches nothing. The page \`${document.slug}\` still names that file: put the file back, ` +
    `or take the page away with the command — and check AKASHA_ROOT names an akasha checkout`
  )
}

export function opsForwardedHelp(
  document: CommandDocument,
  asked: () => Promise<string>
): CommandHelp {
  return {
    description:
      `${document.summary}\n` +
      "\n" +
      `An \`${NAME}\` command reaching \`${document.entryFile}\` in the akasha repository, the file ` +
      `the page \`${document.slug}\` names. Every argument is forwarded verbatim and in order, ` +
      "nothing is parsed or rewritten on the way through, and the exit code is the tool's own " +
      "passed back unchanged. The flags, the exit codes and the refusals are the tool's to state, " +
      "and what it states is printed below.\n" +
      "\n" +
      `\`--help\` and \`-h\` are captured by the \`${NAME}\` dispatcher wherever they appear, so the ` +
      "tool's own help is reached through this block rather than by forwarding the flag.",
    positionals: [
      {
        name: "args",
        required: false,
        variadic: true,
        description: `Forwarded to \`${document.entryFile}\` verbatim.`,
      },
    ],
    envVars: [
      {
        name: "AKASHA_ROOT",
        required: false,
        path: true,
        default: "$HOME/repos/akasha",
        description:
          "Which akasha checkout this command reaches. Passed to the tool explicitly rather than left to it to derive.",
      },
    ],
    epilog: asked,
  }
}

export async function opsHelpText(document: CommandDocument, help: CommandHelp): Promise<string> {
  const full = document.path.join(" ")
  const positionals: readonly HelpPositional[] = help.positionals ?? []
  const flags = expandProseRoutes(help.flags ?? []).flags

  const usage: string[] = [`${NAME} ${full}`]
  for (const one of positionals) usage.push(one.required === false ? `[${one.name}]` : one.name)
  if (flags.length > 0) usage.push("[flags]")

  const lines: string[] = []
  lines.push(`${NAME} ${full} — ${document.summary}`)
  const described = document.help ?? help.description
  if (described != null && described.trim() !== "") {
    lines.push("")
    lines.push(described.trim())
  }
  lines.push("")
  lines.push("Usage:")
  lines.push(`  ${usage.join(" ")}`)

  if (positionals.length > 0) {
    lines.push("")
    lines.push("Arguments:")
    const width = Math.max(...positionals.map((one) => one.name.length))
    for (const one of positionals) {
      const alias = one.aliasOfFlag != null ? ` (alias of \`${one.aliasOfFlag}\`)` : ""
      lines.push(`  ${one.name.padEnd(width)}  ${one.description}${alias}`)
    }
  }

  if (flags.length > 0) {
    lines.push("")
    lines.push("Flags:")
    const labels = flags.map((one) =>
      one.argLabel != null ? `${one.name} ${one.argLabel}` : one.name
    )
    const width = Math.max(...labels.map((one) => one.length))
    for (const [at, one] of flags.entries()) {
      const label = (labels[at] ?? one.name).padEnd(width)
      const tags: string[] = []
      if (one.required) tags.push("required")
      if (one.repeat) tags.push("repeatable")
      if (one.choices) tags.push(`choices: ${one.choices.join("|")}`)
      if (one.default !== undefined) tags.push(`default: ${one.default}`)
      if (one.acceptsStdin) tags.push("accepts stdin via -")
      if (one.aliases && one.aliases.length > 0) tags.push(`aliases: ${one.aliases.join(", ")}`)
      const suffix = tags.length > 0 ? ` (${tags.join(", ")})` : ""
      lines.push(`  ${label}  ${one.description}${suffix}`)
    }
  }

  if (help.mutuallyExclusive && help.mutuallyExclusive.length > 0) {
    lines.push("")
    lines.push("Mutually exclusive:")
    for (const group of help.mutuallyExclusive) lines.push(`  ${group.join(" / ")}`)
  }

  const envVars: readonly HelpEnvVar[] = help.envVars ?? []
  if (envVars.length > 0) {
    lines.push("")
    lines.push("Environment:")
    const width = Math.max(...envVars.map((one) => one.name.length))
    for (const one of envVars) {
      const tags: string[] = []
      if (one.required) tags.push("required")
      if (one.default !== undefined) tags.push(`default: ${one.default}`)
      const suffix = tags.length > 0 ? ` (${tags.join(", ")})` : ""
      lines.push(`  ${one.name.padEnd(width)}  ${one.description}${suffix}`)
    }
  }

  const exits: readonly HelpExit[] = help.exits ?? []
  if (exits.length > 0) {
    lines.push("")
    lines.push("Exit codes:")
    for (const one of [...exits, UNCLASSIFIED_EXIT_HELP]) {
      lines.push(`  ${String(one.code).padEnd(3)}  ${one.meaning}`)
    }
  }

  if (help.examples && help.examples.length > 0) {
    lines.push("")
    lines.push("Examples:")
    for (const one of help.examples) {
      for (const line of one.split("\n")) lines.push(`  ${line}`)
    }
  }

  if (help.epilog != null) {
    const text = typeof help.epilog === "function" ? await help.epilog() : help.epilog
    if (text !== "") {
      lines.push("")
      for (const line of text.split("\n")) lines.push(line)
    }
  }

  return lines.join("\n")
}

export interface FlagSurface {
  readonly path: readonly string[]
  readonly names: readonly string[]
}

function joinAlternatives(parts: readonly string[]): string {
  const last = parts[parts.length - 1] ?? ""
  if (parts.length <= 1) return last
  if (parts.length === 2) return `${parts[0]} or ${last}`
  return `${parts.slice(0, -1).join(", ")}, or ${last}`
}

export function opsSiblingHint(
  flagName: string,
  siblings: readonly FlagSurface[]
): string | undefined {
  const invocations = siblings
    .filter((one) => one.names.includes(flagName))
    .map((one) => `${NAME} ${one.path.join(" ")} ${flagName}`)
  if (invocations.length === 0) return undefined
  const named = invocations.slice(0, NAMED_AT_MOST)
  const surplus = invocations.length - named.length
  const parts = surplus > 0 ? [...named, `${surplus} more`] : named
  return `(did you mean ${joinAlternatives(parts)}?)`
}

export interface OpsWorld {
  readonly root: string
  readonly documents: readonly CommandDocument[]
  readonly sourceOf: (at: string) => string | null
  readonly loading: (at: string) => Promise<CommandModule>
  readonly running: (at: string, args: readonly string[]) => Promise<number>
  readonly asking: (at: string) => Promise<string>
  readonly saying: (text: string) => void
  readonly refusing: (text: string) => void
}

export type Ending =
  | { readonly ended: "done" }
  | { readonly ended: "child"; readonly code: number }
  | { readonly ended: "threw"; readonly said: string; readonly code: number }

function runsHere(world: OpsWorld, at: string): boolean {
  const source = world.sourceOf(at)
  return source !== null && RUNS_HERE.test(source)
}

async function helpOf(world: OpsWorld, document: CommandDocument): Promise<CommandHelp> {
  const at = opsEntryAt(world.root, document)
  if (at === null) {
    return { epilog: opsMissingEntryText(world.root, document) }
  }
  if (runsHere(world, at)) return (await world.loading(at)).help ?? {}
  return opsForwardedHelp(document, () => world.asking(at))
}

async function siblingSurfaces(
  world: OpsWorld,
  path: readonly string[]
): Promise<readonly FlagSurface[]> {
  const namespace = path[0]
  if (namespace === undefined) return []
  const invoked = path.join(" ")
  const surfaces: FlagSurface[] = []
  for (const one of world.documents) {
    if (one.path[0] !== namespace || one.path.join(" ") === invoked) continue
    const at = opsEntryAt(world.root, one)
    if (at === null || !runsHere(world, at)) continue
    try {
      const names: string[] = []
      const held = (await world.loading(at)).help
      for (const flag of expandProseRoutes(held?.flags ?? []).flags) {
        names.push(flag.name)
        for (const alias of flag.aliases ?? []) names.push(alias)
      }
      surfaces.push({ path: one.path, names })
    } catch {}
  }
  return surfaces
}

async function saidOf(world: OpsWorld, thrown: unknown, match: OpsMatch | null): Promise<string> {
  const said = normalizeThrowable(thrown).message
  if (match === null) return said
  const rejected = (thrown as { unknownFlag?: { name: string; suggestion?: string } } | null)
    ?.unknownFlag
  if (rejected === undefined || rejected.suggestion !== undefined) return said
  const hint = opsSiblingHint(rejected.name, await siblingSurfaces(world, match.document.path))
  return hint === undefined ? said : `${said} ${hint}`
}

async function carried(match: OpsMatch, world: OpsWorld): Promise<Ending> {
  const at = opsEntryAt(world.root, match.document)
  if (at === null) throw new OperationalError(opsMissingEntryText(world.root, match.document))
  if (runsHere(world, at)) {
    await (await world.loading(at)).default(match.rest)
    return { ended: "done" }
  }
  const code = await world.running(at, match.rest)
  return code === EXIT.OK ? { ended: "done" } : { ended: "child", code }
}

async function ran(
  argv: readonly string[],
  match: OpsMatch | null,
  world: OpsWorld
): Promise<Ending> {
  if (argv.length === 1 && argv[0] === VERSION_FLAG) {
    world.saying(`${provenanceLine()}\n`)
    return { ended: "done" }
  }

  if (match !== null && match.rest.some((one) => HELP_FLAGS.includes(one))) {
    world.saying(`${await opsHelpText(match.document, await helpOf(world, match.document))}\n`)
    return { ended: "done" }
  }

  if (match !== null) return await carried(match, world)

  const prefix = opsPrefixIn(argv)
  if (prefix.length === 0 || opsUnder(world.documents, prefix).length > 0) {
    world.saying(`${opsListing(prefix, opsUnder(world.documents, prefix))}\n`)
    return { ended: "done" }
  }

  const known = opsKnownPrefix(world.documents, prefix)
  world.refusing(opsListing(known, opsUnder(world.documents, known)))
  throw new InputError(
    known.length === 0
      ? `${NAME}: unknown command`
      : `${NAME}: unknown command under \`${NAME} ${known.join(" ")}\``
  )
}

export async function opsAnswered(argv: readonly string[], world: OpsWorld): Promise<Ending> {
  const match = opsMatchIn(world.documents, argv)
  try {
    return await ran(argv, match, world)
  } catch (thrown) {
    return {
      ended: "threw",
      said: await saidOf(world, thrown, match),
      code: exitCodeForThrowable(thrown),
    }
  }
}

function childEnv(root: string): Record<string, string | undefined> {
  return { ...process.env, AKASHA_ROOT: root }
}

export function opsLiveWorld(root: string, documents: readonly CommandDocument[]): OpsWorld {
  return {
    root,
    documents,
    sourceOf: (at) => {
      try {
        return readFileSync(at, "utf8")
      } catch {
        return null
      }
    },
    loading: (at) => import(at) as Promise<CommandModule>,
    running: (at, args) =>
      new Promise<number>((resolve, reject) => {
        const child = spawn(process.execPath, [at, ...args], {
          stdio: "inherit",
          env: childEnv(root),
        })
        child.on("error", (thrown: Error & { code?: string }) => {
          reject(
            new OperationalError(
              thrown.code === "ENOENT"
                ? `${process.execPath} not found, so ${at} could not be run`
                : `${at} failed to start: ${thrown.message}`
            )
          )
        })
        child.on("close", (code, signal) => {
          if (signal !== null) {
            reject(new OperationalError(`${at} died on ${signal} and reported no exit code`))
            return
          }
          resolve(code ?? 0)
        })
      }),
    asking: (at) =>
      new Promise<string>((resolve) => {
        const child = spawn(process.execPath, [at, "--help"], {
          stdio: ["ignore", "pipe", "pipe"],
          env: childEnv(root),
          timeout: HELP_TIMEOUT_MS,
        })
        let out = ""
        let err = ""
        child.stdout?.on("data", (chunk: Buffer) => {
          out += chunk.toString()
        })
        child.stderr?.on("data", (chunk: Buffer) => {
          err += chunk.toString()
        })
        child.on("error", () => resolve(""))
        child.on("close", () => resolve(out.trim() !== "" ? out.trim() : err.trim()))
      }),
    saying: (text) => {
      process.stdout.write(text)
    },
    refusing: (text) => {
      process.stderr.write(`${text}\n`)
    },
  }
}

const UNREACHABLE_CODE_REPOSITORY = 70

if (import.meta.main) {
  let documents: readonly CommandDocument[] | null = null
  try {
    const root = akashaRoot()
    documents = opsDocumentsIn(root)

    process.on("unhandledRejection", (reason) => {
      const said = reason instanceof Error ? reason.message : String(reason)
      process.stderr.write(`${NAME}: unhandled rejection: ${said.split("\n", 1)[0] ?? "<empty>"}\n`)
      process.exit(EXIT.OPERATIONAL)
    })
    process.on("uncaughtException", (thrown) => {
      process.stderr.write(
        `${NAME}: uncaught exception: ${thrown.message.split("\n", 1)[0] ?? "<empty>"}\n`
      )
      process.exit(EXIT.OPERATIONAL)
    })

    ignoreClosedConsumerWrites([process.stdout, process.stderr])

    const ending = await opsAnswered(process.argv.slice(2), opsLiveWorld(root, documents))

    // A CHILD'S CODE IS SET RATHER THAN EXITED ON, so the process ends of its own accord and
    // whatever is still on its way out of a stream goes before it does. Only a refusal exits at
    // once, and what it says is awaited onto the error stream first, because `process.exit` gives
    // up whatever has not left yet and a large answer through a pipe ends at a 64 KiB boundary.
    if (ending.ended === "child" && ending.code !== EXIT.OK) process.exitCode = ending.code
    if (ending.ended === "threw") {
      await Bun.write(Bun.stderr, `${ending.said}\n`)
      process.exit(ending.code)
    }
  } catch (thrown) {
    await Bun.write(Bun.stderr, `${normalizeThrowable(thrown).message}\n`)
    process.exit(documents === null ? UNREACHABLE_CODE_REPOSITORY : EXIT.OPERATIONAL)
  }
}
