import { join } from "node:path"
import type { Asked, Held } from "../../asking/asking.module.code.ts"
import {
  BREAK_GLASS,
  bytesAt,
  landingAsked,
  mistaking,
  textAt,
  textOf,
  troubling,
} from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import type { FileEdit } from "../../landing/landing.module.code.ts"
import type { Piping } from "../../piping/piping.module.code.ts"
import {
  inputIn,
  MARK_NEW,
  MARK_OLD,
  MARK_SPLIT,
  PIPED,
  passagesIn,
  pipedIn,
} from "../../piping/piping.module.code.ts"
import {
  barredIn,
  besideTaken,
  defaultMessage,
  FILE_PATH,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  offRepo,
  pathAt,
  REMOVE,
  removingIn,
  unknownIn,
  unwarrantedIn,
} from "../write/write.command.code.ts"

const OLD_FILE = "--old-file"

const NEW_FILE = "--new-file"

const VALUED = [FILE_PATH, OLD_FILE, NEW_FILE, REMOVE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = []

type Stated = {
  readonly old: string
  readonly put: string
  readonly fromFiles: boolean
}

type Asking = {
  readonly path: string
  readonly stated: readonly Stated[]
}

type Read = {
  readonly asking: readonly Asking[]
  readonly wanting: string | null
  readonly removals: readonly string[]
  readonly refusals: readonly string[]
}

function readIn(argv: readonly string[]): Read {
  const asking: Asking[] = []
  const removals: string[] = []
  const refusals: string[] = []
  let open: Asking | null = null
  let old: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (token === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${FILE_PATH} takes a path, and none follows it`)
        break
      }
      if (old !== null) refusals.push(`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`)
      if (open !== null) {
        if (open.stated.length === 0) {
          refusals.push(`${FILE_PATH} ${open.path} states no ${OLD_FILE}, so it asks for no change`)
        }
        asking.push(open)
      }
      open = { path: value, stated: [] }
      old = null
      at += 1
      continue
    }
    if (token === OLD_FILE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${OLD_FILE} takes a file, and none follows it`)
        break
      }
      if (open === null) refusals.push(`${OLD_FILE} ${value} follows no ${FILE_PATH}`)
      if (old !== null) refusals.push(`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`)
      old = value
      at += 1
      continue
    }
    if (token === NEW_FILE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${NEW_FILE} takes a file, and none follows it`)
        break
      }
      if (old === null) refusals.push(`${NEW_FILE} ${value} follows no ${OLD_FILE}`)
      else if (open !== null) {
        open = { path: open.path, stated: [...open.stated, { old, put: value, fromFiles: true }] }
      }
      old = null
      at += 1
      continue
    }
    if (token === REMOVE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${REMOVE} takes a path, and none follows it`)
        break
      }
      removals.push(value)
      at += 1
      continue
    }
    if (VALUED.includes(token)) at += 1
  }
  if (old !== null) refusals.push(`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`)
  let wanting: string | null = null
  if (open !== null) {
    if (open.stated.length === 0) wanting = open.path
    else asking.push(open)
  }
  return { asking, wanting, removals, refusals }
}

type Askings = { readonly asking: readonly Asking[] } | { readonly refusals: readonly string[] }

function askingIn(read: Read, given: Given, piping: Piping): Askings {
  if (read.asking.length === 0 && read.wanting === null) return { asking: [] }
  const held = pipedIn(piping, read.wanting, {
    bare: (path) =>
      `${FILE_PATH} ${path} states no ${OLD_FILE}, so its passages are read from the input,` +
      ` and nothing is piped in — say it as` +
      ` \`${given.calledAs} ${FILE_PATH} ${path} ${MESSAGE} <text> <<'EOF'\`, then` +
      ` \`${MARK_OLD}\`, the passage, \`${MARK_SPLIT}\`, what it becomes, \`${MARK_NEW}\`,` +
      " then `EOF` on a line of its own",
    opening: (path, why) =>
      `the passages for ${path} are read from the input, and the input would not open — ${why}`,
  })
  if ("refusals" in held) return { refusals: held.refusals }
  const path = read.wanting
  if (path === null || !("bytes" in held)) return { asking: read.asking }
  const said = textOf(held.bytes)
  if (said === null) return { refusals: [`${PIPED} is not text, so no passage is read from it`] }
  const passages = passagesIn(said, `${OLD_FILE} and ${NEW_FILE}`)
  if ("refusals" in passages) return { refusals: passages.refusals }
  const stated = passages.passages.map((one) => ({ ...one, fromFiles: false }))
  return { asking: [...read.asking, { path, stated }] }
}

export function counted(body: string, said: string): number {
  let found = 0
  let at = body.indexOf(said)
  while (at !== -1) {
    found += 1
    at = body.indexOf(said, at + said.length)
  }
  return found
}

