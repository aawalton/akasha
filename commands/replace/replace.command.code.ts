import { join } from "node:path"
import type { Asked, Held } from "../../command-system/asking/asking.module.code.ts"
import {
  bytesAt,
  counted,
  DRY_RUN,
  landingAsked,
  mistaking,
  textAt,
  textOf,
  troubling,
} from "../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import {
  barredIn,
  defaultMessage,
  FILE_PATH,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  offRepo,
  pathAt,
  unknownIn,
  unwarrantedIn,
  valuesOf,
} from "../../command-system/commands/write/write.command.code.ts"
import type { FileEdit } from "../../command-system/landing/landing.module.code.ts"
import type { Piping } from "../../command-system/piping/piping.module.code.ts"
import {
  inputIn,
  MARK_NEW,
  MARK_OLD,
  MARK_SPLIT,
  PIPED,
  passagesIn,
  pipedIn,
} from "../../command-system/piping/piping.module.code.ts"

const OLD_FILE = "--old-file"

const NEW_FILE = "--new-file"

const VALUED = [FILE_PATH, OLD_FILE, NEW_FILE, MESSAGE, MESSAGE_FILE]

const BARE = [DRY_RUN]

const ONE_PASSAGE = "one call replaces one passage"

type Passage = {
  readonly old: string
  readonly put: string
}

type Reading = { readonly passage: Passage } | { readonly refusals: readonly string[] }

type Paths = { readonly paths: readonly string[] } | { readonly refusals: readonly string[] }

type Counting = {
  readonly path: string
  readonly found: number
}

export function countedIn(body: string, said: string): number {
  let found = 0
  let at = body.indexOf(said)
  while (at !== -1) {
    found += 1
    at = body.indexOf(said, at + said.length)
  }
  return found
}

export function replacedIn(body: string, said: string, put: string): string {
  return body.split(said).join(put)
}

function pathsIn(argv: readonly string[]): Paths {
  const said = valuesOf(argv, FILE_PATH, VALUED)
  if (said.includes(null)) return { refusals: [`${FILE_PATH} takes a path, and none follows it`] }
  return { paths: said.filter((one): one is string => one !== null) }
}

function statedIn(old: string, put: string): Reading {
  const was = textAt(old)
  if (was === null) return { refusals: [`${OLD_FILE} ${old} could not be read as text`] }
  const now = textAt(put)
  if (now === null) return { refusals: [`${NEW_FILE} ${put} could not be read as text`] }
  return { passage: { old: was, put: now } }
}

function pipedPassage(given: Given, piping: Piping): Reading {
  const held = pipedIn(piping, PIPED, {
    bare: () =>
      `this call states no ${OLD_FILE}, so its passage is read from the input, and nothing is` +
      ` piped in — say it as \`${given.calledAs} ${FILE_PATH} <path> ${MESSAGE} <text> <<'EOF'\`,` +
      ` then \`${MARK_OLD}\`, the passage, \`${MARK_SPLIT}\`, what it becomes, \`${MARK_NEW}\`,` +
      " then `EOF` on a line of its own",
    opening: (_named, why) =>
      `the passage is read from the input, and the input would not open — ${why}`,
  })
  if ("refusals" in held) return { refusals: held.refusals }
  if (!("bytes" in held)) return { refusals: [`nothing is piped in, and ${ONE_PASSAGE}`] }
  const said = textOf(held.bytes)
  if (said === null) return { refusals: [`${PIPED} is not text, so no passage is read from it`] }
  const passages = passagesIn(said, `${OLD_FILE} and ${NEW_FILE}`)
  if ("refusals" in passages) return { refusals: passages.refusals }
  const one = passages.passages[0]
  if (passages.passages.length !== 1 || one === undefined) {
    return {
      refusals: [
        `${PIPED} carries ${counted(passages.passages.length, "marker block")}, and ${ONE_PASSAGE}`,
      ],
    }
  }
  return { passage: one }
}

function passageIn(argv: readonly string[], given: Given, piping: Piping): Reading {
  const olds = valuesOf(argv, OLD_FILE, VALUED)
  const news = valuesOf(argv, NEW_FILE, VALUED)
  if (olds.length > 1) {
    return {
      refusals: [`${OLD_FILE} is given ${counted(olds.length, "time")}, and ${ONE_PASSAGE}`],
    }
  }
  if (news.length > 1) {
    return {
      refusals: [`${NEW_FILE} is given ${counted(news.length, "time")}, and ${ONE_PASSAGE}`],
    }
  }
  const old = olds[0]
  const put = news[0]
  if (old === null) return { refusals: [`${OLD_FILE} takes a file, and none follows it`] }
  if (put === null) return { refusals: [`${NEW_FILE} takes a file, and none follows it`] }
  if (old !== undefined && put === undefined) {
    return { refusals: [`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`] }
  }
  if (old === undefined && put !== undefined) {
    return { refusals: [`${NEW_FILE} ${put} follows no ${OLD_FILE}`] }
  }
  if (old === undefined || put === undefined) return pipedPassage(given, piping)
  return statedIn(old, put)
}