export function substituted(body: string, said: string, put: string): string {
  const at = body.indexOf(said)
  return body.slice(0, at) + put + body.slice(at + said.length)
}

type Worked = { readonly body: string } | { readonly mistaken: string } | { readonly wrong: string }

function working(path: string, body: string, stated: readonly Stated[]): Worked {
  let held = body
  for (const [which, one] of stated.entries()) {
    const said = one.fromFiles ? textAt(one.old) : one.old
    if (said === null) return { mistaken: `${OLD_FILE} ${one.old} could not be read as text` }
    const put = one.fromFiles ? textAt(one.put) : one.put
    if (put === null) return { mistaken: `${NEW_FILE} ${one.put} could not be read as text` }
    if (said === "") {
      return {
        mistaken: one.fromFiles
          ? `${OLD_FILE} ${one.old} is empty, and an empty passage names no place in ${path}`
          : `marker block ${which + 1} carries no old passage, and an empty passage names` +
            ` no place in ${path}`,
      }
    }
    const found = counted(held, said)
    if (found !== 1) {
      const how = found === 0 ? "no passage" : `${found} passages`
      return {
        wrong: `${path} — substitution ${which + 1} matches ${how}, and one substitution names one passage`,
      }
    }
    held = substituted(held, said, put)
  }
  return { body: held }
}

export function askedWith(argv: readonly string[], given: Given, piping: Piping): Asked | Answer {
  const unknown = unknownIn(argv, VALUED, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const read = readIn(argv)
  if (read.refusals.length > 0) return mistaking(read.refusals)
  if (read.asking.length === 0 && read.wanting === null && read.removals.length === 0) {
    return mistaking([
      `this call names no ${FILE_PATH} to change and no ${REMOVE} to take away, so it asks for nothing`,
    ])
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return mistaking(glass.refusals)
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return mistaking(message.refusals)
  const every = askingIn(read, given, piping)
  if ("refusals" in every) return mistaking(every.refusals)

  const mistaken: string[] = []
  const wrong: string[] = []
  const changes: FileEdit[] = []
  const unmoved: Held[] = []
  const seen = new Set<string>()
  for (const one of every.asking) {
    const path = pathAt(given.root, one.path)
    if (path === null) {
      mistaken.push(offRepo(one.path))
      continue
    }
    const barred = barredIn(given.root, path)
    if (barred !== null) {
      mistaken.push(barred)
      continue
    }
    if (seen.has(path)) {
      mistaken.push(`${path} is named more than once by one call`)
      continue
    }
    seen.add(path)
    const held = bytesAt(join(given.root, path))
    if ("absent" in held) {
      wrong.push(`${path} is not there — \`edit\` changes a file that is, and \`write\` makes one`)
      continue
    }
    if ("unreadable" in held) {
      wrong.push(`${path} is there and would not open — ${held.unreadable}`)
      continue
    }
    const was = held.bytes
    const body = textOf(was)
    if (body === null) {
      wrong.push(`${path} is not text, so no substitution can be stated against it`)
      continue
    }
    const worked = working(path, body, one.stated)
    if ("mistaken" in worked) {
      mistaken.push(worked.mistaken)
      continue
    }
    if ("wrong" in worked) {
      wrong.push(worked.wrong)
      continue
    }
    changes.push({ path, body: new TextEncoder().encode(worked.body) })
    unmoved.push({ path, was })
  }
  const removing = removingIn(
    given,
    read.removals,
    seen,
    (path) => `${path} is both changed and taken away by one call`
  )
  changes.push(...removing.changes)
  mistaken.push(...removing.mistaken)
  wrong.push(...removing.wrong)
  wrong.push(...unwarrantedIn(given, glass.glass, changes))
  changes.push(...besideTaken(given, removing.base, removing.taken, seen))
  const troubled = troubling({ mistaken, wrong })
  if (troubled !== null) return troubled

  const asked: Asked = {
    changes,
    message:
      message.message ??
      defaultMessage(
        "edit",
        changes.map((one) => one.path)
      ),
    dryRun: false,
    draft: true,
    glass: null,
    unmoved,
    saying: (said) => [
      ...said.wrote.map((one) => `edited ${one}`),
      ...said.took.map((one) => `took away ${one}`),
    ],
  }
  return asked
}

export function askedIn(argv: readonly string[], given: Given): Asked | Answer {
  return askedWith(argv, given, inputIn)
}

export async function editing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const asked = askedWith(argv, given, piping)
  if (!("changes" in asked)) return asked
  return await landingAsked(given, asked)
}

export async function edit(argv: readonly string[], given: Given): Promise<Answer> {
  return await editing(argv, given, inputIn)
}