type Working = {
  readonly counting: readonly Counting[]
  readonly changes: readonly FileEdit[]
  readonly unmoved: readonly Held[]
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

type Why = { readonly why: string }

type Text = { readonly body: string; readonly was: Uint8Array }

function pathIn(root: string, said: string, seen: Set<string>): string | Why {
  const path = pathAt(root, said)
  if (path === null) return { why: offRepo(said) }
  const barred = barredIn(root, path)
  if (barred !== null) return { why: barred }
  if (seen.has(path)) return { why: `${path} is named more than once by one call` }
  seen.add(path)
  return path
}

function bodyIn(root: string, path: string): Text | Why {
  const held = bytesAt(join(root, path))
  if ("absent" in held) {
    return { why: `${path} is not there — a passage is replaced in a file that is` }
  }
  if ("unreadable" in held) {
    return { why: `${path} is there and would not open — ${held.unreadable}` }
  }
  const body = textOf(held.bytes)
  if (body === null) return { why: `${path} is not text, so no passage is read from it` }
  return { body, was: held.bytes }
}

function working(given: Given, paths: readonly string[], passage: Passage, dry: boolean): Working {
  const counting: Counting[] = []
  const changes: FileEdit[] = []
  const unmoved: Held[] = []
  const mistaken: string[] = []
  const wrong: string[] = []
  const seen = new Set<string>()
  for (const said of paths) {
    const path = pathIn(given.root, said, seen)
    if (typeof path !== "string") {
      mistaken.push(path.why)
      continue
    }
    const read = bodyIn(given.root, path)
    if ("why" in read) {
      wrong.push(read.why)
      continue
    }
    const found = countedIn(read.body, passage.old)
    counting.push({ path, found })
    if (found === 0) {
      if (!dry) {
        wrong.push(`${path} holds the passage nowhere — name only the files a call changes`)
      }
      continue
    }
    const put = replacedIn(read.body, passage.old, passage.put)
    changes.push({ path, body: new TextEncoder().encode(put) })
    unmoved.push({ path, was: read.was })
  }
  return { counting, changes, unmoved, mistaken, wrong }
}

function reporting(counting: readonly Counting[]): Answer {
  const total = counting.reduce((held, one) => held + one.found, 0)
  return {
    report: [
      ...counting.map((one) => `${one.path} — ${counted(one.found, "occurrence")}`),
      `${counted(total, "occurrence")} in ${counted(counting.length, "file")}` +
        ` — ${DRY_RUN} changed none of them`,
    ],
    refusals: [],
    code: 0,
  }
}

export async function replacing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const unknown = unknownIn(argv, VALUED, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const named = pathsIn(argv)
  if ("refusals" in named) return mistaking(named.refusals)
  if (named.paths.length === 0) {
    return mistaking([
      `this call names no ${FILE_PATH} — a passage is replaced only in the files a call names`,
    ])
  }
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return mistaking(message.refusals)
  const reading = passageIn(argv, given, piping)
  if ("refusals" in reading) return mistaking(reading.refusals)
  if (reading.passage.old === "") {
    return mistaking(["the passage to replace is empty, and an empty passage names no place"])
  }
  const dry = argv.includes(DRY_RUN)
  const held = working(given, named.paths, reading.passage, dry)
  const wrong = dry ? held.wrong : [...held.wrong, ...unwarrantedIn(given, null, held.changes)]
  const troubled = troubling({ mistaken: held.mistaken, wrong })
  if (troubled !== null) return troubled
  if (dry) return reporting(held.counting)
  const asked: Asked = {
    changes: held.changes,
    message:
      message.message ??
      defaultMessage(
        "replace in",
        held.changes.map((one) => one.path)
      ),
    dryRun: false,
    glass: null,
    unmoved: held.unmoved,
    saying: () => held.counting.map((one) => `${one.path} — ${counted(one.found, "replacement")}`),
  }
  return await landingAsked(given, asked)
}

export function replace(argv: readonly string[], given: Given): Answer {
  return replacing(argv, given, inputIn)
}
